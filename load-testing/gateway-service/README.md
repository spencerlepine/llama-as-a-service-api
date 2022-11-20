# LaaS Authentication API Service

[![CI](https://github.com/llama-as-a-service/gateway-service/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/llama-as-a-service/gateway-service/actions/workflows/ci.yml) [![Heroku Deploy](https://github.com/llama-as-a-service/gateway-service/actions/workflows/heroku-deploy.yml/badge.svg?branch=main)](https://github.com/llama-as-a-service/gateway-service/actions/workflows/heroku-deploy.yml) [![Publish Docker](https://github.com/llama-as-a-service/gateway-service/actions/workflows/publish-to-ghcr.yml/badge.svg?branch=main)](https://github.com/llama-as-a-service/gateway-service/actions/workflows/publish-to-ghcr.yml) [![Stable Version](https://img.shields.io/github/v/tag/llama-as-a-service/gateway-service)](https://img.shields.io/github/v/tag/llama-as-a-service/gateway-service) [![Latest Release](https://img.shields.io/github/v/release/llama-as-a-service/gateway-service?color=%233D9970)](https://img.shields.io/github/v/tag/llama-as-a-service/gateway-service?color=%233D9970)

Gateway API Service. Built with NodeJS, Express, and Docker. Serves as a proxy to other microservices.

## ⚙️ Setup
```sh
$ git clone https://github.com/llama-as-a-service/gateway-service.git
$ cd gateway-service
$ cp .env.sample .env
$ docker-compose up -d
# access on localhost:8888
```

## 🧪 Test
```sh
$ docker-compose exec gateway_api yarn run test
```

## 📦 Pull from GitHub Repository Container Registry
```sh
# docker pull ghcr.io/OWNER/IMAGE_NAME
$ docker pull ghcr.io/llama-as-a-service/gateway-service:0.1.0
```

## Customize Route Proxy Configuration
- Edit [`config.js`](./config.js) to update microservice URLs.

```js
module.exports = {
  API_IMAGES_URL: process.env.API_IMAGES_URL || 'http://localhost:3000'
  ...
}
```

- Edit [`routes.js`](./src/routes.js) to change configuration.

```js
{
    url: '/microservice-endpoint',
    method: 'get',
    auth: true,
    creditCheck: true,
    rateLimit: {
        windowMs: 15 * 60 * 1000,
        max: 5
    },
    proxy: {
        target: config.API_IMAGES_URL, // URL to microservice
        changeOrigin: true,
    }
}
```