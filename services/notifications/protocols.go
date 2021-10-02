package notifications

type NotificationListRequest struct {
	Session string `json:"session"`
	Number  int    `json:"number"`
}

type CallUserRequest struct {
	Session    string `json:"session"`
	Login      string `json:"login"`
	QuestionID int    `json:"questionid"`
}

type Notification struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Text  string `json:"text"`
	Link  string `json:"link"`
	Date  int64  `json:"date"`
}

type NotificationListResponse struct {
	NotificationList []Notification `json:"list"`
}

type CallUserResponse struct {
}
