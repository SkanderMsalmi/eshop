var express = require("express");
var router = express.Router();
const user = require('./users');
const product = require('./products');

/* GET home page. */
router.get("/", function (req, res, next) {
  res.end("index");
});

router.use("/api/user", user);
router.use("/api/product", product);

module.exports = router;
