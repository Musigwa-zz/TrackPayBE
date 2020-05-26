const { statusCodes } = require("../constants");

module.exports = (req, res) => {
  return res
    .status(statusCodes.OK)
    .json({ message: "Welcome to our application API" });
};
