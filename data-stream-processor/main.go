package main

import (
	"fmt"
	"stream-processor/src"
	"sync"
)

func main() {
	var wg sync.WaitGroup

	conn, ch, streams := src.InitChannel()
	defer conn.Close()
	defer ch.Close()

	pool_size := 20
	for i := 0; i < pool_size; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for stream := range streams {
				result, err := src.Transform(string(stream.Body), `
				take first User where firstName == "Luka" and contains(list, 'L') select firstName as fname, lastName as nested.test;
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

	wg.Wait()
}
