require('dotenv').config()

module.exports = {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://test:testpassword@localhost:27017',
  PORT: process.env.PORT || 4000,
  RANDOM_COUNT_LIMIT: 25,
}
