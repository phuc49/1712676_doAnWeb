var express = require('express');
var router = express.Router();
var user = require('../controller/users')
var customer = require('../controller/customers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) { res.render('register');});
router.post('/register', user.register);
router.get('/verify', user.verify);

router.get('/profile-info', customer.getCustomer);
router.post('/profile-info', customer.editInfo);

router.get('/profile-account', user.editAccountView);
router.post('/profile-account', user.editAccount);

router.get('/forget-password', function(req, res, next) { res.render('forget-password');});
router.post('/forget-password', user.forgetPw);

router.get('/change-password', function(req, res, next) { res.render('user-change-pw');});
router.post('/change-password', user.changePassword);

module.exports = router;
