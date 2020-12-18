var express = require('express');
var router = express.Router();
var sp = require('../controller/sp.controller');


/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

router.get("/", sp.index);

module.exports = router;
