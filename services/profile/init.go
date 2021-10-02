package profile

import "net/http"

const Service = "Profile"

func SetupRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/"+Service+".comments", _handleComments)
	mux.HandleFunc("/api/"+Service+".userinfo", _handleUserInfo)
	mux.HandleFunc("/api/"+Service+".usercoins", _handleUserCoins)
	mux.HandleFunc("/api/"+Service+".userraiting", _handleUserRaiting)
	mux.HandleFunc("/api/"+Service+".userraitinglist", _handleUserRaitingList)
	mux.HandleFunc("/api/"+Service+".register", _handleRegister)
	mux.HandleFunc("/api/"+Service+".publicuserinfo", _handlePublicUserInfo)
}
