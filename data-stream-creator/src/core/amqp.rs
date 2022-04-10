use std::collections::BTreeMap;
use amiquip::ExchangeType;
use crate::core::contract;

use amiquip::{Publish, ExchangeDeclareOptions};

pub struct AmqpPublisher<'a> {
  channel: &'a amiquip::Channel,
  exchange: &'a str
}

impl<'p> contract::Publisher<'p> for AmqpPublisher<'p> {
  fn new(exchange: &'p str, channel: &'p amiquip::Channel) -> AmqpPublisher<'p> {
    let _e = channel.exchange_declare(ExchangeType::Fanout, exchange, ExchangeDeclareOptions {
      durable: true,
      internal: false,
      auto_delete: false,
      arguments: BTreeMap::new()
    }).expect("Failed to declare an exchange.");
    AmqpPublisher { channel, exchange }
  }

  fn publish(&mut self, data: &str) {
    self.channel.basic_publish(self.exchange, Publish::new(data.as_bytes(), "")).ok();
  }
}
