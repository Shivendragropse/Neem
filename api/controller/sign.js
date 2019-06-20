var user = require('../../model/user');
var bcrypt = require('bcryptjs');
var SendOtp = require('sendotp');
var sendOtp = new SendOtp('277721ALds15TD095ce418d7');
var jwt = require('jsonwebtoken');
var JWTSECRET = 'shivendra123';


var registerMobile = ((req,res)=>{
    var today = new Date();
    var encryptedString = bcrypt.hashSync(req.body.password,10);
    var log =  {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        mobile : req.body.mobile,
        password : encryptedString,
        userRole : req.body.userRole,
        type : 'Mobile',
        created_at : today,
        verifyNumber :  false,
        device_id : false,
        device_type : false,
        device_token : false,
        
     }

    req.checkBody({
        'firstName':{
            notEmpty : true,
            errorMessage : 'Please Fill The FirstName'
        },
        'lastName': {
                notEmpty : true,
                errorMessage : 'Please filll The LatName'            
        },
        'mobile': {
            notEmpty : true,
            errorMessage : 'Please filll The Mobile No.'
        },
        'password': {
            notEmpty : true,
            errorMessage : 'Please filll The Password'
        }
    });

   const errors = req.validationErrors();
    if(errors){
        var errorMessage = [];
        errors.forEach((err)=>{
            errorMessage.push(err.msg);
        });
        return res.json({code : 101, status : false, message : errorMessage[0], data : {}});
    }else{
    if (req.body.userRole == 1){
    user.query("SELECT COUNT(*) AS cnt FROM user WHERE mobile = ? ", req.body.mobile, function(err , data){
        console.log('66666',data[0]);
    if(err){
        console.log('eeeeeeeeeeeeeeeeee',err);

        return res.json({code : 101, status :false, message : 'SomeThing went wrong',data: {}});
    }   
    else{
        if(data[0].cnt > 0){  
            console.log('1111',data[0].cnt > 0);
            return res.json({code : 101, status :false, message : 'Mobile no. Already Exists Please try with a different Mobile No.',data:{}});
        }else{
            user.query('INSERT INTO user SET ?' , log, function(err , insert){
               if(err){
        console.log('errorrrrrrrrrrrrrrrrrr',err);
                   return res.json({code : 101, status :false, message : 'Some Technical Problem',data:{}});
                }else{
                    console.log('Insert',insert);
                    sendOtp.send(req.body.mobile, "NEEMAP", function(err,data){
                        if(err){
                            return res.json({code: 101, status:false, message: 'Network Error. Unable to send sms currently'});
                        }else{
                            console.log('data123456',data);
                        return res.json({code : 100, status :true, message : 'Succssfully Saved Please Verify Your Mobile No.', data :{insert} });
                        }
                    })
                }
           })    

        }
    }
})
    }else  if (req.body.userRole == 2){
        user.query("SELECT COUNT(*) AS cnt FROM user WHERE mobile = ? ", req.body.mobile, function(err , data){
            console.log('66666',data);
        if(err){
            console.log('eeeeeeeeeeeeeeeeee',err);
    
            return res.json({code : 101, status :false, message : 'SomeThing went wrong',data: {}});
        }   
        else{
            if(data[0].cnt > 0){  
                console.log('1111',data[0].cnt > 0);
                return res.json({code : 101, status :false, message : 'Mobile no. Already Exists Please try with a different Mobile No.',data:{}});
            }else{
                user.query('INSERT INTO user SET ?' , log, function(err , insert){
                   if(err){
            console.log('errorrrrrrrrrrrrrrrrrr',err);
                       return res.json({code : 101, status :false, message : 'Some Technical Problem',data:{}});
                    }else{
                        console.log('Insert',insert);
                        sendOtp.send(req.body.mobile, "NEEMAP", function(err,data){
                            if(err){
                                return res.json({code: 101, status:false, message: 'Network Error. Unable to send sms currently'});
                            }else{
                            return res.json({code : 100, status :true, message : 'Succssfully Saved Please Verify Your Mobile No.', data :{insert} });
                            }
                        })
                    }
               })    
    
            }
        }
    })
    } else if (req.body.userRole == 3){
        user.query("SELECT COUNT(*) AS cnt FROM user WHERE mobile = ? ", req.body.mobile, function(err , data){
            console.log('66666',data);
        if(err){
            console.log('eeeeeeeeeeeeeeeeee',err);
    
            return res.json({code : 101, status :false, message : 'SomeThing went wrong',data: {}});
        }   
        else{
            if(data[0].cnt > 0){  
                console.log('1111',data[0].cnt > 0);
                return res.json({code : 101, status :false, message : 'Mobile no. Already Exists Please try with a different Mobile No.',data:{}});
            }else{
                user.query('INSERT INTO user SET ?' , log, function(err , insert){
                   if(err){
            console.log('errorrrrrrrrrrrrrrrrrr',err);
                       return res.json({code : 101, status :false, message : 'Some Technical Problem',data:{}});
                    }else{
                        console.log('Insert',insert);
                        sendOtp.send(req.body.mobile, "NEEMAP", function(err,data){
                            if(err){
                                return res.json({code: 101, status:false, message: 'Network Error. Unable to send sms currently'});
                            }else{
                            return res.json({code : 100, status :true, message : 'Succssfully Saved Please Verify Your Mobile No.', data :{insert} });
                            }
                        })
                    }
               })    
    
            }
        }
    })
    }
    else {
        return res.json ({code : 101 , status : false,message : 'Please Fill Valid Role'});
    }

    }

})

