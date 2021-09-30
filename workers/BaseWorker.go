package workers

import "time"

type BaseWorker interface {
	Callback()
	GetDuration() time.Duration
}

func StartWorker(worker BaseWorker) {
	ticker := time.NewTicker(worker.GetDuration() * time.Millisecond)
	quit := make(chan struct{})

	go func() {
		for {
			select {
			case <- ticker.C:
				worker.Callback()
			case <- quit:
				ticker.Stop()
				return
			}
		}
	}()
}