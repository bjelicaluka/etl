package main

import (
	"fmt"
	"os/exec"
	"sync"
)

func transform(stream string) (string, error) {
	cmd := exec.Command("python", "./dsl/main.py", stream, "./dsl/grammar.tx", "./dsl/test.etl")
	out, err := cmd.CombinedOutput()
	if err != nil {
		return "", err
	} else {
		return string(out), nil
	}
}

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

	num := 1000
	pool_size := 200
	stream_ch := make(chan string)

	var wg sync.WaitGroup

	for i := 0; i < pool_size; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for stream := range stream_ch {
				result, err := transform(stream)
				if err != nil {
					fmt.Println(err)
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
