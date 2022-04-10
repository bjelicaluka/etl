/// Module declaration
pub mod contract;
pub mod http;
pub mod amqp;

/// Re-exporting
pub use contract::StreamCreator;
pub use http::HttpStreamCreator;
pub use amqp::AmqpPublisher;