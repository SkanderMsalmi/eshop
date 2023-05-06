var express = require("express");
var router = express.Router();
let userController = require("../controllers/user");
let authController = require("../controllers/auth");

router.post("/inscription", userController.register);
router.post("/connexion", authController.connexion);
router.delete("/logout", authController.logout);
router.get("/currentuser", authController.currentUser);

module.exports = router;
