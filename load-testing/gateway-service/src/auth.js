const config = require("../config")
const TOKEN_KEY = config.JWT_TOKEN_KEY

const validToken = async (tokenToCheck) => {
  // Does token match secret
  try {
    const decoded = jwt.verify(token, TOKEN_KEY);
    true
  } catch (err) {
    return false
  }
}

const extractToken = (req) => {
  try {
    const body = req.body ? req.body : {}
    const query = req.query ? req.query : {}
    const headers = req.headers ? req.headers : {}
    const token = body.token || query.token || headers["x-access-token"];
    return token
  } catch (err) {
    return ""
  }
}

const authMiddleware = (req, res, next) => {
  const token = extractToken(req)

  if (!token) {
    return res.status(403).json({
      "message": "A token is required for authentication"
    })
  }

  if (validToken(token) && config.NODE_ENV !== 'test') {
    next()
  } else {
    res.status(401).json({
      "message": "Error 401: Unauthorized"
    })
  }
}

const setupAuth = (app, routes) => {
  routes.forEach(r => {
    if (r.auth) {
      app[r.method](r.url, authMiddleware, function (req, res, next) {
        next();
      });
    }
  });
}

exports.setupAuth = setupAuth