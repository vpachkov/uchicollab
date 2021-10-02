package authorization

import (
	"net/http"
	"uchicollab/db"
)

func handleAuthorize(request authorizeRequest) (response authorizeResponse, status int) {
	dbi := db.Get()
	var sessions []db.Session
	dbi.Preload("User").Find(&sessions)
	for _, session := range sessions {
		if session.User.Login == "russcox" {
			return authorizeResponse{Session: session.ID}, http.StatusOK
		}
	}
	status = http.StatusOK
	return
}
