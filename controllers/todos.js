/* eslint-disable no-underscore-dangle */
const ToDos = require('../models/todos');

const getAll = async () => {
  const todo = await ToDos.find();
  return todo;
};
const getTodo = async (id) => {
  const todo = await ToDos.findOne(id);
  return todo;
};
const create = async (todo) => {
  const newTodo = await ToDos.create(todo);
  return newTodo;
};
const update = async (id, updatedvalues) => {
  const updatedTodo = await ToDos.updateOne(id, updatedvalues, { new: true, runValidators: true });
  return updatedTodo;
};
const deleteTodo = async (id) => {
  const deletedTodo = ToDos.deleteOne(id);
  return deletedTodo;
};
const getByStatus = async (status = 'to-do', limitNum = 0, skipNum = 0) => {
  const todos = await ToDos.find({ status }).limit(limitNum).skip(skipNum);
  return todos;
};
module.exports = {
  getAll,
  getTodo,
  getByStatus,
  create,
  update,
  deleteTodo,
};
