const express = require("express");
const router = express.Router();
const {
  getBaseStats_MSC,

} = require("../controllers/serviceCController");

router.get("/:name", getBaseStats_MSC);

module.exports = router;