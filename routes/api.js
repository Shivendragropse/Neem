var express = require('express');
var router = express.Router();
var sign = require('../api/controller/sign');
var registerEmail = require('../api/controller/registerEmail');
var fetchUser = require('../api/controller/fetchUser');

/* GET home page. */
router.post('/registerMobile',sign.registerMobile);
router.post('/login',sign.login);
router.post('/verifyMobileNumber',sign.verifyMobileNumber);
router.post('/forgetPass',sign.forgetPass);
router.post('/verifyResetPass',sign.verifyResetPass);
router.post('/resestPass',sign.saveNewPassword);
router.post('/registerEmail',registerEmail.registerEmail);
// router.get('/verifyEmail/:token/:otp',registerEmail.verifyEmail);
router.post('/verifyEmail',registerEmail.verifyOtp);
router.post('/forgetPassword',registerEmail.forgetPassword);
router.post('/verifyResetOtp',registerEmail.verifyResetOtp);
router.post('/resetPassword',registerEmail.saveNewPassword);

//GET FETCH USER API
router.post('/fetchUser',fetchUser.fetchUser);
router.post('/updateProfile',fetchUser.updateProfile);

module.exports = router;
