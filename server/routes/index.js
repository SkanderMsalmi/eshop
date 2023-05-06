var express = require("express");
var router = express.Router();
const user = require('./users');

/* GET home page. */
router.get("/", function (req, res, next) {
  res.end("index");
});

router.use("/api/user", user);

module.exports = router;
