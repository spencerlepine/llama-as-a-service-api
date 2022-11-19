const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const cors = require("cors")

const routes = require("./src/routes")
const app = express()

const jsonParser = bodyParser.json()
app.use(jsonParser)
app.use(cors())

app.use(routes)

app.get('/', (req, res) => {
  res.status(200).json({
    message: "Send GET request to /random"
  })
})

module.exports = app