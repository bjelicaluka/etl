use serde_json::json;
use crate::core::contract;
use async_trait::async_trait;
use futures::future::try_join_all;

pub struct HttpStreamCreator { }

#[async_trait]
impl contract::StreamCreator for HttpStreamCreator {
  fn new() -> HttpStreamCreator {
    HttpStreamCreator { }
  }
  
  async fn next(&mut self) -> String {
    let stream = try_join_all([
      http::get_async("https://httpbin.org/ip"),
      http::get_async("https://dog.ceo/api/breeds/list/all"),
      http::get_async("https://ron-swanson-quotes.herokuapp.com/v2/quotes")
    ]).await.expect("Failed to fetch stream data.");

    String::from(json!(stream).to_string())
  }
}

mod http {
  use serde_json::Value;
  use std::error::Error;

  pub async fn get_async(url: &str) -> Result<Value, Box<dyn Error>> {
    let resp = reqwest::get(url)
      .await?
      .text()
      .await?;
    let v: Value = serde_json::from_str(&resp)?;
    Ok(v)
  }
}