const express = require("express");
const router = express.Router();
const cart = require("../controller/cart");

router.get("/", cart.all);



module.exports = router;
