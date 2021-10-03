package main

import (
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"time"

	"github.com/google/uuid"

	"uchicollab/database"
	"uchicollab/search"
	"uchicollab/services/authorization"
	"uchicollab/services/notifications"
	"uchicollab/services/profile"
	"uchicollab/services/questions"
	"uchicollab/workers"
)

func initSearchFromDB() {
	dbi := database.Get()
	var questions []database.Question
	dbi.Preload("Tags").
		Preload("Opener").
		Preload("Answers").
		Preload("Upvoters").
		Find(&questions).Order("cost")

	for _, question := range questions {
		search.Index(question.ID, question.Title, question.Description)
	}
}

func main() {
	// setup database
	database.Init()
	dbi := database.Get()
	var vass database.User
	dbi.First(&vass)
	if vass.ID == 0 {
		vas := &database.User{
			Name:         "Русс Молочков",
			About:        "Я люблю учить алгебру это мой любимый предмет :)",
			School:       "Школа номер 121212",
			Subjects:     []database.UserSubject{{Name: "Алгебра"}, {Name: "Геометрия"}, {Name: "Английский язык"}},
			Login:        "russcox",
			PasswordHash: "fafa",
			Coins:        40,
			ImagePath:    "russcox.png",
		}
		dich := &database.User{
			Name:         "Никита Коровкин",
			About:        "Я не люблю учить алгебру но зато люблю очень Русский язык это мой самый любимый предмет!",
			School:       "Лицей ВШЭ НИУ",
			Subjects:     []database.UserSubject{{Name: "Русский язык"}, {Name: "Английский язык"}},
			Login:        "nimelekhin",
			PasswordHash: "fafa",
			ImagePath:    "nimelekhin.png",
		}
		sess := &database.Session{User: vas}
		dbi.Create(dich)
		dbi.Create(sess)
	} else {
		sess := &database.Session{User: &vass}
		dbi.Create(sess)
	}

	vas := &database.User{}
	dich := &database.User{}
	dbi.First(&vas, "login = ?", "russcox")
	dbi.First(&dich, "login = ?", "nimelekhin")

	comm := database.Comment{Text: "very good thanks", Score: 5, Commentator: dich}
	comm2 := database.Comment{Text: "temporary -2 thanks", Score: 2, Commentator: dich}
	vas.Comments = append(vas.Comments, comm, comm2)

	notific := database.Notification{Text: "Гайд №1", Time: time.Now()}
	vas.Notifications = append(vas.Notifications, notific)

	var tag database.QuestionTag
	dbi.First(&tag)
	if tag.ID == "" {
		tag1 := &database.QuestionTag{ID: "Из учебника"}
		tag2 := &database.QuestionTag{ID: "Со звездочкой"}
		tag3 := &database.QuestionTag{ID: "С олимпиады"}

		dbi.Create(tag1)
		dbi.Create(tag2)
		dbi.Create(tag3)
	}

	var question database.Question
	dbi.First(&question)
	if question.ID == 0 {
		var tag1 database.QuestionTag
		var tag2 database.QuestionTag
		dbi.First(&tag1, "id = ?", "Из учебника")
		dbi.First(&tag2, "id = ?", "Со звездочкой")

		donator1 := database.Donator{User: vas, Coins: 15}
		donator2 := database.Donator{User: dich, Coins: 10}

		answer1 := database.Answer{
			Text:     "Вообще-то есть компиляторы Itell, MS.\nА на каком железе? А для каких задач?\nУ оптимизации очень много аспектов и вот так выдавать \"общие рецепты\" довольно странное занятие.",
			Date:     time.Now(),
			Author:   vas,
			Donators: []database.Donator{donator1, donator2},
		}
		answer2 := database.Answer{
			Text:   "Просто без обсуждения замеров/профилирования, специфики задачи и алгоритмов обсуждать оптимизации довольно странное занятие - разгонять неправильно выбранный алгоритм и без понимания железа в корне неверно.",
			Date:   time.Now(),
			Author: vas,
		}

		upvoter1 := database.Upvoter{User: vas, Coins: 20}
		upvoter2 := database.Upvoter{User: dich, Coins: 10}

		m1 := database.ChatMessage{
			User: vas,
			Text: "Привет, есть вопросы?",
			Time: time.Now(),
		}

		m2 := database.ChatMessage{
			User: dich,
			Text: "Прив!, неа, пока",
			Time: time.Now(),
		}

		question1 := &database.Question{
			Active:       true,
			Title:        "Решение задачи по Алгебре",
			Description:  "sin (П + х/3) = 1/2\nрешите пожалуйста и объясните как решать чтобы в следующий раз я смог это решить сам.",
			Subject:      "Алгебра",
			Opener:       dich,
			OpenedTime:   time.Now(),
			DeadlineTime: time.Now().Add(48 * time.Hour),
			Cost:         5,
			Tags:         []database.QuestionTag{tag1, tag2},
			Answers:      []database.Answer{answer1, answer2},
			Upvoters:     []database.Upvoter{upvoter1, upvoter2},
			ChatMessages: []database.ChatMessage{m1, m2},
		}

		dbi.Create(question1)
	}

	// dbi.Updates(vas)

	// setup workers
	sc := workers.SessionCollector{}
	cc := workers.CostCalculator{}
	qc := workers.QuestionsCollector{}
	workers.StartWorker(sc)
	workers.StartWorker(cc)
	workers.StartWorker(qc)

	// setup microservices routing
	mux := http.NewServeMux()
	authorization.SetupRoutes(mux)
	profile.SetupRoutes(mux)
	questions.SetupRoutes(mux)
	notifications.SetupRoutes(mux)

	// setup statics
	fs := http.FileServer(http.Dir("static"))
	mux.Handle("/static/", http.StripPrefix("/static/", fs))
	mux.HandleFunc("/upload", func(w http.ResponseWriter, r *http.Request) {
		header := w.Header()
		header.Add("Access-Control-Allow-Origin", "*")
		header.Add("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
		header.Add("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")

		er := r.ParseMultipartForm(0)
		if er != nil {
			log.Fatal(er)
		}

		file, handler, err := r.FormFile("avatar")
		if err != nil {
			return
		}
		defer file.Close()

		ext := filepath.Ext(handler.Filename)
		login := r.FormValue("login")
		imagePath := login + ext
		f, err := os.OpenFile("static/"+imagePath, os.O_WRONLY|os.O_CREATE, 0666)

		if err != nil {
			return
		}

		io.Copy(f, file)

		var user database.User
		dbi.First(&user, "login = ?", login)
		if user.ID != 0 {
			user.ImagePath = imagePath
			dbi.Save(&user)
		}
	})

	mux.HandleFunc("/upload/answer", func(w http.ResponseWriter, r *http.Request) {
		header := w.Header()
		header.Add("Access-Control-Allow-Origin", "*")
		header.Add("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
		header.Add("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")

		er := r.ParseMultipartForm(0)
		if er != nil {
			log.Fatal(er)
		}

		file, handler, err := r.FormFile("answerImage")
		if err != nil {
			println("error1")
			return
		}
		defer file.Close()

		ext := filepath.Ext(handler.Filename)
		imagePath := uuid.New().String() + ext
		f, err := os.OpenFile("static/answer/"+imagePath, os.O_WRONLY|os.O_CREATE, 0666)

		if err != nil {
			return
		}

		io.Copy(f, file)

		answerID, _ := strconv.Atoi(r.FormValue("answerID"))
		var answer database.Answer
		dbi.First(&answer, "id = ?", answerID)
		if answer.ID != 0 {
			answer.ImagePath = "answer/" + imagePath
			dbi.Save(&answer)
		}
	})

	// start the server
	log.Println("Search engine init...")
	search.Init()
	initSearchFromDB()
	log.Println("Starting...")
	log.Fatal(http.ListenAndServe(":8080", mux))
}
