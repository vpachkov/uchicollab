package questions

import (
	"net/http"
	"uchicollab/db"
	"uchicollab/services"
)

func handleTags(request services.SessionableRequest) (response QuestionTagsResponse, status int) {
	dbi := db.Get()
	var session db.Session
	if result := dbi.First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	var tags []db.QuestionTag
	dbi.Order("ID").Find(&tags)
	for _, tag := range tags {
		response.Tags = append(response.Tags, QuestionTag{Value: tag.ID, Label: tag.ID})
	}
	status = http.StatusOK
	return
}

func handleSubjects(request services.SessionableRequest) (response QuestionSubjectsResponse, status int) {
	dbi := db.Get()
	var session db.Session
	if result := dbi.First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	var subjects []db.QuestionSubject
	dbi.Order("ID").Find(&subjects)
	for _, subject := range subjects {
		response.Subjects = append(response.Subjects, QuestionSubject{ID: subject.ID, Title: subject.Title})
	}
	status = http.StatusOK
	return
}
