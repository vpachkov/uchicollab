package questions

import "net/http"

const Service = "Questions"

func SetupRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/"+Service+".tags", _handleTags)
	mux.HandleFunc("/api/"+Service+".subjects", _handleSubjects)
	mux.HandleFunc("/api/"+Service+".briefquestions", _handleBriefQuestions)
}
