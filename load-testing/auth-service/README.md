# LaaS Authentication API Service

[![CI](https://github.com/llama-as-a-service/auth-service/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/llama-as-a-service/auth-service/actions/workflows/ci.yml) [![Heroku Deploy](https://github.com/llama-as-a-service/auth-service/actions/workflows/heroku-deploy.yml/badge.svg?branch=main)](https://github.com/llama-as-a-service/auth-service/actions/workflows/heroku-deploy.yml) [![Publish Docker](https://github.com/llama-as-a-service/auth-service/actions/workflows/publish-to-ghcr.yml/badge.svg?branch=main)](https://github.com/llama-as-a-service/auth-service/actions/workflows/publish-to-ghcr.yml) [![Stable Version](https://img.shields.io/github/v/tag/llama-as-a-service/auth-service)](https://img.shields.io/github/v/tag/llama-as-a-service/auth-service) [![Latest Release](https://img.shields.io/github/v/release/llama-as-a-service/auth-service?color=%233D9970)](https://img.shields.io/github/v/tag/llama-as-a-service/auth-service?color=%233D9970)

Authentication API Service. Built with NodeJS, Express, and Docker. Connects to the MongoDB User Database.

## ⚙️ Setup
```sh
$ git clone https://github.com/llama-as-a-service/auth-service.git
$ cd auth-service
$ cp .env.sample .env
$ docker-compose up -d
# access on localhost:7007
```

## 🧪 Test
```sh
$ docker-compose exec auth_service yarn run test
```

## 📦 Pull from GitHub Repository Container Registry
```sh
# docker pull ghcr.io/OWNER/IMAGE_NAME
$ docker pull ghcr.io/llama-as-a-service/auth-service:0.1.0
```

## API Documentation

### Register Endpoint

| URL    | /register |
|--------|-----------|
| Method | POST      |
| Status | 201 OK    |

#### Example Body
```json
{
    "last_name": "Deer",
    "first_name": "John",
    "email": "john123@deer.com",
    "password": "deer"
}
```

#### Sample Response:
```json
{
    "first_name": "John",
    "last_name": "Deer",
    "email": "john123@deer.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjJjYWRlMDMxMjgxNGRiMzc1ODY4ZmI2IiwiZW1haWwiOiJqb2huMTIzQGRlZXIuY29tIiwiaWF0IjoxNjU3NDYyMjc1LCJleHAiOjE2NTc0Njk0NzV9.6cbolc6eCVvK5PnlCew47K_ZjHvZT4EsjQiTt5jBG_8"
}
```

### Authentication Endpoint

| URL    | /authenticate |
|--------|---------------|
| Method | POST          |
| Status | 200 OK        |

#### Example Headers
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsIn..."
}
```

#### Example Response
```json
{
    "message": "Successfully authenticated",
    "status": "success"
}
```

### Login Endpoint

| URL    | /login  |
|--------|---------|
| Method | POST    |
| Status | 200 OK  |

#### Example Headers
```json
{
    "email": "john@gmail.com",
    "password": "01494813"
}
```

#### Example Response
```json
{
    "first_name": "Johnsdf",
    "last_name": "Deer",
    "email": "john123@deer.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjJjYWRlMDMxMjgxNGRiMzc1ODY4ZmI2IiwiZW1haWwiOiJqb2huMTIzQGRlZXIuY29tIiwiaWF0IjoxNjU3NDYzMzE1LCJleHAiOjE2NTc0NzA1MTV9.bVhocLT8V5UZaX-HpxbhlBuqu3L3dr0YfJhaOJStfvw"
}
```


## Alternative Local Setup
```sh
$ yarn install
$ yarn run start # yarn run dev
```