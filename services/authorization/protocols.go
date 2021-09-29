package authorization

type authorizeRequest struct {
	Login    string `json:"login"`
	Password string `json:"password"`
}

type authorizeResponse struct {
	Session string `json:"session"`
}
