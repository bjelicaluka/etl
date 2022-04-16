FROM golang:1.16-alpine as build

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY . .

RUN go build -o ./data-stream-processor

FROM python:3.9-alpine

WORKDIR /app

COPY --from=build /app/data-stream-processor .

COPY dsl/ ./dsl
WORKDIR /app/dsl

RUN pip install -r requirements.txt

WORKDIR /app

CMD [ "./data-stream-processor" ]