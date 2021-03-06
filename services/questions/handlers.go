package questions

import (
	"fmt"
	"net/http"
	"sort"
	"time"
	"uchicollab/database"
	"uchicollab/search"
	"uchicollab/services"
)

func handleTags(request services.SessionableRequest) (response QuestionTagsResponse, status int) {
	dbi := database.Get()
	var session database.Session
	if result := dbi.First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	var tags []database.QuestionTag
	dbi.Order("ID").Find(&tags)
	for _, tag := range tags {
		response.Tags = append(response.Tags, QuestionTag{Value: tag.ID, Label: tag.ID})
	}
	status = http.StatusOK
	return
}

func handleSubjects(request services.SessionableRequest) (response QuestionSubjectsResponse, status int) {
	dbi := database.Get()
	var session database.Session
	if result := dbi.First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	var subjects []database.QuestionSubject
	dbi.Order("ID").Find(&subjects)
	for _, subject := range subjects {
		response.Subjects = append(response.Subjects, QuestionSubject{ID: subject.ID, Title: subject.Title})
	}
	status = http.StatusOK
	return
}

func handleBriefQuestions(request BriefQuestionsRequest) (response BriefQuestionsResponse, status int) {
	dbi := database.Get()
	var session database.Session
	if result := dbi.Preload("User").First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	deadline := time.Unix(request.Deadline/1000, 0)

	var questions []database.Question

	if request.Text != "" {
		// If there is a Text, do the search
		datas := search.Search(request.Title, request.Text)
		dbi.
			Preload("Tags").
			Preload("Opener").
			Preload("Answers").
			Preload("Upvoters").
			Where("ID IN ?", datas).
			Find(&questions)
	} else {
		dbi.
			Preload("Tags").
			Preload("Opener").
			Preload("Answers").
			Preload("Upvoters").
			Find(&questions).Order("cost")
	}

	for _, question := range questions {
		if request.HideClosedQuestions && !question.Active {
			continue
		}
		if request.Subject != "" {
			if question.Subject != request.Subject {
				continue
			}
		}
		if request.Deadline > 0 {
			if question.DeadlineTime.Before(deadline) {
				continue
			}
		}
		if len(request.Tags) > 0 {
			skip := false
			for _, requestTag := range request.Tags {
				found := false
				for _, tag := range question.Tags {
					if requestTag == tag.ID {
						found = true
						break
					}
				}
				if !found {
					skip = true
					break
				}
			}
			if skip {
				continue
			}
		}

		cost := 0
		for _, upvoter := range question.Upvoters {
			cost += upvoter.Coins
		}

		if request.CostFrom > 0 {
			if cost < request.CostFrom {
				continue
			}
		}
		if request.CostTo > 0 {
			if cost > request.CostTo {
				continue
			}
		}

		response.Questions = append(response.Questions, BriefQuestion{
			ID:               question.ID,
			Answers:          len(question.Answers),
			Cost:             cost,
			Title:            question.Title,
			Date:             question.OpenedTime.UnixNano(),
			Description:      question.Description,
			AskedByName:      question.Opener.Name,
			AskedByLogin:     question.Opener.Login,
			AskedByImagePath: question.Opener.ImagePath,
		})
	}

	sort.Slice(response.Questions, func(i, j int) bool {
		return response.Questions[i].Cost > response.Questions[j].Cost
	})

	status = http.StatusOK
	return
}

func handleSearchQuestions(request SearchQuestionsRequest) (response BriefQuestionsResponse, status int) {
	dbi := database.Get()
	var session database.Session
	if result := dbi.Preload("User").First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	datas := search.Search(request.Title, request.Text)

	var questions []database.Question
	dbi.
		Preload("Tags").
		Preload("Opener").
		Preload("Answers").
		Preload("Upvoters").
		Where("ID IN ?", datas).
		Find(&questions)

	for _, question := range questions {
		cost := 0
		for _, upvoter := range question.Upvoters {
			cost += upvoter.Coins
		}

		response.Questions = append(response.Questions, BriefQuestion{
			ID:               question.ID,
			Answers:          len(question.Answers),
			Cost:             cost,
			Title:            question.Title,
			Date:             question.OpenedTime.UnixNano(),
			Description:      question.Description,
			AskedByName:      question.Opener.Name,
			AskedByLogin:     question.Opener.Login,
			AskedByImagePath: question.Opener.ImagePath,
		})
	}

	status = http.StatusOK
	return
}

