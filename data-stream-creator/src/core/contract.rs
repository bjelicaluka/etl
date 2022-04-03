pub trait StreamCreator {
  fn new() -> Self;
  fn next(&mut self) -> &str;
}
