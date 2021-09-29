package profile

import "net/http"

const Service = "Profile"

func SetupRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/"+Service+".comments", _handleComments)
}
