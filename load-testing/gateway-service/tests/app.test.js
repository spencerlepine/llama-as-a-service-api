const app = require('../app.js')
const request = require('supertest')
const { ROUTES } = require("../src/routes");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const endpoints = ROUTES.filter(({ auth }) => auth)
// const testEndpoint = endpoints[getRandomInt(0, endpoints.length - 1)]

describe('Gateway API Endpoint', () => {
  test('should fail without token header', (done) => {
    request(app)
      .get("/random")
      .expect(403)
      .then((response) => {
        expect(response.body).toBeTruthy();
        const { body } = response
        expect(body).toHaveProperty("message", "A token is required for authentication");
        done()
      })
      .catch(err => done(err))
  })

  test('should deny invalid token header', (done) => {
    request(app)
      .get("/random")
      .set({ 'x-access-token': 'ladjsflkajsdfljasdlfkjsdlfkjsaldfj', Accept: 'application/json' })
      .expect(401)
      .then((response) => {
        expect(response.body).toBeTruthy();
        const { body } = response
        expect(body).toHaveProperty("message", "Error 401: Unauthorized");
        done()
      })
      .catch(err => done(err))
  })
})