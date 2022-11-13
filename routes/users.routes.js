var express = require("express");
var router = express.Router();
const middleware = require("../middleware/authMiddleware");


const authentificationCTRL = require("../controllers/authCTRL");

/* GET users listing. */
router.post("/register", authentificationCTRL.signUp);
router.post("/login", authentificationCTRL.signIn);
router.post("/welcomeMail", middleware.token, authentificationCTRL.welcomeMail);
router.get("/me", middleware.token, authentificationCTRL.getMe);
// router.get("/logout", middleware.token, authentificationCTRL.logOut);

module.exports = router;
