var express = require("express");
var router = express.Router();

const authentificationCTRL = require("../controllers/authCTRL");

/* GET users listing. */
router.post("/register", authentificationCTRL.signUp);
router.post("/login", authentificationCTRL.signIn);

module.exports = router;
