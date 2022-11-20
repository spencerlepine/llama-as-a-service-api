const express = require('express')
const { setupLogging } = require("./src/logging");
const { ROUTES } = require("./src/routes");
const { setupProxies } = require("./src/proxy");
const { setupAuth } = require("./src/auth");
const cors = require('cors')

const app = express()

app.use(cors())
setupProxies(app, ROUTES);
setupLogging(app);
setupAuth(app, ROUTES);

module.exports = app