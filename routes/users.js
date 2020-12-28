var express = require('express');
var router = express.Router();
var user = require('../controller/customer')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/profile', function(req, res, next) {
  res.render('user-profile');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', user.register);

module.exports = router;
