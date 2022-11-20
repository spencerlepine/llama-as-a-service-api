const app = require('../app.js')
const request = require('supertest')

const testUser = require('./testUser.json')

const registerEndpoint = '/register'
const loginEndpoint = '/login'

describe('Login Endpoint', () => {
  test('should return user info with token', (done) => {
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
          .post(loginEndpoint)
          .send(loginCredentials)
          .expect(200)
      ))
      .then((response) => {
        expect(response.body).toBeTruthy();
        const { body } = response
        expect(body).toHaveProperty("token");
        expect(typeof body["token"]).toBe("string")
        expect(body).toHaveProperty("first_name");
        expect(typeof body["first_name"]).toBe("string");
        expect(body).toHaveProperty("last_name");
        expect(typeof body["last_name"]).toBe("string");
        expect(body).toHaveProperty("email");
        expect(typeof body["email"]).toBe("string");
        done()
      })
      .catch(err => done(err))
  })
})
