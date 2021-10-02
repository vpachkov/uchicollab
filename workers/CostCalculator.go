package workers

import (
	"log"
	"time"
	"uchicollab/db"
)

type CostCalculator struct{}

func (CostCalculator) Callback() {
	log.Println("CostCalculator callback")

	dbi := db.Get()

	var questions []db.Question
	dbi.
		Preload("Upvoters").
		Find(&questions)

	for _, question := range questions {
		newCost := 0
		for _, upvoter := range question.Upvoters {
			newCost += upvoter.Coins
		}
		question.Cost = newCost
		dbi.Save(&question)
	}
}

func (CostCalculator) GetDuration() time.Duration {
	return 2 * time.Minute
}
