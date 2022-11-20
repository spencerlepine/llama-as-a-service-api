# LaaS Load Tester

Load testing the [LaaS API](https://github.com/spencerlepine/laas-api) using [Artillery](https://github.com/artilleryio/artillery)

## Usage
1. Build the NodeJS API docker image (named `laas-api` by default)
2. Run Artillery load test manually, or containerized

## Run Load Tester Manually
Run a load test on a URL, passes or fails threshholds. Cannot see the `output.html` file.

1. Start the API server
2. Visit [`config.yml`](./load-tester/config.yml)
3. Update the target URL
4. Run the following commands to execute

```sh
$ cd load-tester
$ yarn run start config.yml --output report.json
$ yarn run report report.json
# open "report.json.html" in the browser
```

## Run Containerized Load Tester
1. Visit [`docker-compose.yml`](./containerized-load-tester/docker-compose.yml)
2. Update the dummy server image: `image: laas_api`
3. Update the `MAX_LATENCY`, `MAX_RPS`, and `TEST_CONFIG` values
4. Run the following commands to execute

> Docker-compose looks for the NodeJS API image on local machine

```sh
$ cd containerized-load-tester
$ docker-compose up
# passes or fails
```