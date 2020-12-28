var express = require('express');
var router = express.Router();
var sp = require("../controller/product");


router.get("/", sp.all);
//router.post("/", sp.allByName);
router.get("/:product_id", sp.singleID);
//router.get("/loai/:id", loai.all);
//router.post("/loai/", sp.allByName);


module.exports = router;