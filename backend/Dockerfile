FROM golang:1.26.1-alpine

RUN apk add --no-cache git build-base

RUN go install github.com/air-verse/air@latest

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

# -cで設定ファイルを指定する
CMD ["air", "-c", ".air.toml"]