func handleDetailedQuestion(request DetailedQuestionRequest) (response DetailedQuestionResponse, status int) {
	dbi := database.Get()
	var session database.Session
	if result := dbi.First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	var question database.Question
	dbi.
		Preload("Opener").
		Preload("Tags").
		Preload("Answers").
		Preload("Upvoters").
		Preload("Upvoters.User").
		Preload("Answers.Author").
		Preload("Answers.Donators").
		Preload("Answers.Donators.User").
		First(&question, "id = ?", request.ID)

	response.ID = question.ID
	response.Title = question.Title
	response.Subject = question.Subject
	response.Text = question.Description

	for _, tag := range question.Tags {
		response.Tags = append(response.Tags, tag.ID)
	}

	response.Date = question.OpenedTime.UnixNano()
	response.Until = question.DeadlineTime.UnixNano()

	response.AskedByName = question.Opener.Name
	response.AskedByLogin = question.Opener.Login
	response.AskedByImagePath = question.Opener.ImagePath

	for _, upvoter := range question.Upvoters {
		response.Upvoters = append(response.Upvoters, Upvoter{
			Login: upvoter.User.Login,
			Coins: upvoter.Coins,
		})
		response.Cost += upvoter.Coins
	}

	response.Acitve = question.Active

	for _, answer := range question.Answers {
		ans := Answer{
			ID:              answer.ID,
			Text:            answer.Text,
			Date:            answer.Date.UnixNano(),
			ImagePath:       answer.ImagePath,
			AuthorName:      answer.Author.Name,
			AuthorLogin:     answer.Author.Login,
			AuthorImagePath: answer.Author.ImagePath,
		}

		for _, donator := range answer.Donators {
			ans.Donators = append(ans.Donators, Donator{
				Login: donator.User.Login,
				Coins: donator.Coins,
			})
			ans.Likes += donator.Coins
		}

		response.Answers = append(response.Answers, ans)
	}

	sort.Slice(response.Answers, func(i, j int) bool {
		return response.Answers[i].Likes > response.Answers[j].Likes
	})

	if len(response.Answers) > 0 {
		response.Answers[0].Best = true
	}

	status = http.StatusOK
	return
}

func handleUpvote(request UpvoteRequest) (status int) {
	dbi := database.Get()
	var session database.Session
	if result := dbi.Preload("User").First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	if session.User.Coins >= request.Coins {
		session.User.Coins -= request.Coins
		dbi.Save(session.User)

		var question database.Question
		dbi.
			Preload("Upvoters").
			Preload("Upvoters.User").
			First(&question, "id = ?", request.QuestionID)

		exists := false
		for _, upvoter := range question.Upvoters {
			if upvoter.UserID == session.UserID {
				upvoter.Coins += request.Coins
				dbi.Save(&upvoter)
				exists = true
				break
			}
		}

		if !exists {
			question.Upvoters = append(question.Upvoters, database.Upvoter{
				User:  session.User,
				Coins: request.Coins,
			})

			dbi.Save(&question)
		}
	}

	status = http.StatusOK
	return
}

func handleConcern(request ConcernRequest) (status int) {
	dbi := database.Get()
	var session database.Session
	if result := dbi.Preload("User").First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	var question database.Question
	dbi.
		Preload("Opener").
		Preload("Tags").
		Preload("Answers").
		Preload("Upvoters").
		Preload("Upvoters.User").
		Preload("Answers.Author").
		Preload("Answers.Donators").
		Preload("Answers.Donators.User").
		First(&question, "id = ?", request.QuestionID)

	if !question.Active {
		return http.StatusOK
	}

	for _, upvoter := range question.Upvoters {
		if upvoter.UserID == session.User.ID {

			for _, answer := range question.Answers {
				if answer.ID == request.AnswerID {
					wasDonator := false
					for _, donator := range answer.Donators {
						if donator.User.ID == session.User.ID {
							wasDonator = true
							donator.Coins = upvoter.Coins
							dbi.Save(&donator)
						}
					}
					if !wasDonator {
						answer.Donators = append(answer.Donators, database.Donator{
							User:  session.User,
							Coins: upvoter.Coins,
						})
						dbi.Save(&answer)
					}
					continue
				}

				for _, donator := range answer.Donators {
					if donator.User.ID == session.User.ID {
						dbi.Delete(&donator)
						break
					}
				}
			}
		}
	}

	return http.StatusOK
}

func handleChatMessages(request ChatMessagesRequest) (response ChatMessagesResponse, status int) {
	dbi := database.Get()
	var session database.Session
	if result := dbi.First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	var question database.Question
	dbi.
		Preload("ChatMessages").
		Preload("ChatMessages.User").
		First(&question, "id = ?", request.QuestionID)

	for _, message := range question.ChatMessages {
		response.Messages = append(response.Messages, ChatMessage{
			UserName:      message.User.Name,
			UserLogin:     message.User.Login,
			UserImagePath: message.User.ImagePath,
			Time:          message.Time.UnixNano(),
			Text:          message.Text,
		})
	}

	status = http.StatusOK
	return
}

