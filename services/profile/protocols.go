package profile

type SessionableRequest struct {
	Session string `json:"session"`
}

type CommentsRequest struct {
	Session string `json:"session"`
	Number  int    `json:"number"`
}

type Comment struct {
	Text  string `json:"text"`
	Score int    `json:"score"`
}

type CommentsResponse struct {
	Comments []Comment `json:"comments"`
}

type UserImageRequest struct {
	Session string `json:"session"`
}

type UserNameRequest struct {
	Name string `json:"name"`
}

type UserInfoResponse struct {
	Name      string `json:"name"`
	Login     string `json:"login"`
	ImagePath string `json:"imagepath"`
}
