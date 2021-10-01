package questions

import (
	"net/http"
	"time"
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

func handleBriefQuestions(request BriefQuestionsRequest) (response BriefQuestionsResponse, status int) {
	dbi := db.Get()
	var session db.Session
	if result := dbi.Preload("User").First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	deadline := time.Unix(request.Deadline/1000, 0)

	var questions []db.Question
	dbi.Preload("Tags").Preload("Opener").Find(&questions).Order("cost")

	for _, question := range questions {
		if request.CostFrom > 0 {
			if question.Cost < request.CostFrom {
				continue
			}
		}
		if request.CostTo > 0 {
			if question.Cost > request.CostTo {
				continue
			}
		}
		if request.Subject != "" {
			if question.Subject != request.Subject {
				continue
			}
		}
		if request.Deadline > 0 {
			if question.DeadlineTime.Before(deadline) {
				continue
			}
		}
		if len(request.Tags) > 0 {
			skip := false
			for _, requestTag := range request.Tags {
				found := false
				for _, tag := range question.Tags {
					if requestTag == tag.ID {
						found = true
						break
					}
				}
				if !found {
					skip = true
					break
				}
			}
			if skip {
				continue
			}
		}

		response.Questions = append(response.Questions, BriefQuestion{
			ID:               question.ID,
			Answers:          5,
			Title:            question.Title,
			Description:      question.Description,
			AskedByName:      question.Opener.Name,
			AskedByLogin:     question.Opener.Login,
			AskedByImagePath: question.Opener.Login + ".png",
		})
	}

	status = http.StatusOK
	return
}
