FROM rust

COPY ./ ./

RUN apt update
RUN apt install pkg-config

RUN cargo build --release

CMD ["./target/release/data-stream-creator"]