require('dotenv').config()

const config = {
  PORT: process.env.PORT || 7007,
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_TOKEN_KEY: process.env.JWT_TOKEN_KEY || 'testToken',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://test:testpassword@localhost:27017'
}

module.exports = config