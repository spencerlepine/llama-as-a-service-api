const config = require('./config')
const db = require('./src/database')

const PORT = config.PORT

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server on port ${PORT}`))
}