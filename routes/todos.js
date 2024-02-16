/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
const express = require('express');
const router = require('express').Router();
const { todosController, helper } = require('../controllers/index');
const asyncWrapper = require('../utils/async-wrapper');
const auth = require('../middlewares/auth');

// parsing body as JSON object
router.use(express.json());
router.use(auth);

router.post('/', async (req, res) => {
  const todo = req.body;
  todo.userId = req.user.id;
  const [err, addedTodo] = await asyncWrapper(todosController.create(todo));
  if (!err) {
    res.status(200).json({
      message: 'success',
      Task: addedTodo,
    });
  } else {
    res.status(400).json({
      status: 'fail',
      errorMessage: err.toString(),
    });
  }
});

router.get('/', async (req, res) => {
  let todos;
  try {
    if (Object.keys(req.query).length === 0) {
      todos = await todosController.getAll();
    } else {
      const { status } = req.query;
      const { limit } = req.query;
      const { skip } = req.query;
      todos = await todosController.getByStatus(status, limit, skip);
    }
    res.status(200).json({
      message: 'success',
      data: todos,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      errorMessage: err.toString(),
    });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const todo = await todosController.getTodo(req.params, req.user.id);
    helper.checkExistence(res, todo);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      errorMessage: err.toString(),
    });
  }
});
router.patch('/:id', async (req, res) => {
    const [err, updatedTodo] = await asyncWrapper(todosController.update(req.params, req.body));
  if ( !err ) {
    return helper.checkExistence( res, updatedTodo.matchedCount );
  }
  return next( err );
  
});
router.delete('/:id', async (req, res) => {
  try {body;
    const deletedTodo = await todosController.deleteTodo(req.params);
    helper.checkExistence(res, deletedTodo.deletedCount);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      errorMessage: err.toString(),
    });
  }
});
module.exports = router;
