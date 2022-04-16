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
			for streamString := range streams {
				start := time.Now()

				var stream map[string]interface{}
				_ = json.Unmarshal([]byte(streamString.Body), &stream)
				transformation := stream["transformationId"].(string)
				rules := src.GetRules(transformationRulesProvider, transformation)
				result, err := src.Transform(string(stream["stream"].(string)), rules)
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
							fmt.Println(transformation, string(marshaled))
						}(singleResult)
					}
				}
				handleWg.Wait()

				marshaledStatus, _ := json.Marshal(map[string]interface{}{
					"type":             "StreamProcessed",
					"transformationId": transformation,
					"time":             time.Since(start).Milliseconds(),
					"results":          resultsString,
				})
				ch.Publish("etl-status-stream", "", false, false, amqp.Publishing{
					ContentType: "text/plain",
					Body:        marshaledStatus,
				})
			}
		}()
	}

	wg.Wait()
}
