package questions

type TopQuestionRequest struct {
	Tags    []string
	Filters []string
}

type QuestionTag struct {
	Value string    `json:"value"`
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
