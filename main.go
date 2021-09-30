package main

import (
	"log"
	"net/http"
	"uchicollab/db"
	"uchicollab/services/authorization"
	"uchicollab/services/profile"
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

	// setup workers
	sc := workers.SessionCollector{}
	workers.StartWorker(sc)

	// setup routing
	mux := http.NewServeMux()
	authorization.SetupRoutes(mux)
	profile.SetupRoutes(mux)

	// setup statics
	fs := http.FileServer(http.Dir("static"))
	mux.Handle("/static/", http.StripPrefix("/static/", fs))

	// start the server
	log.Println("Starting...")
	log.Fatal(http.ListenAndServe(":8080", mux))
}
