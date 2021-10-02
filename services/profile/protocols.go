package profile

import "uchicollab/services"

type SessionableRequest struct {
	Session string `json:"session"`
}

type CommentsRequest struct {
	Session string `json:"session"`
	Number  int    `json:"number"`
}

type Comment struct {
	Text      string `json:"text"`
	Score     int    `json:"score"`
	Name      string `json:"name"`
	ImagePath string `json:"imagepath"`
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

type UserCoinsResponse struct {
	Coin int `json:"coin"`
}

type UserRaitingResponse struct {
	Answers     int `json:"answers"`
	BestAnswers int `json:"bestAnswers"`
}

type RegisterRequest struct {
	Name     string   `json:"name"`
	Login    string   `json:"login"`
	Password string   `json:"password"`
	School   string   `json:"school"`
	About    string   `json:"about"`
	Subjects []string `json:"subjects"`
}

type PublicUserInfoRequest struct {
	services.SessionableRequest
	Login string `json:"login"`
}

type PublicUserInfoResponse struct {
	Name      string   `json:"name"`
	ImagePath string   `json:"imagepath"`
	About     string   `json:"about"`
	School    string   `json:"school"`
	Subjects  []string `json:"subjects"`

	Rating  int `json:"rating"`
	Likes   int `json:"likes"`
	Answers int `json:"answers"`

	Comments []Comment `json:"comments"`
}

type UserRaiting struct {
	Name      string `json:"name"`
	ImagePath string `json:"imagepath"`
	Login     string `json:"login"`
	Rating    int    `json:"raiting"`
}

type UserRaitingListResponse struct {
	Raitings []UserRaiting `json:"raitings"`
}
