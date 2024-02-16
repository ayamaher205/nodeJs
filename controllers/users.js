/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const ToDos = require('../models/todos');

const getAll = async () => {
  const user = await Users.find().select('firstName -_id');
  return user;
};
const getUser = async (id) => {
  const user = Users.findById(id);
  return user;
};
const getTodosOfUser = async (id) => {
  const todos = ToDos.find({ userId: id });
  return todos;
};
const create = async (user) => {
  const newUser = await Users.create(user);
  return newUser;
};
const update = async (id, updatedValues) => {
  const updatedUser = await Users.findOneAndUpdate({ _id: id }, updatedValues, {
    runValidators: true,
    new: true,
  });
  return updatedUser;
};
const deleteUser = async (id) => {
  const deletedUser = Users.findByIdAndDelete(id);
  return deletedUser;
};
const signUp = async function (values) {
  const addedUser = await Users.create(values);
  return { addedUser };
};
const login = async function (userName, password) {
  const user = await Users.findOne({ username: userName });
  let valid;
  if (user) {
    valid = await bcrypt.compare(password, user.password);
    if (valid) {
      const token = jwt.sign(
        { id: user._id },
        'L#z&7B7Jq*$qC3%N64s@J4pP3r^gZ!mT',
        { expiresIn: '1d' },
      );
      const loginUser = {
        tokens: token,
        User: user,
      };
      return loginUser;
    }
    const err = new Error('wrong password or username');
    err.statusCode = 401;
    throw (err);
  }
  const err = new Error('user not found');
  err.statusCode = 404;
  throw (err);
};

module.exports = {
  getAll,
  getUser,
  getTodosOfUser,
  create,
  update,
  deleteUser,
  signUp,
  login,
};
