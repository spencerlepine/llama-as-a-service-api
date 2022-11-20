const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('../config')

const setupProxies = (app, routes) => {
  if (config.NODE_ENV === 'test') {
    return
  }

  routes.forEach(r => {
    app[r.method](r.url, createProxyMiddleware(r.proxy));
  })
}

exports.setupProxies = setupProxies