/// Module declaration.
pub mod http;
pub mod contract;

/// Re-exporting the greeting function.
pub use http::HttpStreamCreator;
pub use contract::StreamCreator;