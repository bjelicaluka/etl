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