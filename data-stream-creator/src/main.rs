mod core;
use crate::core::contract::StreamCreator;
use amiquip::Connection;
use crate::core::contract::Publisher;


#[tokio::main]
async fn main() {
    let mut stream_creator = core::http::HttpStreamCreator::new();

    let mut connection = Connection::insecure_open("amqp://root:isobarot1234@bjelicaluka.com:5672").expect("Failed to connect to AMQP Broker.");
    let channel = connection.open_channel(None).expect("Failed to open a channel.");
    
    let mut amqp = core::amqp::AmqpPublisher::new("etl-data-stream", &channel);

    loop {
        let stream = stream_creator.next().await;
        println!("{}", stream);
        amqp.publish(&stream);
        println!("{}", "Sent");
    }
}