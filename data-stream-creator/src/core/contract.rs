use async_trait::async_trait;

#[async_trait]
pub trait StreamCreator {
  fn new(count: i64) -> Self;
  async fn next(&mut self) -> String;
}

pub trait Publisher<'p> {
  fn new(exchange: &'p str, channel: &'p amiquip::Channel) -> Self;
  fn publish(&mut self, data: &str);
}

pub trait Subscriber<'s> {
  fn new(exchange: &'s str, queue: &'s str, channel: &'s amiquip::Channel) -> Self;
  fn subscribe(&mut self) -> amiquip::Consumer;
}