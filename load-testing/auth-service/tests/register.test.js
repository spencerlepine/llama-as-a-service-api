const app = require('../app.js')
const request = require('supertest')

const testUser = require('./testUser.json')

const loginEndpoint = '/login'
const registerEndpoint = '/register'

describe('Registration Endpoint', () => {
  test('should generate user token', (done) => {
    request(app)
      .post(registerEndpoint)
      .send(testUser)
      .expect(201)
      .then((response) => {
        expect(response.body).toBeTruthy();
        const { body } = response
        expect(body).toHaveProperty("token");
        expect(typeof body.token).toBe("string")
        done()
      })
      .catch(err => done(err))
  })
})