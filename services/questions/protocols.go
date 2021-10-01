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

type BriefQuestion struct {
	Answers          int    `json:"answers"`
	Title            string `json:"title"`
	Description      string `json:"description"`
	AskedByName      string `json:"askedbyname"`
	AskedByLogin     string `json:"askedbylogin"`
	AskedByImagePath string `json:"askedbyimagepath"`
}

type BriefQuestionsResponse struct {
	Questions []BriefQuestion `json:"questions"`
}
