var express = require('express');
var router = express.Router();
var sp = require('../controller/sp.controller');
var loai = require('../controller/loai.controller');

module.exports = router;

router.get("/", sp.all);
router.post("/", sp.allByName);
router.get("/:ma_sp", sp.singleID);
router.get("/loai/:loai_sp", loai.all);
router.post("/loai/", sp.allByName);
