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
module.exports = {
  checkExistence,
}
