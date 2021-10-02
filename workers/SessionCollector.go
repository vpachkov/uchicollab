package workers

import (
	"log"
	"time"
	"uchicollab/db"
)

type SessionCollector struct{}

func (SessionCollector) Callback() {
	log.Println("Session collector callback")

	dbi := db.Get()
	var sessions []db.Session
	dbi.Find(&sessions)
	for _, session := range sessions {
		if session.Expired() {
			log.Printf("Session %v has expired\n", session.ID)
			dbi.Delete(session)
		}
	}
}

func (SessionCollector) GetDuration() time.Duration {
	return 15 * time.Minute
}
