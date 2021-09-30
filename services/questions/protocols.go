package questions

type TopQuestionRequest struct {
	Tags    []string
	Filters []string
}

type QuestionTag struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
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
