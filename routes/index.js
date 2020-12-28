var express = require('express');
var router = express.Router();
var product = require('../controller/product');


/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

router.get("/", product.index);

module.exports = router;
