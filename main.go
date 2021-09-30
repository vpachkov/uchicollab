package main

import (
	"log"
	"net/http"
	"uchicollab/db"
	"uchicollab/workers"
)

func main() {
	// setup database
	db.Init()
	dbi := db.Get()
	vas := &db.User{Name: "vas"}
	sess := &db.Session{User: vas}
	dbi.Create(sess)

	// setup workers
	sc := workers.SessionCollector{}
	workers.StartWorker(sc)

	// setup routing
	mux := http.NewServeMux()
	log.Println("Starting...")
	log.Fatal(http.ListenAndServe(":8080", mux))
}
