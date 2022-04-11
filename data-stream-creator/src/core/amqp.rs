use amiquip::Consumer;
use crate::core::contract;
use amiquip::ConsumerOptions;
use amiquip::ExchangeType;
use amiquip::QueueDeclareOptions;
use std::collections::BTreeMap;

use amiquip::{ExchangeDeclareOptions, Publish};

pub struct AmqpPublisher<'a> {
  channel: &'a amiquip::Channel,
  exchange: &'a str,
}

impl<'p> contract::Publisher<'p> for AmqpPublisher<'p> {
  fn new(exchange: &'p str, channel: &'p amiquip::Channel) -> AmqpPublisher<'p> {
    let _e = channel
      .exchange_declare(
        ExchangeType::Fanout,
        exchange,
        ExchangeDeclareOptions {
          durable: true,
          internal: false,
          auto_delete: false,
          arguments: BTreeMap::new(),
        },
      )
      .expect("Failed to declare an exchange.");
    AmqpPublisher { channel, exchange }
  }

  fn publish(&mut self, data: &str) {
    self
      .channel
      .basic_publish(self.exchange, Publish::new(data.as_bytes(), ""))
      .ok();
  }
}

pub struct AmqpSubscriber<'a> {
  channel: &'a amiquip::Channel,
  queue: &'a str,
}

impl<'s> contract::Subscriber<'s> for AmqpSubscriber<'s> {
  fn new(exchange: &'s str, queue: &'s str, channel: &'s amiquip::Channel) -> AmqpSubscriber<'s> {
    let _e = channel
      .exchange_declare(
        ExchangeType::Fanout,
        exchange,
        ExchangeDeclareOptions {
          durable: true,
          internal: false,
          auto_delete: false,
          arguments: BTreeMap::new(),
        },
      )
      .expect("Failed to declare an exchange.");
    let _q = channel
      .queue_declare(
        queue,
        QueueDeclareOptions {
          durable: true,
          auto_delete: false,
          arguments: BTreeMap::new(),
          exclusive: false,
        },
      )
      .expect("Failed to declare a queue.");
    let _b = channel
      .queue_bind(queue, exchange, "", BTreeMap::new())
      .expect("Failed to bind the queue to the exchange.");
    AmqpSubscriber {
      channel,
      queue,
    }
  }

  fn subscribe(&mut self) -> Consumer {
    self.channel.basic_consume(
        self.queue,
        ConsumerOptions {
          arguments: BTreeMap::new(),
          exclusive: false,
          no_ack: false,
          no_local: false,
        },
      )
      .expect("Failed to consume from queue.")
  }
}
