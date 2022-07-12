const config = require('./config')
const db = require('./src/database')
const app = require('./app');
const client = require('redis').createClient()
const routes = require("./src/routes")

const limiter = require('express-limiter')(routes, client)

limiter({
  path: '/random',
  method: 'all',
  lookup: ['connection.remoteAddress'],
  // 150 requests per hour
  total: 150,
  expire: 1000 * 60 * 60
})

const PORT = config.PORT

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server on port ${PORT}`))
}