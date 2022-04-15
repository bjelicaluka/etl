package src

import (
	"github.com/go-resty/resty/v2"
)

type Handlers struct {
	HandlersRegistry map[string]*RecordHandler
}

type RecordHandler struct {
	client *resty.Client
	url    string
}

func New() Handlers {
	handlers := Handlers{
		HandlersRegistry: make(map[string]*RecordHandler),
	}
	handlers.HandlersRegistry["Origins"] = &RecordHandler{
		client: resty.New(),
		url:    "http://localhost:3030",
	}
	handlers.HandlersRegistry["Breeds"] = &RecordHandler{
		client: resty.New(),
		url:    "http://localhost:3030",
	}
	handlers.HandlersRegistry["Quote"] = &RecordHandler{
		client: resty.New(),
		url:    "http://localhost:3030",
	}
	return handlers
}

func Handle(handler *RecordHandler, body string) {
	handler.client.R().
		SetHeader("Content-Type", "application/json").
		SetBody(body).
		Post(handler.url)
}
