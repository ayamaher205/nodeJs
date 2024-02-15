const asyncWrapper = (promise) => promise
  .then((data) => [undefined, data])
  .catch((error) => [/* {
    statusCode: error.statusCode,
    status: error.status,
    message: error.toString(),
  } */ error]);

module.exports = asyncWrapper;
