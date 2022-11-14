mod core;
use std::time::Instant;
use serde_json::Value;
use crate::core::contract::StreamCreator;
use amiquip::Connection;
use amiquip::ConsumerMessage;
use crate::core::contract::Publisher;
use crate::core::contract::Subscriber;

use std::thread;
use std::time::Duration;
use serde_json::json;

use std::env;

#[tokio::main]
async fn main() {
    let transformation = env::var("TRANSFORMATION_ID").unwrap();
    let count: i64 = 300;

    let url = env::var("AMQP_URL").expect("AMQP_URL is not set.");
	let port = env::var("AMQP_PORT").expect("AMQP_PORT is not set.");
	let uname = env::var("AMQP_USERNAME").expect("AMQP_USERNAME is not set.");
	let pwd = env::var("AMQP_PASSWORD").expect("AMQP_PASSWORD is not set.");

    let mut connection = Connection::insecure_open(&format!("amqp://{uname}:{pwd}@{url}:{port}")).expect("Failed to connect to AMQP Broker.");
    let channel = connection.open_channel(None).expect("Failed to open a channel.");
    let mut data_stream_pub = core::amqp::AmqpPublisher::new("etl-data-stream", &channel);
    let status_channel = connection.open_channel(None).expect("Failed to open a channel.");
    let mut status_pub = core::amqp::AmqpPublisher::new("etl-status-stream", &status_channel);
    
    thread::spawn(move || {
        let transformation_id = env::var("TRANSFORMATION_ID").unwrap();
        let liveness_channel = connection.open_channel(None).expect("Failed to open a channel.");
        let mut liveness_pub = core::amqp::AmqpPublisher::new("etl-status-stream", &liveness_channel);
        loop {
            liveness_pub.publish(&json!({
                "type": "Liveness",
                "transformationId": transformation_id,
                "totalCount": count
            }).to_string());
            thread::sleep(Duration::from_secs(1));
        }
    });

    let mut status_sub = core::amqp::AmqpSubscriber::new("etl-status-stream", "etl-commands-queue", &status_channel);

    let consumer = status_sub.subscribe();

    for (_i, message) in consumer.receiver().iter().enumerate() {
        match message {
          ConsumerMessage::Delivery(delivery) => {
            let body = String::from_utf8_lossy(&delivery.body).into_owned();
            consumer.ack(delivery).expect("Failed to ack.");

            let v: Value = serde_json::from_str(&body)
                .expect("Failed to parse consumed message to JSON.");
            
            if v["type"] != "ProcessStart" || v["transformationId"] != transformation.as_str() {
                continue;
            }
            let mut stream_creator = core::stream_creators::HttpStreamCreator::new(count);

            loop {
                let now = Instant::now();
                let stream = stream_creator.next().await;
                if stream == "" {
                    break;
                }
                data_stream_pub.publish(&json!({
                    "stream": &stream,
                    "transformationId": transformation,
                }).to_string());
                status_pub.publish(&json!({
                    "type": "StreamPublished",
                    "transformationId": transformation,
                    "time": now.elapsed().as_millis() as u64,
                    "stream": &stream
                }).to_string());
            }
          }
          other => {
            println!("Consumer ended: {:?}", other);
            break;
          }
        }
    }

}