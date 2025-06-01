const express = require("express");
const router = express.Router();
const {
  getBaseStats_MSD,

} = require("../controllers/serviceDController");

router.get("/:name", getBaseStats_MSD);

module.exports = router;