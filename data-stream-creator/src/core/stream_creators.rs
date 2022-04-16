use serde_json::json;
use crate::core::contract;
use crate::core::http;
use async_trait::async_trait;
use futures::future::try_join_all;

pub struct HttpStreamCreator {
  count: i64
}

#[async_trait]
impl contract::StreamCreator for HttpStreamCreator {
  fn new(count: i64) -> HttpStreamCreator {
    HttpStreamCreator { count }
  }
  
  async fn next(&mut self) -> String {
    if self.count == 0 {
      return String::from("")
    }
    let stream = try_join_all([
      http::get_async("http://httpbin.org/ip"),
      http::get_async("http://dog.ceo/api/breeds/list/all"),
      http::get_async("http://ron-swanson-quotes.herokuapp.com/v2/quotes")
    ]).await.expect("Failed to fetch stream data.");
    self.count -= 1;
    String::from(json!(stream).to_string())
  }
}