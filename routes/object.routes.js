var express = require("express");
var router = express.Router();
const middleware = require("../middleware/authMiddleware");


const objectCTRL = require("../controllers/objectCTRL");

/* GET users listing. */
router.post("/createObject", middleware.token, objectCTRL.postObject);
router.get("/getObject",middleware.token, objectCTRL.getObject);
router.patch("/updateObject/:id", middleware.token, objectCTRL.updateObject);
router.delete("/deleteObject/:id", middleware.token, objectCTRL.deleteObject);

module.exports = router;
