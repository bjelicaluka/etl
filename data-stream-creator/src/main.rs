mod core;
use serde_json::Value;
use crate::core::contract::StreamCreator;
use amiquip::Connection;
use amiquip::ConsumerMessage;
use crate::core::contract::Publisher;
use crate::core::contract::Subscriber;

use std::thread;
use std::time::Duration;
use serde_json::json;

#[tokio::main]
async fn main() {
    let transformation = "Transformation-165-A";
    let count: i64 = 10;

    let mut connection = Connection::insecure_open("amqp://p:w@bjelicaluka.com:5672").expect("Failed to connect to AMQP Broker.");
    let channel = connection.open_channel(None).expect("Failed to open a channel.");
    let mut data_stream_pub = core::amqp::AmqpPublisher::new("etl-data-stream", &channel);
    let status_channel = connection.open_channel(None).expect("Failed to open a channel.");
    let mut status_pub = core::amqp::AmqpPublisher::new("etl-status-stream", &status_channel);
    
    thread::spawn(move || {
        let liveness_channel = connection.open_channel(None).expect("Failed to open a channel.");
        let mut liveness_pub = core::amqp::AmqpPublisher::new("etl-status-stream", &liveness_channel);
        loop {
            liveness_pub.publish(&json!({
                "type": "Liveness",
                "transformationId": transformation,
                "data": {
                    "totalCount": count
                }
            }).to_string());
            thread::sleep(Duration::from_secs(5));
        }
    });

    let mut status_sub = core::amqp::AmqpSubscriber::new("etl-status-stream", "", &status_channel);

    let consumer = status_sub.subscribe();

    for (_i, message) in consumer.receiver().iter().enumerate() {
        match message {
          ConsumerMessage::Delivery(delivery) => {
            let body = String::from_utf8_lossy(&delivery.body).into_owned();
            consumer.ack(delivery).expect("Failed to ack.");

            let v: Value = serde_json::from_str(&body)
                .expect("Failed to parse consumed message to JSON.");
            
            if v["type"] != "ProcessStart" || v["transformationId"] != transformation {
                continue;
            }
            let mut stream_creator = core::http::HttpStreamCreator::new(count);

            loop {
                let stream = stream_creator.next().await;
                if stream == "" {
                    break;
                }
                data_stream_pub.publish(&stream);
                status_pub.publish(&json!({
                    "type": "StreamPublished",
                    "transformationId": transformation,
                }).to_string());
            }
            
            status_pub.publish(&json!({
                "type": "ProcessDone",
                "transformationId": transformation,
            }).to_string());
          }
          other => {
            println!("Consumer ended: {:?}", other);
            break;
          }
        }
    }

}