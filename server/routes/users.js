var express = require("express");
var router = express.Router();
let userController = require('../controllers/user');

/* GET users listing. */
router.get("/",userController.myFunction);

module.exports = router;
