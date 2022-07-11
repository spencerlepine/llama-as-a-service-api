const db = require("./testDatabase")
jest.setTimeout(8000); // in milliseconds

db.dbConnect()

beforeEach(() => {
  db.dropDatabase()
})

afterAll(() => {
  db.dbDisconnect()
});