var verifyMobileNumber = ((req,res)=>{

    var verifyOtp = req.body.verifyOtp;
    var mobile = req.body.mobile;

    sendOtp.verify(mobile,verifyOtp,((resp,err)=>{
        console.log('ERROROOROROOROOROOROOR',err);
        if(err.type == 'error'){
            return res.json({code : 101, status : false, message : 'Enter Correct Otp'});
        }else{
        if(err.type = 'sucsess'){
            user.query('UPDATE `user` SET verifyNumber=true WHERE mobile = ?',req.body.mobile ,function(err,rs){
                console.log('0000000000000',err,rs)
                if(rs){
                    return res.json({code : 100, status: true, message : 'Otp Verified'});
                }
            })
        }else{
            return res.json({code : 101, status: false, message: 'Otp Verification Failed Please Try Again'})
        }

    }
    }))
})

var login  = ((req,res)=>{
    console.log('bodyyyyyyyyyyyyyyyyy',req.body);
    req.checkBody({
        // 'userRole': {
        //     notEmpty : true,
        //     errorMessage : 'Please Fill Your Role'
        // },

        'password' :{
            notEmpty : true,
            errorMessage : 'Please Fill The Password'
        }
    });

    const errors = req.validationErrors();
    if(errors){
        var errorMessage = [];
        errors.forEach((err)=>{
            errorMessage.push(err.msg);
        });
        return res.json({code : 101, status : false, message : errorMessage[0], data : {}});
    }else{
        
        var mobile=req.body.mobile;
        var userRole = req.body.userRole;
        var email=req.body.email;        
        var password=req.body.password;

    // try{
        if(req.body.mobile  ){
          
            user.query('SELECT * FROM user WHERE mobile ="'+mobile+'"  AND userRole = "'+userRole+'"' , async function (error, results, fields) {
                console.log('resultsssssssssssss',results);
              if (error) {
                console.log('errrrrrrrrrrrrrrrrrrrrr',error);
                  (res.json({ code : 101, status:false, message:'there are some error with query'}));
                }else{
                if(results.length >0 ){
                    if(results[0].verifyNumber > 0){
                    if( await  bcrypt.compare(req.body.password,results[0].password)){
                      return  res.json({status:true, message:'Login successfully' , data :{results}});
                    }else{
                       return  res.json({code : 101, status:false,message:"Mobile No. and password does not match" , data :{}});
                    }
    
                }else{
                    return res.json({code : 101, status:false, message: 'Please verify your Mobile no.'})
              }
                }else{
                  res.json({code : 101 ,status:false, message:"Mobile No. And User Role does not exits", data: {}});
                }
              }
            });
        }
       else if (req.body.email){
            user.query('SELECT * FROM user WHERE email ="'+email+'"   AND userRole = "'+userRole+'"'  ,async function (error, results, fields) {

            
          if (error) {
            console.log('errrrrrrrrrrrrrrrrrrrrr',error);
            return  res.json({ code : 101, status:false, message:'there are some error with query'});
          }else{
            if(results.length >0){
                if(results[0].activeEmail > 0){
                if( await bcrypt.compare(req.body.password,results[0].password)){
                   
                    const token = jwt.sign({id: results[0].id},JWTSECRET);
                    console.log('jwt',results[0].id);
                     res.cookie('jwtToken',[token,true]);
                   return  res.json({code : 100, status:true, message:'Login successfully', token : token, data :{results}});
                }else{
                  return   res.json({code : 101,status:false,message:"E-mail and password does not match", data :{}});
                }

            }else{
                return  res.json({code : 101, status:false, message: 'Please verify your E-mail'});
    }

            }else{
             return  res.json({code : 101, status:false, message:"E-mail And User Role does not exits", data : {}});
            }
          }
        })
    }
//    }catch {
//         return res.json({code : 101, status : false, message : 'Error Please Try Again'});
//     }
}
})


