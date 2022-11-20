const app = require("./app");

const config = require("./config")
const { PORT, NODE_ENV } = config;

if (NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}