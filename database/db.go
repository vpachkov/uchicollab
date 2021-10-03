package database

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"os"
)

var dataBase *gorm.DB

func Init() {
	host := "localhost"
	if env, exists := os.LookupEnv("DB_HOST"); exists {
		host = env
	}
	dsn := "host=" + host + " user=uuser password=ppassword dbname=uchicollab port=5432"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
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
