package main

import (
	"encoding/json"
	"fmt"
	"stream-processor/src"
	"sync"
	"time"

	"github.com/streadway/amqp"
)

func main() {
	var wg sync.WaitGroup

	conn, ch, streams := src.InitChannel()
	defer conn.Close()
	defer ch.Close()

	handlers := src.New().HandlersRegistry
	transformationRulesProvider := src.NewProvider()

	pool_size := 20
	for i := 0; i < pool_size; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()

			for streamMessage := range streams {
				start := time.Now()

				stream := parseStream(streamMessage.Body)

				transformation := stream["transformationId"].(string)
				rules := src.GetRules(transformationRulesProvider, transformation)

				results := handle(handlers, string(stream["stream"].(string)), rules)

				sendStreamProcessedInfo(ch, transformation, time.Since(start).Milliseconds(), results)
			}
		}()
	}

	wg.Wait()
}

func parseStream(streamString []byte) map[string]interface{} {
	var stream map[string]interface{}
	_ = json.Unmarshal(streamString, &stream)
	return stream
}

func handle(handlers map[string]*src.RecordHandler, stream string, rules string) string {
	result, err := src.Transform(stream, rules)
	var handleWg sync.WaitGroup

	resultsString := ""
	if err != nil {
		fmt.Println(err)
		fmt.Println(result)
	} else {
		var transformationResults []map[string]interface{}
		_ = json.Unmarshal([]byte(result), &transformationResults)

		for _, singleResult := range transformationResults {
			handleWg.Add(1)
			go func(transformationResult map[string]interface{}) {
				defer handleWg.Done()
				marshaled, err := json.Marshal(transformationResult["result"])
				if err == nil {
					src.Handle(handlers[transformationResult["type"].(string)], string(marshaled))
				}
				resultsString += string(marshaled) + "\n"
			}(singleResult)
		}
	}
	handleWg.Wait()

	return resultsString
}

func sendStreamProcessedInfo(ch *amqp.Channel, transformationId string, elapsedTime int64, results string) {
	marshaledStatus, _ := json.Marshal(map[string]interface{}{
		"type":             "StreamProcessed",
		"transformationId": transformationId,
		"time":             elapsedTime,
		"results":          results,
	})
	ch.Publish("etl-status-stream", "", false, false, amqp.Publishing{
		ContentType: "text/plain",
		Body:        marshaledStatus,
	})
}
