const express = require("express");
const router = express.Router();
const {
  getPokeBody_MSB,

} = require("../controllers/serviceBController");

router.get("/:name", getPokeBody_MSB);

module.exports = router;