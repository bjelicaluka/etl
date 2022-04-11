# ETL Status Tracker Service

Service for tracking the status of an ETL process.

## Steps to run this project using `npm CLI`:

1. Define enviroment variables:

```bash
export NODE_ENV='development' # or production

export REDIS_PASSWORD=''
export AMQP_USERNAME=''
export AMQP_PASSWORD=''

export API_PREFIX=''
export EXPOSE_API_DOCS='true'
export EXPOSE_SWAGGER_UI='true' 
export DOC_PATH='explorer'
export API_PROTOCOL='http'
export API_HOSTNAME='localhost'
export API_PORT='80'
export API_PREFIX=''
```

2. Create `default.json` in  `config` directory with the following content:

```json
{
  "redis": {
    "port": 6379,
    "host": "localhost"
  },
  "amqp": {
    "host": "localhost",
    "retryInterval": 5000
  }
}
```
or for production environment: `production.json`

```json
{
  "redis": {
    "port": 6379,
    "host": "remotehost"
  },
  "amqp": {
    "host": "remotehost",
    "retryInterval": 5000
  }
}
}
```

3. `npm i` or `npm ci --production`
4. `npm start` or `npm run build && node build/index.js`

## Steps to run this project using `docker CLI` (Linux):

1. Create `production.json` in  `config` directory with the content from "Step 2" in "Steps to run this project using `npm CLI`".
 
2. Build Docker container:
```bash
docker build -t etl-tracker-service .
```

3. Run Docker container:
```bash
docker run -dp <port>:80 \
  -e NODE_ENV='production' \
  -e REDIS_PASSWORD='' \
  -e AMQP_USERNAME='' \
  -e AMQP_PASSWORD='' \
  -e API_PREFIX='' \
  -e EXPOSE_API_DOCS='true' \
  -e EXPOSE_SWAGGER_UI='true' \
  -e DOC_PATH='explorer' \
  -e API_PROTOCOL='http' \
  -e API_HOSTNAME='localhost' \
  -e API_PORT='80' \
  -e API_PREFIX='' \
  -v `pwd`/config/production.json:/app/config/production.json \
  etl-tracker-service:<tag>
```

## Steps to run this project using `docker CLI` (Windows):

1. Create `production.json` in  `config` directory with the content from "Step 2" in "Steps to run this project using `npm CLI`".
 
2. Build Docker container:
```bash
docker build -t etl-tracker-service .
```

3. Run Docker container:
```powershell
docker run -dp <port>:80 `
  -e NODE_ENV='production' `
  -e REDIS_PASSWORD='' `
  -e AMQP_USERNAME='' `
  -e AMQP_PASSWORD='' `
  -e API_PREFIX='' `
  -e EXPOSE_API_DOCS='true' `
  -e EXPOSE_SWAGGER_UI='true' `
  -e DOC_PATH='explorer' `
  -e API_PROTOCOL='http' `
  -e API_HOSTNAME='localhost' `
  -e API_PORT='80' `
  -e API_PREFIX='' `
  -v ${PWD}/config/production.json:/app/config/production.json `
  etl-tracker-service:<tag>
```

## Useful links for working environment and 3rd party libraries

| Lib | Description | URL |
| :--- | :--- | :--- |
| <b>TypeScript | Statically typed language on top of JavaScript. | https://www.typescriptlang.org/docs/ |
| <b>Inversify.js | IoC container for JavaScript. | https://inversify.io/ |
| <b>so<span>cket.io</span> | WebSocket lib for JavaScript.| https://socket.io/ |
| <b>Redis | JavaScript client lib for Redis. | https://redis.io/ |
| <b>Express | Node.js HTTP server. | https://expressjs.com/ |
| <b>Swagger JSDoc | API doc generator. | https://brikev.github.io/express-jsdoc-swagger-docs/ |
| <b>Express Validator | Validation middleware for Express. | https://express-validator.github.io/docs/ |
