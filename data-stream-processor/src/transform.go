package src

import (
	"fmt"
	"os"
	"os/exec"
	"strings"
	"time"

	"github.com/go-resty/resty/v2"
)

type TransformationRulesProvider struct {
	client *resty.Client
	url    string
	cache  map[string]string
	timers map[string]*time.Timer
}

func NewProvider() *TransformationRulesProvider {
	return &TransformationRulesProvider{
		client: resty.New(),
		url:    os.Getenv("TRANSFORMATION_RULES_URL") + "/api/v1",
		cache:  make(map[string]string),
		timers: make(map[string]*time.Timer),
	}
}

type TransformationRule struct {
	Id    string `json:"id"`
	Name  string `json:"name"`
	Rules string `json:"rules"`
}

func GetRules(self *TransformationRulesProvider, transformationId string) string {
	if timer, ok := self.timers[transformationId]; ok {
		timer.Stop()
	}
	if rules, ok := self.cache[transformationId]; ok {
		return rules
	}
	resp, err := self.client.R().
		SetHeader("Content-Type", "application/json").
		SetHeader("Accept", "application/json").
		SetResult(&TransformationRule{}).
		Get(self.url + "/transformation-rules/" + transformationId)
	if err != nil {
		panic("Failed to fetch transformation rules.")
	}
	self.cache[transformationId] = resp.Result().(*TransformationRule).Rules
	self.timers[transformationId] = time.AfterFunc(10*time.Second, func() { delete(self.cache, transformationId) })
	return self.cache[transformationId]
}

var DslProjectPath = `./dsl`

func Transform(stream string, rules string) (string, error) {
	cmd := exec.Command("python", fmt.Sprintf("%s/main.py", DslProjectPath), stream, rules, fmt.Sprintf("%s/grammar.tx", DslProjectPath))
	out, err := cmd.CombinedOutput()
	result := strings.TrimSpace(string(out))
	if err != nil {
		return result, err
	} else {
		return result, nil
	}
}
