var express = require('express');
var router = express.Router();
var sign = require('../api/controller/sign');
var registerEmail = require('../api/controller/registerEmail');

/* GET home page. */
router.post('/registerMobile',sign.registerMobile);
router.post('/login',sign.login);
router.post('/verifyMobileNumber',sign.verifyMobileNumber);
router.post('/forgetPass',sign.forgetPass);
router.post('/verifyResetPass',sign.verifyResetPass);
router.post('/resestPass',sign.saveNewPassword);
router.post('/registerEmail',registerEmail.registerEmail);
// router.get('/verifyEmail/:token/:otp',registerEmail.verifyEmail);
router.post('/verifyOtp',registerEmail.verifyOtp);
router.post('/forgetPassword',registerEmail.forgetPassword);
router.post('/verifyResetOtp',registerEmail.verifyResetOtp);
router.post('/resetPassword',registerEmail.saveNewPassword);

module.exports = router;
