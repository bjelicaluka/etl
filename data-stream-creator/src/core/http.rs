use crate::core::contract;

pub struct HttpStreamCreator {
  count: i16
}

impl contract::StreamCreator for HttpStreamCreator {
  fn new() -> HttpStreamCreator {
    HttpStreamCreator { count: 10 }
  }

  fn next(&mut self) -> &str {
    self.count -= 1;
    if self.count == 0 {
      return ""
    }
    "ASD"
  }
}