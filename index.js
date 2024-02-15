/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const { toDosRouter, usersRouter } = require('./routes');

dotenv.config({ path: './config.env' });
const dbPath = path.join(__dirname).split('/');
const app = express();
if (process.env.NODE_ENV === 'development') {
  mongoose.connect(`mongodb://127.0.0.1:27017/${dbPath[dbPath.length - 1]}`).then(
    console.log('connected to development DB succefully'),
  );
} else {
  mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@atlascluster.xf3pt3e.mongodb.net/`).then(
    console.log('connected to production DB succefully'),
  );
}

app.use('/todos', toDosRouter);
app.use('/users', usersRouter);

app.all('*', (req, res, next) => {
/*   res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} in server`,
  }); */
  const error = new Error(`Can't find ${req.originalUrl} in server`);
  error.statusCode = 404;
  error.status = 'fail';
  next(error);
});
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});
app.listen(process.env.PORT || 3000, () => {
  console.log(`server is on ${process.env.PORT}`);
});
