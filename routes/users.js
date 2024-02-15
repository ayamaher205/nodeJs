/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-else-return */
const express = require('express');
const router = require('express').Router();
const { usersController, authController } = require('../controllers/index');
const asyncWrapper = require('../utils/async-wrapper');
const helper = require('../controllers/helper');

// parsing body as JSON object
router.use(express.json());

router.post('/signup', async (req, res, next) => {
  const [err, addedUser] = await asyncWrapper(authController.signUp(req.body));
  if (!err) {
    return res.status(200).json({ User: addedUser });
  }
  return next(err);
});
router.post('/login', async function (req, res, next) {
  if (!req.body.username && !req.body.password) return next(new Error('please enter username and password'));
  else if (!req.body.username) return next(new Error('please enter username'));
  else if (!req.body.password) return next(new Error('please enter password'));
  else {
    const [err, auth] = await asyncWrapper(usersController.login(req.body.username, req.body.password));
    if (!err) {
      return res.status(200).json({
        status: 'success',
        message: 'you are logged in',
        token: auth,
      });
    }
    return next(err);
  }
});
router.get('/', async (req, res) => {
  const users = await usersController.getAll();
  res.status(200).json({
    message: 'success',
    data: users,
  });
});

router.get('/:id', async (req, res, next) => {
  const [err, user] = await asyncWrapper(usersController.getUser(req.params.id));
  if (!err) {
    // check if user exists and return not found if no
    return helper.checkExistence(res, user);
  }
  return next(err);
});
router.get('/:id/todos', async (req, res, next) => {
  const [err, todos] = await asyncWrapper(usersController.getTodosOfUser(req.params.id));
  if (!err) {
    return res.status(200).json({
      message: 'success',
      data: todos,
    });
  }
  return next(err);
});
router.patch('/:id', async (req, res, next) => {
  const [err, updatedUser] = await asyncWrapper(usersController.update(req.params.id, req.body));
  if (!err) {
    return helper.checkExistence(res, updatedUser);
  }
  return next(err);
});
router.delete('/:id', async (req, res, next) => {
  const [err, deletedUser] = await asyncWrapper(usersController.deleteUser(req.params.id));
  if (!err) {
    return helper.checkExistence(res, deletedUser);
  }
  return next(err);
});

module.exports = router;
