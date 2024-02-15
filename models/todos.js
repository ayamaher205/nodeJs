const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
    minLength: 5,
    maxLength: 20,
  },
  id: {
    type: Number,
    required: [true, 'id is required'],
    unique: true,
  },
  status: {
    type: String,
    default: 'to-do',
    enum: ['to-do', 'in-progress', 'done'],
  },
  tags: {
    type: [{
      type: String,
      maxLength: 5,
    }],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
}, { timestamps: true });

const ToDos = mongoose.model('toDos', todoSchema);

module.exports = ToDos;
