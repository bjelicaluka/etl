mod core;
use crate::core::contract::StreamCreator;

use std::error::Error;

#[tokio::main]
async fn test() -> Result<(), Box<dyn Error>> {
    let resp = reqwest::get("https://httpbin.org/ip")
        .await?
        .text()
        .await?;
    println!("{:#?}", resp);
    Ok(())
}

fn main() {
    test();

    let mut stream_creator = core::http::HttpStreamCreator::new();

    loop {
        let c = stream_creator.next();
        if c == "" {
            break
        }
        println!("{}", c);
    }
}
