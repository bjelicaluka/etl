FROM rust:alpine

COPY ./ ./

RUN cargo build --release

CMD ["./target/release/data-stream-creator"]