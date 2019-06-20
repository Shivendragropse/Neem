var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var JWTSECRET = 'shivendra123'
var user = require('../model/user');
var sign = require('../api/controller/sign');
var registerEmail = require('../api/controller/registerEmail');
var fetchUser = require('../api/controller/fetchUser');
var doctorList = require('../api/controller/doctorList');
var adminSetting = require('../api/admin/adminSetting');



var verifyTokenAPI=function(req,res,next){
    if(req.cookies.jwtToken){
       token = req.cookies.jwtToken[0];
      console.log('ssss',token);
        // tokenStatus	=req.cookies.jwtToken[1];
        jwt.verify(token,JWTSECRET, function(err, decoded) {
          // console.log('wwwwww',token);
          if (err)return res.redirect('/');
          try{
            user.query( 'SELECT * FROM user WHERE id = ?' ,decoded.id,function(error,data){
                // console.log('current',data[0].firstName);
                if(data==null || data=='')return res.redirect('/');
                // console.log('35521',res)
                if(data){
                  req.currentUser = data;
                  console.log('current',req.currentUser[0].firstName);
                  return next();
                }
              })
            }
              catch{
                console.log('err',err);
                return res.redirect('/');
              };
        });
      
    }else {
      return res.redirect('/');
    }
  };

router.get('/profile',verifyTokenAPI,fetchUser.profile)

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
router.post('/fetchUser',verifyTokenAPI,fetchUser.fetchUser);
router.post('/updateProfile',verifyTokenAPI,fetchUser.updateProfile);
router.post('/updateHealthInformation',verifyTokenAPI,fetchUser.updateHealthInformation);
router.get('/signout',sign.signout);

router.post('/homePage',verifyTokenAPI,fetchUser.homePage);

router.post('/doctorList',verifyTokenAPI,doctorList.doctorList);
router.post('/doctorDetail',verifyTokenAPI,doctorList.doctorDetail);

router.post('/adminSetting',verifyTokenAPI,adminSetting.adminSetting);


module.exports = router;
