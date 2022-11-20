require("./src/config/database").connect();
const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const config = require("./config")
const { PORT, NODE_ENV } = config;

// server listening
if (NODE_ENV !== 'test') {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

