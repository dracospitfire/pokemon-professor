const express = require("express");
const router = express.Router();
const {
  getBaseStats_MSB,

} = require("../controllers/serviceBController");

router.get("/:name", getBaseStats_MSB);

module.exports = router;