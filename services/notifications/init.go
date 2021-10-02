package notifications

import "net/http"

const Service = "Notification"

func SetupRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/"+Service+".list", _handleList)
	mux.HandleFunc("/api/"+Service+".calluser", _handleCallUser)
}
