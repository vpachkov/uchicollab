package workers

import (
	"log"
	"time"
	"uchicollab/database"
)

type QuestionsCollector struct{}

func (QuestionsCollector) Callback() {
	log.Println("QuestionsCollector callback")

	dbi := database.Get()

	var questions []database.Question
	dbi.
		Preload("Answers").
		Preload("Answers.Donators").
		Preload("Answers.Author").
		Preload("Upvoters").
		Find(&questions, "active = true")

	now := time.Now()
	for _, question := range questions {
		if question.DeadlineTime.Before(now) {
			for _, answer := range question.Answers {
				coinsForAnswer := 0
				for _, donator := range answer.Donators {
					coinsForAnswer += donator.Coins
				}
				answer.Author.Coins += coinsForAnswer
				dbi.Save(answer.Author)
			}

			question.Active = false
			dbi.Save(&question)
		}
	}
}

func (QuestionsCollector) GetDuration() time.Duration {
	return 2 * time.Minute
}