var forgetPass = ((req,res)=>{
    var mobile = req.body.mobile;

    user.query("SELECT * FROM user WHERE mobile =?", mobile, function(err,data){
        if(err){
            return res.json({code : 101, status: false, message: 'Oops! There is an error'});
        }else {
            if(!data[0] ||data[0] ==null ||data[0] ==undefined || data[0]=='')return res.send({code : 101, status: false, message: "User does not exist"});
            if(data[0].verifyNumber == 0) {
                return res.json({code : 101,status: false, message :"Please activate Your Account First"});
             }else {
            console.log('dataaaaaaaaaaaaaaa',data);
            sendOtp.send(req.body.mobile , "NEEMAP", function(err,resp){
                return res.json({code : 100, status: true , message : 'Otp Sent On Registered Mobile No.'})
            })
        }
    }
    })
})

var verifyResetPass = ((req,res)=>{

    var verifyOtp = req.body.verifyOtp;
    var mobile = req.body.mobile;

    sendOtp.verify(mobile,verifyOtp,((resp,err)=>{
        console.log('ERROROOROROOROOROOROOR',err);
        if(err.type == 'error'){
            return res.json({code : 101, status : false, message : 'Enter Correct Otp'});
        }else{
        if(err.type = 'sucsess'){
            user.query('UPDATE `user` SET verifyNumber=true WHERE mobile = ?',req.body.mobile ,function(err,rs){
                console.log('0000000000000',err,rs)
                if(rs){
                    return res.json({code : 100, status: true, message : 'Otp Verified'});
                }
            })
        }else{
            return res.json({code : 101, status: false, message: 'Otp Verification Failed Please Try Again'})
        }

    }
    }))
})

var saveNewPassword = ((req,res)=>{
    var mobile = req.body.mobile;
    var password = req.body.password;

    user.query('SELECT * FROM user WHERE mobile =?',mobile, async function(err,results){
        if(err){
            return res.json({code: 101, status: false, message: 'Some Error With Query'});
        }else{
            let pass = bcrypt.hashSync(req.body.password , 10);

            if(await bcrypt.compare(req.body.password, results[0].password)){
                return res.json({code:101, status: false, message: 'Can Not Set Old The Password Please Use Another One'})
            }else {
                user.query('UPDATE `user` SET password ="'+pass+'" WHERE mobile ="'+mobile+'"', function(err,save){
                    if(err){
                        return res.json({code: 101, status : false, message : 'SomeThing Went Wrong'});
                    }else{
                        console.log('8888888',save);
                        return res.json({code: 100, status: true, message:'Password SuccessFully Changed'});
                    }
                })
            }

        }
    })
})


var signout = ((req,res)=>{
      console.log('11111',res);
    res.clearCookie('jwtToken')
    console.log('22222',res.clearCookie);
    return res.json({
        status: true, 
        message : 'Logout SuccessFully'
    })
})

module.exports = {registerMobile,login,verifyMobileNumber,forgetPass,verifyResetPass,saveNewPassword,signout};