package src

import (
	"fmt"
	"log"
	"os"

	"github.com/streadway/amqp"
)

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

func InitChannel() (*amqp.Connection, *amqp.Channel, <-chan amqp.Delivery) {
	url := os.Getenv("AMQP_URL")
	port := os.Getenv("AMQP_PORT")
	uname := os.Getenv("AMQP_USERNAME")
	pwd := os.Getenv("AMQP_PASSWORD")
	conn, err := amqp.Dial(fmt.Sprintf("amqp://%s:%s@%s:%s", uname, pwd, url, port))
	failOnError(err, "Failed to connect to RabbitMQ")

	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")

	exerr := ch.ExchangeDeclare(
		"etl-data-stream",
		amqp.ExchangeFanout,
		true,
		false, false, false, amqp.Table{})
	failOnError(exerr, "Failed to declare an exchange")

	q, err := ch.QueueDeclare("etl-stream-processing", false, false, false, false, nil)
	failOnError(err, "Failed to declare a queue")

	qberr := ch.QueueBind(q.Name, "", "etl-data-stream", false, amqp.Table{})
	failOnError(qberr, "Failed to bind a queue to an exchange")

	msgs, err := ch.Consume(q.Name, "", true, false, false, false, nil)
	failOnError(qberr, "Failed to consume from queue")

	return conn, ch, msgs
}
