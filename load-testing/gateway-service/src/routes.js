const config = require("../config")

/* EXAMPLE
  {
    url: '/login',
    auth: false,
    creditCheck: false,
    proxy: {
      target: config.AUTH_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: {
        [`^/login`]: '/newpath',
      },
    }
  }
*/
const ROUTES = [
  {
    url: '/random',
    method: 'get',
    auth: true,
    creditCheck: true,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 5
    },
    proxy: {
      target: config.API_IMAGES_URL,
      changeOrigin: true,
    }
  },
  {
    url: '/upload',
    method: 'post',
    auth: true,
    creditCheck: true,
    proxy: {
      target: config.API_IMAGES_URL,
      changeOrigin: true,
    }
  }
]

exports.ROUTES = ROUTES;