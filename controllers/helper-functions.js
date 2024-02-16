const ToDos = require('../models/todos');

const checkExistence = (res, obj) => {
  if (obj) {
    res.status(200).json({
      message: 'success',
      data: obj,
    });
  } else {
    res.status(404).json({
      status: 'fail',
      message: 'there is no data for that id',
    });
  }
};
const checkauth = function (id) {
  const todo = ToDos.find(id);
  if (todo) return true;
  return false;
};
module.exports = {
  checkExistence,
  checkauth,
};
