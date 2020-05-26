const { statusCodes, errorMessages } = require("../constants");

module.exports = (cb) => async (req, res, next) => {
  try {
    await cb(req, res, next);
  } catch (err) {
    let error = new Error(errorMessages.SERVER_ERROR);
    error.status = err.status || statusCodes.INTERNAL_SERVER_ERROR;
    if (err && err.details) {
      [error] = err.details;
      error.status = statusCodes.BAD_REQUEST;
    }
    if (err.name && err.name.includes("JsonWebTokenError")) {
      return res
        .status(statusCodes.UNAUTHORIZED)
        .json({ message: errorMessages.UNAUTHORIZED });
    }
    return res.status(error.status).json({ error });
  }
};