func handleSendMessage(request SendMessageRequest) (status int) {
	dbi := database.Get()
	var session database.Session
	if result := dbi.Preload("User").First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	var question database.Question
	dbi.
		Preload("ChatMessages").
		First(&question, "id = ?", request.QuestionID)

	question.ChatMessages = append(question.ChatMessages, database.ChatMessage{
		User: session.User,
		Text: request.Text,
		Time: time.Now(),
	})

	dbi.Save(&question)

	status = http.StatusOK
	return
}

func handleCreate(request CreateRequest) (response CreateResponse, status int) {
	dbi := database.Get()
	var session database.Session
	if result := dbi.Preload("User").First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	if session.User.Coins < request.Cost {
		status = http.StatusForbidden
		return
	}

	session.User.Coins -= request.Cost
	dbi.Save(session.User)

	upvoter := database.Upvoter{
		User:  session.User,
		Coins: request.Cost,
	}

	question := &database.Question{
		Active:       true,
		Opener:       session.User,
		Title:        request.Title,
		Subject:      request.Subject,
		Description:  request.Text,
		DeadlineTime: time.Unix(request.Deadline/1000, 0),
		OpenedTime:   time.Now(),
		Upvoters:     []database.Upvoter{upvoter},
	}

	var tags []database.QuestionTag
	dbi.Find(&tags)

	for _, requestTag := range request.Tags {
		found := false
		for _, tag := range tags {
			if tag.ID == requestTag {
				question.Tags = append(question.Tags, tag)
				found = true
				break
			}
		}

		if !found {
			tagnew := &database.QuestionTag{ID: requestTag}
			dbi.Create(tagnew)
			dbi.Find(&tags)
			for _, tag := range tags {
				if tag.ID == requestTag {
					question.Tags = append(question.Tags, tag)
					found = true
					break
				}
			}
		}
	}

	dbi.Create(question)
	response.ID = question.ID

	go search.Index(question.ID, question.Title, question.Description)

	status = http.StatusOK
	return
}

func handleAnswer(request AnswerRequest) (response AnswerResponse, status int) {
	dbi := database.Get()
	var session database.Session
	if result := dbi.Preload("User").First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	var question database.Question
	dbi.
		Preload("Opener").
		Preload("Tags").
		Preload("Answers").
		Preload("Upvoters").
		Preload("Upvoters.User").
		Preload("Answers.Author").
		Preload("Answers.Donators").
		Preload("Answers.Donators.User").
		First(&question, "id = ?", request.QuestionID)

	question.Answers = append(question.Answers, database.Answer{
		Text:   request.Text,
		Date:   time.Now(),
		Author: session.User,
	})

	dbi.Save(&question)
	response.AnswerID = question.Answers[len(question.Answers)-1].ID

	notificMessage := fmt.Sprintf("?????????? ?????????? ???? ???????????? ??%v?? ???? ???????????????????????? %v", question.Title, session.User.Name)
	notificLink := fmt.Sprintf("/question/%v#%v", question.ID, response.AnswerID)
	notific := database.Notification{Title: "?????????? ?????????? ???? ????????????", Text: notificMessage, Link: notificLink, Time: time.Now()}
	question.Opener.Notifications = append(question.Opener.Notifications, notific)
	dbi.Save(&question.Opener)

	status = http.StatusOK
	return
}

func handlePopular(request PopularRequest) (response PopularResponse, status int) {
	dbi := database.Get()
	var session database.Session
	if result := dbi.First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	var questions []database.Question
	dbi.
		Preload("Tags").
		Preload("Opener").
		Preload("Answers").
		Preload("Upvoters").
		Find(&questions).
		Order("cost").
		Limit(5)

	for _, question := range questions {
		response.Questions = append(response.Questions, BriefQuestion{
			ID:               question.ID,
			Answers:          len(question.Answers),
			Cost:             question.Cost,
			Title:            question.Title,
			Date:             question.OpenedTime.UnixNano(),
			Description:      question.Description,
			AskedByName:      question.Opener.Name,
			AskedByLogin:     question.Opener.Login,
			AskedByImagePath: question.Opener.ImagePath,
		})
	}

	status = http.StatusOK
	return
}

func handleRecommendations(request RecommendationsRequest) (response RecommendationsResponse, status int) {
	dbi := database.Get()
	var session database.Session
	if result := dbi.Preload("User").Preload("User.Subjects").First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	var questions []database.Question
	dbi.
		Preload("Tags").
		Preload("Opener").
		Preload("Answers").
		Preload("Upvoters").
		Find(&questions).
		Order("cost")

	for _, question := range questions {
		for _, subjectInterest := range session.User.Subjects {
			if question.Subject == subjectInterest.Name {
				response.Questions = append(response.Questions, BriefQuestion{
					ID:               question.ID,
					Answers:          len(question.Answers),
					Cost:             question.Cost,
					Title:            question.Title,
					Date:             question.OpenedTime.UnixNano(),
					Description:      question.Description,
					AskedByName:      question.Opener.Name,
					AskedByLogin:     question.Opener.Login,
					AskedByImagePath: question.Opener.ImagePath,
				})

				if len(response.Questions) >= 5 {
					status = http.StatusOK
					return
				}
			}
		}
	}

	status = http.StatusOK
	return
}

