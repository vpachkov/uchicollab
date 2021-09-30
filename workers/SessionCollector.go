package workers

import "time"

type SessionCollector struct{}

func (SessionCollector) Callback() {
	println("callback")
}

func (SessionCollector) GetDuration() time.Duration {
	return 500
}