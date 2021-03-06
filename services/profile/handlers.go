package profile

import (
	"net/http"
	"sort"
	"uchicollab/database"
)

func handleComments(request CommentsRequest) (response CommentsResponse, status int) {
	dbi := database.Get()
	var session database.Session
	if result := dbi.Preload("User").Preload("User.Comments").Preload("User.Comments.Commentator").First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	comments := session.User.Comments
	sort.Slice(comments, func(i, j int) bool {
		return comments[i].ID > comments[j].ID
	})

	for idx, comment := range comments {
		if idx >= request.Number {
			break
		}
		response.Comments = append(response.Comments, Comment{
			Text:      comment.Text,
			Score:     int(comment.Score),
			Name:      comment.Commentator.Name,
			ImagePath: comment.Commentator.ImagePath,
		})

		println(comment.Commentator.Name)
	}
	status = http.StatusOK
	return
}

func handleUserInfo(request SessionableRequest) (response UserInfoResponse, status int) {
	dbi := database.Get()
	var session database.Session
	if result := dbi.Preload("User").First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	response.Name = session.User.Name
	response.Login = session.User.Login
	response.ImagePath = session.User.ImagePath

	status = http.StatusOK
	return
}

func handleUserCoins(request SessionableRequest) (response UserCoinsResponse, status int) {
	dbi := database.Get()
	var session database.Session
	if result := dbi.Preload("User").First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}
	response.Coin = session.User.Coins
	status = http.StatusOK
	return
}

func handleUserRaiting(request SessionableRequest) (response UserRaitingResponse, status int) {
	dbi := database.Get()
	var session database.Session
	if result := dbi.Preload("User").First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	var answerCount int64 = 0
	var bestAnswerCount int64 = 0
	dbi.Table("answers").Where("author_id = ?", session.User.ID).Count(&answerCount)
	dbi.Table("answers").Where("author_id = ? AND best = true", session.User.ID).Count(&bestAnswerCount)

	response.Answers = int(answerCount)
	response.BestAnswers = int(bestAnswerCount)
	status = http.StatusOK
	return
}

func handleRegister(request RegisterRequest) (status int) {
	dbi := database.Get()
	var user database.User
	dbi.First(&user, "login = ?", request.Login)
	if user.ID != 0 {
		status = http.StatusUnauthorized
		return
	}
	newUser := &database.User{
		Coins:        10,
		Login:        request.Login,
		PasswordHash: request.Password,
		Name:         request.Name,
		About:        request.About,
		School:       request.School,
	}
	for _, subject := range request.Subjects {
		newUser.Subjects = append(newUser.Subjects, database.UserSubject{Name: subject})
	}
	dbi.Create(newUser)
	status = http.StatusOK
	return
}

func handlePublicUserInfo(request PublicUserInfoRequest) (response PublicUserInfoResponse, status int) {
	dbi := database.Get()
	var session database.Session
	if result := dbi.First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}
	var user database.User
	dbi.
		Preload("Subjects").
		Preload("Comments").
		Preload("Comments.Commentator").
		First(&user, "login = ?", request.Login)

	response.Name = user.Name
	response.ImagePath = user.ImagePath
	response.About = user.About
	response.School = user.School

	for _, subject := range user.Subjects {
		response.Subjects = append(response.Subjects, subject.Name)
	}

	var count int64
	dbi.Model(&database.Answer{}).Where("author_id = ?", user.ID).Count(&count)
	response.Answers = int(count)

	var answers []database.Answer
	dbi.
		Preload("Donators").
		Find(&answers, "author_id = ?", user.ID)

	for _, answer := range answers {
		for _, donator := range answer.Donators {
			response.Likes += donator.Coins
		}
	}

	response.Rating = response.Likes/5 + response.Answers

	comments := user.Comments
	sort.Slice(comments, func(i, j int) bool {
		return comments[i].ID > comments[j].ID
	})

	for _, comment := range comments {
		response.Comments = append(response.Comments, Comment{
			Text:      comment.Text,
			Name:      comment.Commentator.Name,
			ImagePath: comment.Commentator.ImagePath,
			Score:     int(comment.Score),
		})
	}

	status = http.StatusOK
	return
}

func handleUserRaitingList(request SessionableRequest) (response UserRaitingListResponse, status int) {
	dbi := database.Get()
	var session database.Session
	if result := dbi.First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}
	var users []database.User
	dbi.Find(&users)

	for _, user := range users {
		var count int64
		dbi.Model(&database.Answer{}).Where("author_id = ?", user.ID).Count(&count)

		var answers []database.Answer
		dbi.Preload("Donators").
			Find(&answers, "author_id = ?", user.ID)

		likes := 0
		for _, answer := range answers {
			for _, donator := range answer.Donators {
				likes += donator.Coins
			}
		}

		response.Raitings = append(response.Raitings, UserRaiting{Name: user.Name, Login: user.Login, ImagePath: user.ImagePath, Rating: likes/5 + int(count)})
	}

	sort.Slice(response.Raitings, func(i, j int) bool {
		return response.Raitings[i].Rating > response.Raitings[j].Rating
	})

	status = http.StatusOK
	return
}
