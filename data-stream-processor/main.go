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
					take all Origins where startswith(origin, '188') and contains(origin, '115') select origin as host;
					take first Breeds where exists(message) select message.african as list;
					take first Quote where exists(_.0) select _.0 as quote;
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
