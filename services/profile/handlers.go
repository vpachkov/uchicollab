package profile

import (
	"net/http"
	"uchicollab/db"
)

func handleComments(request CommentsRequest) (response CommentsResponse, status int) {
	dbi := db.Get()
	var session db.Session
	if result := dbi.Preload("User").Preload("User.Comments").First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	println(session.User.ID, len(session.User.Comments))
	for idx, comment := range session.User.Comments {
		if idx >= request.Number {
			break
		}
		response.Comments = append(response.Comments, Comment{Text: comment.Text, Score: int(comment.Score)})
		println(comment.Text)
	}
	status = http.StatusOK
	return
}

func handleUserInfo(request SessionableRequest) (response UserInfoResponse, status int) {
	dbi := db.Get()
	var session db.Session
	if result := dbi.Preload("User").First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	response.Name = session.User.Name
	response.Login = session.User.Login
	response.ImagePath = session.User.Login + ".png"

	status = http.StatusOK
	return
}
