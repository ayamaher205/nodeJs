/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');
const Users = require('../models/users');

const auth = async function (req, res, next) {
  const { authorization } = req.headers;
  if (authorization) {
    const authi = jwt.verify(authorization, 'L#z&7B7Jq*$qC3%N64s@J4pP3r^gZ!mT');
    const user = await Users.findById(authi.id).exec();
    req.user = user;
    next();
  } else {
    const err = new Error('you should login before!');
    err.statusCode = 401;
    return next(err);
  }
};
module.exports = auth;
