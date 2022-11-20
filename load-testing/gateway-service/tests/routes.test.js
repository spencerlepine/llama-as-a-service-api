const routeConfig = require('../src/routes')

const { ROUTES } = routeConfig

describe('ROUTES Configuration', () => {
  test('should contain valid prxoy settings', () => {
    expect(Array.isArray(ROUTES)).toBeTruthy()

    ROUTES.forEach((route) => {
      expect(typeof route === 'object' && !Array.isArray(route)).toBeTruthy()

      const {
        url,
        method,
        auth,
        creditCheck,
        proxy,
      } = route

      expect(typeof url).toBe("string")
      expect(typeof method).toBe("string")
      expect(typeof auth).toBe("boolean")
      expect(typeof creditCheck).toBe("boolean")
      expect(typeof proxy === 'object' && !Array.isArray(proxy)).toBeTruthy()
      expect(typeof proxy["target"]).toBe("string")
      expect(typeof proxy["changeOrigin"]).toBe("boolean")
    })
  })
})