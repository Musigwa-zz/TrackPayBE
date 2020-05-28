const { Router } = require("express");
const welcome = require("../controllers");
const repayment = require("./repayment");
const { statusCodes } = require("../constants");
const router = Router();
router.get("/", welcome);
router.use("/repayments", repayment);

// The not found handler down here at the very bottom of all routes
router.use((req, res) => {
  return res.status(statusCodes.NOT_FOUND).json({
    message: `Invalid url: ${req.url}`,
  });
});

module.exports = router;
