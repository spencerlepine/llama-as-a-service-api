const express = require("express");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("./config")
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({
  origin: '*'
}));
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

const User = require("./src/model/user");

const { JWT_TOKEN_KEY } = config

const auth = require("./src/middleware/auth");

const validToken = async (tokenToCheck) => {
  // Does token match secret
  try {
    const decoded = jwt.verify(token, JWT_TOKEN_KEY);
    return decoded
  } catch (err) {
    return false
  }
}

app.post("/authenticate", auth, async (req, res) => {
  const token = req.body.token

  if (validToken(token)) {
    return res.status(200).json({
      message: "Successfully authenticated",
      status: "success"
    });
  } else {
    return res.status(403).json({
      message: "Failed to Authenticated",
      status: "fail"
    });
  }
});

// Register
app.post("/register", async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      return res.status(400).json({
        message: "All input is required",
        status: "fail"
      });
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email: email.toLowerCase() });

    if (oldUser) {
      return res.status(409).json({
        message: "User Already Exist. Please Login",
        status: "fail"
      });
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      JWT_TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

// Login
app.post("/login", async (req, res) => {
  const loginCreds = {}
  if (req.body === 'object') {
    loginCreds['email'] = req.body.email
    loginCreds['password'] = req.body.password
  }

  // Get user input
  const { email, password } = req.body;

  // Validate user input
  if (!(email && password)) {
    return res.status(400).json({
      message: "All input is required",
      status: "fail"
    });
  }

  // Validate if user exist in our database
  const user = await User.findOne({ email });
  const validation = await bcrypt.compare(password, user ? user.password : '')

  if (validation) {
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      JWT_TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    // save user token
    user.token = token;

    // user
    return res.status(200).json(user);
  }

  res.status(403).json({
    message: "Invalid Credentials",
    status: "fail"
  });

});

module.exports = app;