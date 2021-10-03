package database

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"os"
	"time"
)

var dataBase *gorm.DB

func Init() {
	host := "localhost"
	if env, exists := os.LookupEnv("DB_HOST"); exists {
		host = env
	}
	dsn := "host=" + host + " user=uuser password=ppassword dbname=uchicollab port=5432"

	var db *gorm.DB
	var err error
	for att := 0 ; att < 5 ; att++ {
		db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err == nil {
			break
		}
		time.Sleep(2 * time.Second)
	}

	if err != nil {
		panic("failed to connect database")
	}

	if err := db.AutoMigrate(
		&User{}, &Session{}, &Comment{}, &QuestionTag{},
		&QuestionSubject{}, &Donator{},
		&Answer{}, &Question{}, &Upvoter{},
		&ChatMessage{}, &Notification{}, &UserSubject{},
		&PrivateChatMessage{}, &PrivateChat{}); err != nil {
		panic(err)
	}

	dataBase = db
}

func Get() *gorm.DB {
	return dataBase
}
