/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-return-await */
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');

const usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'username is required'],
      unique: true,
      minLength: [8, 'username must be greater than 8 characters'],
    },
    firstName: {
      type: String,
      required: [true, 'username is required'],
      minLength: [3, 'username must be greater than 3 characters'],
      maxLength: 15,
    },
    lastName: {
      type: String,
      required: [true, 'username is required'],
      minLength: [3, 'username must be greater than 3 characters'],
      maxLength: 15,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    }, /*
    passwordConfirm: {
      type: String,
      required: [true, 'please confirm your password'],
      validate: {
        validator(el) {
          return el === this.password;
        },
        message: 'passwords are not the same',
      },
    }, */
    dob: Date,
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.password = undefined;
        return ret;
      },
    },
    timestamps: true,
  },
);

usersSchema.pre('save', async function preSave(next) {
  if (!this.isModified()) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
usersSchema.pre('findOneAndUpdate', async function (next) {
  if (this._update.password) {
    this._update.password = await bcrypt.hash(this._update.password, 12);
  }
  next();
});

usersSchema.methods.verifyPassword = async function verifyPassword(password) {
  const valid = await bcrypt.compare(password, this.password);
  return valid;
};

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
