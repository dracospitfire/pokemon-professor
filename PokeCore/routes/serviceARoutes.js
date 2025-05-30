const express = require("express");
const router = express.Router();
const {
  getBaseStats,

} = require("../controllers/serviceAController");

router.get("/:name", getBaseStats);

module.exports = router;