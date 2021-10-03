package notifications

import (
	"fmt"
	"net/http"
	"sort"
	"time"
	"uchicollab/database"
)

func handleList(request NotificationListRequest) (response NotificationListResponse, status int) {
	dbi := database.Get()
	var session database.Session
	if result := dbi.Preload("User").Preload("User.Notifications").First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	notifics := session.User.Notifications
	sort.Slice(notifics, func(i, j int) bool {
		return notifics[i].ID > notifics[j].ID
	})

	for idx, notific := range notifics {
		if idx >= request.Number {
			break
		}
		response.NotificationList = append(response.NotificationList, Notification{
			ID:    notific.ID,
			Title: notific.Title,
			Text:  notific.Text,
			Link:  notific.Link,
			Date:  notific.Time.UnixNano(),
		})
	}

	status = http.StatusOK
	return
}

func handleCallUser(request CallUserRequest) (response CallUserResponse, status int) {
	dbi := database.Get()
	var session database.Session
	if result := dbi.Preload("User").First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	var user database.User
	dbi.First(&user, "login = ?", request.Login)
	if user.ID == 0 {
		status = http.StatusForbidden
		return
	}

	var question database.Question
	dbi.First(&question, "id = ?", request.QuestionID)
	if question.ID == 0 {
		status = http.StatusForbidden
		return
	}

	notificMessage := fmt.Sprintf("Пользователь %v обратил Ваше внимание на вопрос «%v»", session.User.Name, question.Title)
	notificLink := fmt.Sprintf("/question/%v", question.ID)
	notific := database.Notification{Title: "Новое приглашение", Text: notificMessage, Link: notificLink, Time: time.Now()}
	user.Notifications = append(user.Notifications, notific)
	dbi.Save(&user)

	status = http.StatusOK
	return
}
