# LaaS Load Tester (Containerized)

Containerized load tester for the [LaaS API](https://github.com/spencerlepine/laas-api) using [Artillery](https://github.com/artilleryio/artillery) and [Docker](https://www.docker.com/)

## Usage
```sh
$ docker-compose up
# passes, or FAILS
```

## Customization
Edit the [`docker-compose.yml`](./docker-compose.yml) file ` MAX_LATENCY`, `MAX_RPS`, and `TEST_CONFIG`. See this [Guide](https://blog.appsignal.com/2021/11/10/a-guide-to-load-testing-nodejs-apis-with-artillery.html) for config examples.