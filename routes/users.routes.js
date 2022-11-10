var express = require("express");
var router = express.Router();
const middleware = require("../middleware/authMiddleware");


const authentificationCTRL = require("../controllers/authCTRL");

/* GET users listing. */
router.post("/register", authentificationCTRL.signUp);
router.post("/login", authentificationCTRL.signIn);
router.get("/logout", middleware.checkUserMiddleware, authentificationCTRL.logOut);

module.exports = router;
