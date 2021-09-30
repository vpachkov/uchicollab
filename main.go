package main

import (
	"log"
	"net/http"
	"uchicollab/db"
	"uchicollab/workers"
)

func main() {
	db.Hi()
	println("hi main")

	// setup workers
	sc := workers.SessionCollector{}
	workers.StartWorker(sc)

	// setup routing
	mux := http.NewServeMux()
	log.Println("Starting...")
	log.Fatal(http.ListenAndServe(":8080", mux))
}
