const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')

const routes = require("./src/routes")
const app = express()

const jsonParser = bodyParser.json()
app.use(jsonParser)
app.use(routes)

module.exports = app