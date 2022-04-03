package main

import (
	"fmt"
	"stream-processor/src"
	"sync"
)

func main() {
	stream := `
	[
		{
			"firstName": "Luka",
			"lastName": "Bjelica"
		},
		{
			"firstName": "Luka",
			"lastName": "Test",
			"list": [
				"L"
			]
		},
		{
			"accountId": 1,
			"name": "test"
		}
	]
	`

	num := 100
	pool_size := 20
	stream_ch := make(chan string)

	var wg sync.WaitGroup

	for i := 0; i < pool_size; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for stream := range stream_ch {
				result, err := src.Transform(stream, `
				take first User where firstName == "Luka" and contains(list, 'L') select firstName, lastName;
				`)
				if err != nil {
					fmt.Println(err)
					fmt.Println(result)
				} else {
					fmt.Println(result)
				}
			}
		}()
	}

	for i := 0; i < num; i++ {
		stream_ch <- stream
	}

	close(stream_ch)

	wg.Wait()
}
