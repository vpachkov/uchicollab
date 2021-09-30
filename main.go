package main

import (
	"log"
	"net/http"
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

	subject1 := &db.QuestionSubject{Title: "Алгебра"}
	subject2 := &db.QuestionSubject{Title: "Геометрия"}
	subject3 := &db.QuestionSubject{Title: "Русский Язык"}
	subject4 := &db.QuestionSubject{Title: "Английский Язык"}
	subject5 := &db.QuestionSubject{Title: "Литература"}
	dbi.Create(subject1)
	dbi.Create(subject2)
	dbi.Create(subject3)
	dbi.Create(subject4)
	dbi.Create(subject5)

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
