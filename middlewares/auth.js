/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const Users = require('../models/users');
const asyncWrapper = require('../utils/async-wrapper');

const auth = async function (req, res, next) {
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Error('Authorization token is missing or malformed');
  }
  const token = authorization.split(' ')[1];
  const [err, authi] = await asyncWrapper(promisify(
    jwt.verify(token, 'L#z&7B7Jq*$qC3%N64s@J4pP3r^gZ!mT'),
  ));
  if (!err) {
    const user = await Users.findById(authi.id).exec();
    req.user = user;
    next();
  }
  return next(err);
};
module.exports = auth;
