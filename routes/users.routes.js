var express = require("express");
var router = express.Router();
const middleware = require("../middleware/authMiddleware");


const authentificationCTRL = require("../controllers/authCTRL");

/* GET users listing. */
router.post("/register", authentificationCTRL.signUp);
router.post("/login", authentificationCTRL.signIn);
router.post("/welcomeMail", middleware.checkUserMiddleware, authentificationCTRL.welcomeMail);
router.get("/me", middleware.checkUserMiddleware, authentificationCTRL.getMe);
router.get("/logout", middleware.checkUserMiddleware, authentificationCTRL.logOut);

module.exports = router;
