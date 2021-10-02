package notifications

import (
	"net/http"
	"uchicollab/db"
)

func handleList(request NotificationListRequest) (response NotificationListResponse, status int) {
	dbi := db.Get()
	var session db.Session
	if result := dbi.Preload("User").Preload("User.Notifications").First(&session, "id = ?", request.Session); result.Error != nil {
		status = http.StatusUnauthorized
		return
	}

	for idx, notific := range session.User.Notifications {
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
