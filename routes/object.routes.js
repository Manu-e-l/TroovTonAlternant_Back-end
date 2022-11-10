var express = require("express");
var router = express.Router();
const middleware = require("../middleware/authMiddleware");


const objectCTRL = require("../controllers/objectCTRL");

/* GET users listing. */
router.post("/createObject", middleware.checkUserMiddleware, objectCTRL.postObject);
router.get("/getObject",middleware.checkUserMiddleware, objectCTRL.getObject);
router.patch("/updateObject/:id", middleware.checkUserMiddleware, objectCTRL.updateObject);
router.delete("/deleteObject/:id", middleware.checkUserMiddleware, objectCTRL.deleteObject);

module.exports = router;
