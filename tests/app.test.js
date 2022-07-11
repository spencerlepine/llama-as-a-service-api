const app = require('../app.js')
const request = require('supertest')
const isValidImageURL = require('../utils/isValidImageURL')

describe('Image API Service', () => {
  describe('/random Endpoint', () => {
    test('accepts valid images', (done) => {
      const validImage = {
        url: "https://images.unsplash.com/photo-1589182337358-2cb63099350c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGxhbWF8ZW58MHx8MHx8&w=1000&q=80"
      }

      request(app)
        .post('/upload')
        .send(validImage)
        .expect(201)
        .then((response) => {
          expect(response.body).toBeTruthy();
          const { body } = response
          expect(body).toHaveProperty("message");
          expect(typeof body.message).toBe("string")
          expect(body.message).toBe("Successfully uploaded image")
          done()
        })
        .catch(err => done(err))
    })

    test('rejects invalid image URLs', (done) => {
      const invalidURL = {
        url: "https://example.com/fakeEndpoint.png"
      }

      request(app)
        .post('/upload')
        .send(invalidURL)
        .expect(400)
        .then((response) => {
          expect(response.body).toBeTruthy();
          const { body } = response
          expect(body).toHaveProperty("message");
          expect(typeof body.message).toBe("string")
          expect(body.message).toBe("Invalid image URL string")
          done()
        })
        .catch(err => done(err))
    })
  })

  describe('/random Endpoint', () => {
    test('generates valid image url string', (done) => {
      const validImage = {
        url: "https://images.unsplash.com/photo-1589182337358-2cb63099350c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGxhbWF8ZW58MHx8MHx8&w=1000&q=80"
      }

      request(app)
        .post('/upload')
        .send(validImage)
        .then(() => (
          request(app)
            .get('/random?count=1')
            .expect(200)
        ))
        .then((response) => {
          expect(response.body).toBeTruthy();
          const { body } = response
          expect(body).toHaveProperty("message");
          expect(typeof body.message).toBe("string")
          const imageUrl = body.message
          expect(isValidImageURL(imageUrl)).toBeTruthy()
          done()
        })
        .catch(err => done(err))
    })

    test('should generate list images', (done) => {
      const validImage = {
        url: "https://images.unsplash.com/photo-1589182337358-2cb63099350c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGxhbWF8ZW58MHx8MHx8&w=1000&q=80"
      }

      request(app)
        .post('/upload')
        .send(validImage)
        .then(() => (
          request(app)
            .get('/random?count=10')
            .expect(200)
        ))
        .then((response) => {
          expect(response.body).toBeTruthy();
          const { body } = response
          expect(body).toHaveProperty("message");
          expect(Array.isArray(body.message)).toBeTruthy()
          const imagesValid = (body.message).every((url) => isValidImageURL(url))
          expect(imagesValid).toBeTruthy()
          done()
        })
        .catch(err => done(err))
    })
  })
})