package authorization

import (
	"net/http"
	"time"
	"uchicollab/database"
)

func handleAuthorize(request authorizeRequest) (response authorizeResponse, status int) {
	dbi := database.Get()

	var user database.User
	dbi.First(&user, "login = ? and password_hash = ?", request.Login, request.Password)
	if user.ID == 0 {
		status = http.StatusUnauthorized
		return
	}

	var sessions []database.Session
	dbi.Preload("User").Find(&sessions)
	for _, session := range sessions {
		if session.User.Login == request.Login {
			return authorizeResponse{Session: session.ID}, http.StatusOK
		}
	}

	session := database.Session{
		User:        &user,
		DestroyTime: time.Now().Add(12 * time.Hour),
	}
	dbi.Create(&session)

	return authorizeResponse{Session: session.ID}, http.StatusOK
}
