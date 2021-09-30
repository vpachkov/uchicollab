package db

import "time"

type Session struct {
	ID   string
	TimeLeft time.Duration
	UserID int
	User User
}

type User struct {
	ID int
	Name string
}