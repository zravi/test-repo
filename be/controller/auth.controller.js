const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const userService= require('../service/user.service');
const jwt = require('jsonwebtoken')


const register = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(200).send({ message: 'register successfully', user });
};

const generateToken = (userId) => {
  const payload = {
    sub: userId,
  };
  return jwt.sign(payload, "secret");
};

const login =async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.loginUserWithEmailAndPassword(email, password);

  if (user) {
    const tokens = await generateToken(user.id);
    res.send({ message: 'Login Successfully!!', user, tokens });
  } else {
    res.send({ message: 'Invalid email or password', user, tokens });
  }
};


module.exports = {
  register,
  login
};
