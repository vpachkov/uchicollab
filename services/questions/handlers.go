package questions

import (
	"net/http"
	"sort"
	"time"
	"uchicollab/db"
	"uchicollab/services"
)

func handleTags(request services.SessionableRequest) (response QuestionTagsResponse, status int) {
	dbi := db.Get()
	var session db.Session
	if result := dbi.First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	var tags []db.QuestionTag
	dbi.Order("ID").Find(&tags)
	for _, tag := range tags {
		response.Tags = append(response.Tags, QuestionTag{Value: tag.ID, Label: tag.ID})
	}
	status = http.StatusOK
	return
}

func handleSubjects(request services.SessionableRequest) (response QuestionSubjectsResponse, status int) {
	dbi := db.Get()
	var session db.Session
	if result := dbi.First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	var subjects []db.QuestionSubject
	dbi.Order("ID").Find(&subjects)
	for _, subject := range subjects {
		response.Subjects = append(response.Subjects, QuestionSubject{ID: subject.ID, Title: subject.Title})
	}
	status = http.StatusOK
	return
}

func handleBriefQuestions(request BriefQuestionsRequest) (response BriefQuestionsResponse, status int) {
	dbi := db.Get()
	var session db.Session
	if result := dbi.Preload("User").First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	deadline := time.Unix(request.Deadline/1000, 0)

	var questions []db.Question
	dbi.Preload("Tags").Preload("Opener").Find(&questions).Order("cost")

	for _, question := range questions {
		if request.CostFrom > 0 {
			if question.Cost < request.CostFrom {
				continue
			}
		}
		if request.CostTo > 0 {
			if question.Cost > request.CostTo {
				continue
			}
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

		response.Questions = append(response.Questions, BriefQuestion{
			ID:               question.ID,
			Answers:          5,
			Title:            question.Title,
			Description:      question.Description,
			AskedByName:      question.Opener.Name,
			AskedByLogin:     question.Opener.Login,
			AskedByImagePath: question.Opener.Login + ".png",
		})
	}

	status = http.StatusOK
	return
}

func handleDetailedQuestion(request DetailedQuestionRequest) (response DetailedQuestionResponse, status int) {
	dbi := db.Get()
	var session db.Session
	if result := dbi.First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	var question db.Question
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
	response.AskedByImagePath = question.Opener.Login + ".png"

	for _, upvoter := range question.Upvoters {
		response.Upvoters = append(response.Upvoters, Upvoter{
			Login: upvoter.User.Login,
			Coins: upvoter.Coins,
		})
		response.Cost += upvoter.Coins
	}

	for _, answer := range question.Answers {
		ans := Answer{
			ID:              answer.ID,
			Text:            answer.Text,
			Date:            answer.Date.UnixNano(),
			AuthorName:      answer.Author.Name,
			AuthorLogin:     answer.Author.Login,
			AuthorImagePath: answer.Author.Login + ".png",
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
	dbi := db.Get()
	var session db.Session
	if result := dbi.Preload("User").First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	if session.User.Coins >= request.Coins {
		var question db.Question
		dbi.
			Preload("Upvoters").
			Preload("Upvoters.User").
			First(&question, "id = ?", request.QuestionID)

		session.User.Coins -= request.Coins
		dbi.Updates(session.User)

		exists := false
		for _, upvoter := range question.Upvoters {
			if upvoter.UserID == session.UserID {
				upvoter.Coins += request.Coins
				dbi.Updates(&upvoter)
				exists = true
				break
			}
		}

		if !exists {
			question.Upvoters = append(question.Upvoters, db.Upvoter{
				User:  session.User,
				Coins: request.Coins,
			})

			dbi.Updates(&question)
		}
	}

	status = http.StatusOK
	return
}

func handleConcern(request ConcernRequest) (status int) {
	dbi := db.Get()
	var session db.Session
	if result := dbi.Preload("User").First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	var question db.Question
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

	for _, upvoter := range question.Upvoters {
		if upvoter.UserID == session.User.ID {

			for _, answer := range question.Answers {
				if answer.ID == request.AnswerID {
					wasDonator := false
					for _, donator := range answer.Donators {
						if donator.User.ID == session.User.ID {
							wasDonator = true
							donator.Coins = upvoter.Coins
							dbi.Updates(&donator)
						}
					}
					if !wasDonator {
						answer.Donators = append(answer.Donators, db.Donator{
							User:  session.User,
							Coins: upvoter.Coins,
						})
						dbi.Updates(&answer)
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
