package db

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var dataBase *gorm.DB

func Init() {
	host := "localhost"
	dsn := "host=" + host + " user=uuser password=ppassword dbname=uchicollab port=5432"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	if err := db.AutoMigrate(
		&User{}, &Session{}, &Comment{}, &QuestionTag{},
		&QuestionSubject{}, &Donator{},
		&Answer{}, &Question{}, &Upvoter{}); err != nil {
		panic(err)
	}

	dataBase = db
}

func Get() *gorm.DB {
	return dataBase
}