func handlePopularAnswers(request PopularAnswersRequest) (response PopularAnswersResponse, status int) {
	dbi := database.Get()
	var session database.Session
	if result := dbi.First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	var user database.User
	dbi.First(&user, "login = ?", request.Login)
	if user.ID == 0 {
		status = http.StatusOK
		return
	}

	var answers []database.Answer
	dbi.
		Preload("Donators").
		Find(&answers, "author_id = ?", user.ID)

	for _, answer := range answers {
		var question database.Question
		dbi.First(&question, "id = ?", answer.QuestionID)
		if question.ID == 0 {
			continue
		}

		likes := 0
		for _, donator := range answer.Donators {
			likes += donator.Coins
		}

		response.Answers = append(response.Answers, PopularAnswer{
			QuestionID:    answer.QuestionID,
			QuestionTitle: question.Title,
			Text:          answer.Text,
			Likes:         likes,
		})
	}

	sort.Slice(response.Answers, func(i, j int) bool {
		return response.Answers[i].Likes > response.Answers[j].Likes
	})

	if len(response.Answers) > 5 {
		response.Answers = response.Answers[:5]
	}

	status = http.StatusOK
	return
}

func handlePopularQuestions(request PopularQuestionsRequest) (response PopularQuestionsResponse, status int) {
	dbi := database.Get()
	var session database.Session
	if result := dbi.First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	var user database.User
	dbi.First(&user, "login = ?", request.Login)
	if user.ID == 0 {
		status = http.StatusOK
		return
	}

	var questions []database.Question
	dbi.
		Preload("Tags").
		Preload("Opener").
		Preload("Answers").
		Preload("Upvoters").
		Find(&questions, "opener_id = ?", user.ID).
		Order("cost").
		Limit(5)

	for _, question := range questions {
		response.Questions = append(response.Questions, BriefQuestion{
			ID:               question.ID,
			Answers:          len(question.Answers),
			Cost:             question.Cost,
			Title:            question.Title,
			Date:             question.OpenedTime.UnixNano(),
			Description:      question.Description,
			AskedByName:      question.Opener.Name,
			AskedByLogin:     question.Opener.Login,
			AskedByImagePath: question.Opener.ImagePath,
		})
	}

	status = http.StatusOK
	return
}

func handlePrivateChatMessages(request PrivateChatMessagesRequest) (response PrivateChatMessagesResponse, status int) {
	dbi := database.Get()
	var session database.Session
	if result := dbi.First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	var question database.Question
	dbi.
		Preload("PrivateChats").
		Preload("PrivateChats.WithUser").
		Preload("PrivateChats.Messages").
		Preload("PrivateChats.Messages.User").
		First(&question, "id = ?", request.QuestionID)

	for _, privateChat := range question.PrivateChats {
		if privateChat.WithUser.Login == request.WithLogin {
			for _, message := range privateChat.Messages {
				response.Messages = append(response.Messages, ChatMessage{
					UserName:      message.User.Name,
					UserLogin:     message.User.Login,
					UserImagePath: message.User.ImagePath,
					Time:          message.Time.UnixNano(),
					Text:          message.Text,
				})
			}
			break
		}
	}

	status = http.StatusOK
	return
}

func handleSendPrivateMessage(request SendPrivateMessageRequest) (status int) {
	dbi := database.Get()
	var session database.Session
	if result := dbi.Preload("User").First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	var question database.Question
	dbi.
		Preload("PrivateChats").
		Preload("PrivateChats.WithUser").
		Preload("PrivateChats.Messages").
		Preload("PrivateChats.Messages.User").
		First(&question, "id = ?", request.QuestionID)

	found := false
	for _, privateChat := range question.PrivateChats {
		if privateChat.WithUser.Login == request.WithLogin {
			privateChat.Messages = append(privateChat.Messages, database.PrivateChatMessage{
				User: session.User,
				Text: request.Text,
				Time: time.Now(),
			})
			dbi.Updates(&privateChat)
			found = true
			break
		}
	}

	if !found {
		var user database.User
		dbi.First(&user, "login = ?", request.WithLogin)
		if user.ID != 0 {
			question.PrivateChats = append(question.PrivateChats, database.PrivateChat{
				WithUser: &user,
				Messages: []database.PrivateChatMessage{{
					User: session.User,
					Text: request.Text,
					Time: time.Now(),
				}},
			})
			dbi.Updates(&question)
		}
	}

	status = http.StatusOK
	return
}
