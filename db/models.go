package db

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type Session struct {
	ID          string
	DestroyTime time.Time
	UserID      int
	User        *User
}

func (s *Session) BeforeCreate(tx *gorm.DB) (err error) {
	s.ID = uuid.New().String()
	s.DestroyTime = time.Now().Add(1 * time.Hour)
	return
}

func (s *Session) AfterFind(tx *gorm.DB) (err error) {
	s.DestroyTime = time.Now().Add(1 * time.Hour)
	return
}

func (s Session) Expired() bool {
	return time.Now().After(s.DestroyTime)
}

type Comment struct {
	ID int

	BelongsToUserID int
	GotFromUserid   int

	Text  string
	Score uint8

	Commentator *User `gorm:"foreignkey:GotFromUserid"`
}

type User struct {
	ID           int
	Coins        int
	Login        string
	PasswordHash string
	Name         string
	Comments     []Comment `gorm:"ForeignKey:BelongsToUserID"`
}

type Donator struct {
	ID       int
	AnswerID int
	UserID   int
	User     *User `gorm:"ForeignKey:UserID"`
	Coins    int
}

type Answer struct {
	ID         int
	QuestionID int
	Text       string
	Best       bool
	Date       time.Time

	AuthorID int
	Author   *User `gorm:"foreignkey:AuthorID"`

	Donators []Donator `gorm:"ForeignKey:AnswerID"`
}

type Upvoter struct {
	ID         int
	QuestionID int
	UserID     int
	User       *User `gorm:"ForeignKey:UserID"`
	Coins      int
}

type Question struct {
	ID int

	OpenerID int
	Opener   *User `gorm:"foreignkey:OpenerID"`

	Title        string
	Description  string
	Subject      string
	OpenedTime   time.Time
	DeadlineTime time.Time
	Cost         int

	Tags         []QuestionTag `gorm:"many2many:question_tag;"`
	Answers      []Answer      `gorm:"ForeignKey:QuestionID"`
	Upvoters     []Upvoter     `gorm:"ForeignKey:QuestionID"`
	ChatMessages []ChatMessage `gorm:"ForeignKey:QuestionID"`
}

type QuestionTag struct {
	ID        string
	Questions []Question `gorm:"many2many:question_tag;"`
}

type QuestionSubject struct {
	ID    int
	Title string
}

type ChatMessage struct {
	ID         int
	QuestionID int
	UserID     int
	User       *User `gorm:"foreignkey:UserID"`
	Text       string
	Time       time.Time
}
