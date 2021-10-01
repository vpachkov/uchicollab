package main

import (
	"log"
	"net/http"
	"time"
	"uchicollab/db"
	"uchicollab/services/authorization"
	"uchicollab/services/profile"
	"uchicollab/services/questions"
	"uchicollab/workers"
)

func main() {
	// setup database
	db.Init()
	dbi := db.Get()
	vas := &db.User{Name: "Русс Молочков", Login: "russcox", PasswordHash: "fafa"}
	dich := &db.User{Name: "Никита Коровкин", Login: "nimelekhin", PasswordHash: "fafa"}
	sess := &db.Session{User: vas}
	dbi.Create(dich)
	dbi.Create(sess)
	comm := db.Comment{Text: "very good thanks", Score: 5, Commentator: dich}
	comm2 := db.Comment{Text: "temporary -2 thanks", Score: 2, Commentator: dich}
	vas.Comments = append(vas.Comments, comm, comm2)
	dbi.Updates(vas)

	var tag db.QuestionTag
	dbi.First(&tag)
	if tag.ID == "" {
		tag1 := &db.QuestionTag{ID: "Из учебника"}
		tag2 := &db.QuestionTag{ID: "Со звездочкой"}
		tag3 := &db.QuestionTag{ID: "С олимпиады"}

		dbi.Create(tag1)
		dbi.Create(tag2)
		dbi.Create(tag3)
	}

	var question db.Question
	dbi.First(&question)
	if question.ID == 0 {
		var tag1 db.QuestionTag
		var tag2 db.QuestionTag
		dbi.First(&tag1, "id = ?", "Из учебника")
		dbi.First(&tag2, "id = ?", "Со звездочкой")

		question1 := &db.Question{
			Title:        "Решение задачи по Алгебре",
			Description:  "Russ Cox was raised by a pack of crazed hillbillies in the backwoods of Tennessee. Without much in the way of modern conveniences, like a television set or running water, he spent his time drawing, whittling, and throwing dirt clods at his cousins. With the bulk of his life spent in Pennsylvania, he met his wife; became a graphic designer; played in punk, alternative, and surf bands; had two kids; and started his own illustration studio, Smiling Otis Studio (named after one of their very large cats). Russ creates his art the old school way using paper, pencil, gouache, and watercolor. Using traditional tools gives Russ an opportunity to explore and experiment",
			Subject:      "Алгебра",
			Opener:       dich,
			OpenedTime:   time.Now(),
			DeadlineTime: time.Now().Add(48 * time.Hour),
			Cost:         5,
			Tags:         []db.QuestionTag{tag1, tag2},
		}

		dbi.Create(question1)
	}

	// setup workers
	sc := workers.SessionCollector{}
	workers.StartWorker(sc)

	// setup microservices routing
	mux := http.NewServeMux()
	authorization.SetupRoutes(mux)
	profile.SetupRoutes(mux)
	questions.SetupRoutes(mux)

	// setup statics
	fs := http.FileServer(http.Dir("static"))
	mux.Handle("/static/", http.StripPrefix("/static/", fs))

	// start the server
	log.Println("Starting...")
	log.Fatal(http.ListenAndServe(":8080", mux))
}
