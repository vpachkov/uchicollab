package questions

import (
	"uchicollab/services"
)

type TopQuestionRequest struct {
	Tags    []string
	Filters []string
}

type QuestionTag struct {
	Value string `json:"value"`
	Label string `json:"label"`
}
type QuestionTagsResponse struct {
	Tags []QuestionTag `json:"tags"`
}

type QuestionSubject struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
}

type QuestionSubjectsResponse struct {
	Subjects []QuestionSubject `json:"subjects"`
}

type BriefQuestionsRequest struct {
	services.SessionableRequest
	Subject  string   `json:"subject"`
	Tags     []string `json:"tags"`
	CostFrom int      `json:"costfrom"`
	CostTo   int      `json:"costto"`
	Deadline int64    `json:"deadline"`
}

type SearchQuestionsRequest struct {
	services.SessionableRequest
	Title string `json:"title"`
	Text  string `json:"text"`
}

type BriefQuestion struct {
	ID               int    `json:"id"`
	Answers          int    `json:"answers"`
	Cost             int    `json:"cost"`
	Title            string `json:"title"`
	Description      string `json:"description"`
	AskedByName      string `json:"askedbyname"`
	AskedByLogin     string `json:"askedbylogin"`
	AskedByImagePath string `json:"askedbyimagepath"`
	Date             int64  `json:"date"`
}

type BriefQuestionsResponse struct {
	Questions []BriefQuestion `json:"questions"`
}

type DetailedQuestionRequest struct {
	services.SessionableRequest
	ID int `json:"id"`
}

type Donator struct {
	Login string `json:"login"`
	Coins int    `json:"coins"`
}

type Answer struct {
	ID              int       `json:"id"`
	Text            string    `json:"text"`
	Best            bool      `json:"best"`
	Likes           int       `json:"likes"`
	Date            int64     `json:"askedbyimagepath"`
	ImagePath       string    `json:"imagepath"`
	AuthorName      string    `json:"authorname"`
	AuthorLogin     string    `json:"authorlogin"`
	AuthorImagePath string    `json:"authorimagepath"`
	Donators        []Donator `json:"donators"`
}

type Upvoter struct {
	Login string `json:"login"`
	Coins int    `json:"coins"`
}

type DetailedQuestionResponse struct {
	ID      int    `json:"id"`
	Title   string `json:"title"`
	Subject string `json:"subject"`
	Text    string `json:"text"`

	Tags []string `json:"tags"`

	Date  int64 `json:"date"`
	Until int64 `json:"until"`
	Cost  int   `json:"cost"`

	AskedByName      string `json:"askedbyname"`
	AskedByLogin     string `json:"askedbylogin"`
	AskedByImagePath string `json:"askedbyimagepath"`

	Answers  []Answer  `json:"answers"`
	Upvoters []Upvoter `json:"upvoters"`
}

type UpvoteRequest struct {
	services.SessionableRequest
	QuestionID int `json:"questionid"`
	Coins      int `json:"coins"`
}

type ConcernRequest struct {
	services.SessionableRequest
	QuestionID int `json:"questionid"`
	AnswerID   int `json:"answerid"`
	Coins      int `json:"coins"`
}

type ChatMessagesRequest struct {
	services.SessionableRequest
	QuestionID int `json:"questionid"`
}

type ChatMessage struct {
	UserName      string `json:"username"`
	UserLogin     string `json:"userlogin"`
	UserImagePath string `json:"userimagepath"`
	Time          int64  `json:"usertime"`
	Text          string `json:"text"`
}

type ChatMessagesResponse struct {
	Messages []ChatMessage `json:"messages"`
}

type SendMessageRequest struct {
	services.SessionableRequest
	QuestionID int    `json:"questionid"`
	Text       string `json:"text"`
}

type CreateRequest struct {
	services.SessionableRequest
	Title    string   `json:"title"`
	Text     string   `json:"text"`
	Cost     int      `json:"cost"`
	Deadline int64    `json:"deadline"`
	Subject  string   `json:"subject"`
	Tags     []string `json:"tags"`
}

type CreateResponse struct {
	ID int `json:"id"`
}

type AnswerRequest struct {
	services.SessionableRequest
	QuestionID int    `json:"questionid"`
	Text       string `json:"text"`
}

type AnswerResponse struct {
	AnswerID int `json:"answerid"`
}
