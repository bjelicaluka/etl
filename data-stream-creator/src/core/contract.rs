use async_trait::async_trait;

#[async_trait]
pub trait StreamCreator {
  fn new() -> Self;
  async fn next(&mut self) -> String;
}

pub trait Publisher<'p> {
  fn new(exchange: &'p str, channel: &'p amiquip::Channel) -> Self;
  fn publish(&mut self, data: &str);
}