var express = require('express');
var router = express.Router();
var sign = require('../api/controller/sign');
var registerEmail = require('../api/controller/registerEmail');
var fetchUser = require('../api/controller/fetchUser');

/* GET home page. */
router.post('/registerMobile',sign.registerMobile);
router.post('/login',sign.login);
router.post('/verifyMobileNumber',sign.verifyMobileNumber);
router.post('/forgetPassMobile',sign.forgetPass);
router.post('/verifyResetPassMobile',sign.verifyResetPass);
router.post('/resestPassMobile',sign.saveNewPassword);
router.post('/registerEmail',registerEmail.registerEmail);
// router.get('/verifyEmail/:token/:otp',registerEmail.verifyEmail);
router.post('/verifyEmail',registerEmail.verifyOtp);
router.post('/forgetPasswordEmail',registerEmail.forgetPassword);
router.post('/verifyResetPassEmail',registerEmail.verifyResetOtp);
router.post('/resetPasswordEmail',registerEmail.saveNewPassword);

//GET FETCH USER API
router.post('/fetchUser',fetchUser.fetchUser);
router.post('/updateProfile',fetchUser.updateProfile);

module.exports = router;
