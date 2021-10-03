FROM golang:latest as golang_builder
WORKDIR /go/src/uchicollab
COPY . .
RUN go env -w GO111MODULE=off
RUN go get -u github.com/go-ego/riot
RUN go get -u github.com/google/uuid
RUN go get -u gorm.io/gorm
RUN go get -u gorm.io/driver/postgres
RUN go build

FROM ubuntu:latest
COPY --from=golang_builder /go/src/uchicollab/uchicollab /
WORKDIR /
CMD ["./uchicollab"]