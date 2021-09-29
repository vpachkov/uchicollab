package authorization

import "net/http"

const Service = "Authorization"

func SetupRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/"+Service+".authorize", _handleAuthorize)
}
