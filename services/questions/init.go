package questions

import "net/http"

const Service = "Questions"

func SetupRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/"+Service+".tags", _handleTags)
	mux.HandleFunc("/api/"+Service+".subjects", _handleSubjects)
	mux.HandleFunc("/api/"+Service+".briefquestions", _handleBriefQuestions)
	mux.HandleFunc("/api/"+Service+".searchquestions", _handleSearchQuestions)
	mux.HandleFunc("/api/"+Service+".detailedquestion", _handleDetailedQuestion)
	mux.HandleFunc("/api/"+Service+".upvote", _handleUpvote)
	mux.HandleFunc("/api/"+Service+".concern", _handleConcern)
	mux.HandleFunc("/api/"+Service+".chatmessages", _handleChatMessages)
	mux.HandleFunc("/api/"+Service+".sendmessage", _handleSendMessage)
	mux.HandleFunc("/api/"+Service+".create", _handleCreate)
	mux.HandleFunc("/api/"+Service+".answer", _handleAnswer)
	mux.HandleFunc("/api/"+Service+".popular", _handlePopular)
	mux.HandleFunc("/api/"+Service+".recommendations", _handleRecommendations)
}
