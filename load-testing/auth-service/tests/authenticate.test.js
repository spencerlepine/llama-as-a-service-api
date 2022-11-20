const app = require('../app.js')
const request = require('supertest')

const testUser = require('./testUser.json')

const registerEndpoint = '/register'
const authenticateEndpoint = '/authenticate'

describe('Authentication Endpoint', () => {
  test('should verify user token', (done) => {
    const { password, email } = testUser
    const loginCredentials = {
      password,
      email,
    }

    request(app)
      .post(registerEndpoint)
      .send(testUser)
      .then((response) => (
        request(app)
          .post(authenticateEndpoint)
          .send({ token: response.body.token })
      ))
      .then((response) => {
        expect(response.body).toBeTruthy();
        const { body } = response
        expect(body).toHaveProperty("message", "Successfully authenticated");
        expect(body).toHaveProperty("status", "success");
        done()
      })
      .catch(err => done(err))
  })
})