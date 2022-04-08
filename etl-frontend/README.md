# ETL Frontend

## Steps for setting up development environment

1. Create `.env.local` file with the following content:
```
API_HOSTNAME=etl-frontend.com
API_PROTOCOL=https
API_PORT=443
API_PATH=/
SAME_HOST=false
```

2. `npm i`
3. `npm start`

## Steps to run this project using docker CLI (Linux):

1. Build the image
```bash
docker build -t frontend .
```

2. Run a container
```bash
docker run -dp <port>:80 \
  -e API_HOSTNAME='etl-frontend.com' \
  -e API_PROTOCOL='https' \
  -e API_PORT='443' \
  -e API_PATH='/' \
  -e SAME_HOST='false' \
  frontend:<tag>
```

## Steps to run this project using docker CLI (Windows):

1. Build the image
```powershell
docker build -t frontend .
```

2. Run a container
```powershell
docker run -dp <port>:80 `
  -e API_HOSTNAME='etl-frontend.com' `
  -e API_PROTOCOL='https' `
  -e API_PORT='443' `
  -e API_PATH='/' `
  -e SAME_HOST='false' `
  frontend:<tag>
```

## Useful links for working environment and 3rd party libraries

| Lib | Description | URL |
| :--- | :--- | :--- |
| <b>React.js | A JavaScript library for building user interfaces. | https://reactjs.org/ |
| <b>moment.js | A JavaScript library for parsing, validating, manipulating and displaying dates. | https://momentjs.com/ |
| <b>Redux | A Predictable State Container for JS Apps. | https://redux.js.org/ |
| <b>React Router | Navigation components in React Apps. | https://reactrouter.com/ |
| <b>Leaflet | A JavaScript library for interactive maps. | https://leafletjs.com/ |
