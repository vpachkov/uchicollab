package main

import (
	"log"
	"net/http"
	"time"

	"uchicollab/db"
	"uchicollab/services/authorization"
	"uchicollab/services/notifications"
	"uchicollab/services/profile"
	"uchicollab/services/questions"
	"uchicollab/workers"
)

func main() {
	// setup database
	db.Init()
	dbi := db.Get()
	var vass db.User
	dbi.First(&vass)
	if vass.ID == 0 {
		vas := &db.User{Name: "Русс Молочков", Login: "russcox", PasswordHash: "fafa", Coins: 40}
		dich := &db.User{Name: "Никита Коровкин", Login: "nimelekhin", PasswordHash: "fafa"}
		sess := &db.Session{User: vas}
		dbi.Create(dich)
		dbi.Create(sess)
	} else {
		sess := &db.Session{User: &vass}
		dbi.Create(sess)
	}

	vas := &db.User{}
	dich := &db.User{}
	dbi.First(&vas, "login = ?", "russcox")
	dbi.First(&dich, "login = ?", "nimelekhin")

	comm := db.Comment{Text: "very good thanks", Score: 5, Commentator: dich}
	comm2 := db.Comment{Text: "temporary -2 thanks", Score: 2, Commentator: dich}
	vas.Comments = append(vas.Comments, comm, comm2)

	notific := db.Notification{Text: "Гайд №1", Time: time.Now()}
	vas.Notifications = append(vas.Notifications, notific)

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

		donator1 := db.Donator{User: vas, Coins: 15}
		donator2 := db.Donator{User: dich, Coins: 10}

		answer1 := db.Answer{
			Text:     "Вообще-то есть компиляторы Itell, MS.\nА на каком железе? А для каких задач?\nУ оптимизации очень много аспектов и вот так выдавать \"общие рецепты\" довольно странное занятие.",
			Best:     true,
			Date:     time.Now(),
			Author:   vas,
			Donators: []db.Donator{donator1, donator2},
		}
		answer2 := db.Answer{
			Text:   "Просто без обсуждения замеров/профилирования, специфики задачи и алгоритмов обсуждать оптимизации довольно странное занятие - разгонять неправильно выбранный алгоритм и без понимания железа в корне неверно.",
			Best:   false,
			Date:   time.Now(),
			Author: vas,
		}

		upvoter1 := db.Upvoter{User: vas, Coins: 20}
		upvoter2 := db.Upvoter{User: dich, Coins: 10}

		m1 := db.ChatMessage{
			User: vas,
			Text: "Привет, есть вопросы?",
			Time: time.Now(),
		}

		m2 := db.ChatMessage{
			User: dich,
			Text: "Прив!, неа, пока",
			Time: time.Now(),
		}

		question1 := &db.Question{
			Title:        "Решение задачи по Алгебре",
			Description:  "sin (П + х/3) = 1/2\nрешите пожалуйста и объясните как решать чтобы в следующий раз я смог это решить сам.",
			Subject:      "Алгебра",
			Opener:       dich,
			OpenedTime:   time.Now(),
			DeadlineTime: time.Now().Add(48 * time.Hour),
			Cost:         5,
			Tags:         []db.QuestionTag{tag1, tag2},
			Answers:      []db.Answer{answer1, answer2},
			Upvoters:     []db.Upvoter{upvoter1, upvoter2},
			ChatMessages: []db.ChatMessage{m1, m2},
		}

		dbi.Create(question1)
	}

	// dbi.Updates(vas)

	// setup workers
	sc := workers.SessionCollector{}
	workers.StartWorker(sc)

	// setup microservices routing
	mux := http.NewServeMux()
	authorization.SetupRoutes(mux)
	profile.SetupRoutes(mux)
	questions.SetupRoutes(mux)
	notifications.SetupRoutes(mux)

	// setup statics
	fs := http.FileServer(http.Dir("static"))
	mux.Handle("/static/", http.StripPrefix("/static/", fs))

	// start the server
	log.Println("Starting...")
	log.Fatal(http.ListenAndServe(":8080", mux))
}
