var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var JWTSECRET = 'shivendra123';
var user = require('../model/user');


router.get('/', function(req, res, next) {
      res.render('home', );
    });
 router.get('/profile', function(req, res, next) {
 res.render('profile', );
 });
    
module.exports = router;
