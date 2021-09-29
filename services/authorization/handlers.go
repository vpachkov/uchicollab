package authorization

import (
	"net/http"
	"uchicollab/db"
)

func handleAuthorize(request authorizeRequest) (authorizeResponse, int) {
	dbi := db.Get()
	var session db.Session
	dbi.First(&session)
	return authorizeResponse{Session: session.ID}, http.StatusOK
}
