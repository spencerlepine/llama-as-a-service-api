const db = require("./testDatabase")

db.dbConnect()

beforeEach(() => {
  db.dropDatabase()
})

afterAll(() => {
  db.dbDisconnect()
});