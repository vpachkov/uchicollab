package profile

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
