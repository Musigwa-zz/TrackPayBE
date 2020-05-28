const { Router } = require("express");

const RepaymentController = require("../controllers/repayment");
const errorHandler = require("../middleware/errorHandler");

const router = Router();
router.route("/").post(errorHandler(RepaymentController.make));

module.exports = router;
