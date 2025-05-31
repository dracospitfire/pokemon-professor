const express = require("express");
const router = express.Router();
const {
  getBaseStats_MSA,

} = require("../controllers/serviceAController");

router.get("/:name", getBaseStats_MSA);

module.exports = router;