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
	dbi.Create(&db.User{Name: "vas"})

	// setup workers
	sc := workers.SessionCollector{}
	workers.StartWorker(sc)

	// setup routing
	mux := http.NewServeMux()
	log.Println("Starting...")
	log.Fatal(http.ListenAndServe(":8080", mux))
}
