var user = require('../../model/user');
// var Cryptr = require ('cryptr');
// var cryptr = new Cryptr('myTotalySecretKey');
var bcrypt = require('bcryptjs');
var SendOtp = require('sendotp');
var sendOtp = new SendOtp('277721ALds15TD095ce418d7');


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
        return res.json({code : 101, status : false, message : errorMessage[0], data : ''});
    }else{
    if (req.body.userRole == 1){
    user.query("SELECT COUNT(*) AS cnt FROM tb_user WHERE mobile = ? ", req.body.mobile, function(err , data){
        console.log('66666',data);
    if(err){
        console.log('eeeeeeeeeeeeeeeeee',err);

        return res.json({code : 101, status :false, message : 'SomeThing went wrong',data: ''});
    }   
    else{
        if(data[0].cnt > 0){  
            console.log('1111',data[0].cnt > 0);
            return res.json({code : 101, status :false, message : 'Mobile no. Already Exists Please try with a different Mobile No.',data:''});
        }else{
            user.query('INSERT INTO tb_user SET ?' , log, function(err , insert){
               if(err){
        console.log('errorrrrrrrrrrrrrrrrrr',err);
                   return res.json({code : 101, status :false, message : 'Some Technical Problem',data:''});
                }else{
                    console.log('Insert',insert);
                    sendOtp.send(req.body.mobile, "NEEMAP", function(err,data){
                        return res.json({code : 100, status :true, message : 'Succssfully Saved Please Verify Your Mobile No.', data :insert });
                    })
                }
           })    

        }
    }
})
    }else  if (req.body.userRole == 2){
        user.query("SELECT COUNT(*) AS cnt FROM tb_user WHERE mobile = ? ", req.body.mobile, function(err , data){
            console.log('66666',data);
        if(err){
            console.log('eeeeeeeeeeeeeeeeee',err);
    
            return res.json({code : 101, status :false, message : 'SomeThing went wrong',data: ''});
        }   
        else{
            if(data[0].cnt > 0){  
                console.log('1111',data[0].cnt > 0);
                return res.json({code : 101, status :false, message : 'Mobile no. Already Exists Please try with a different Mobile No.',data:''});
            }else{
                user.query('INSERT INTO tb_user SET ?' , log, function(err , insert){
                   if(err){
            console.log('errorrrrrrrrrrrrrrrrrr',err);
                       return res.json({code : 101, status :false, message : 'Some Technical Problem',data:''});
                    }else{
                        console.log('Insert',insert);
                        sendOtp.send(req.body.mobile, "NEEMAP", function(err,data){
                            return res.json({code : 100, status :true, message : 'Succssfully Saved Please Verify Your Mobile No.', data :insert });
                        })
                    }
               })    
    
            }
        }
    })
    } else if (req.body.userRole == 3){
        user.query("SELECT COUNT(*) AS cnt FROM tb_user WHERE mobile = ? ", req.body.mobile, function(err , data){
            console.log('66666',data);
        if(err){
            console.log('eeeeeeeeeeeeeeeeee',err);
    
            return res.json({code : 101, status :false, message : 'SomeThing went wrong',data: ''});
        }   
        else{
            if(data[0].cnt > 0){  
                console.log('1111',data[0].cnt > 0);
                return res.json({code : 101, status :false, message : 'Mobile no. Already Exists Please try with a different Mobile No.',data:''});
            }else{
                user.query('INSERT INTO tb_user SET ?' , log, function(err , insert){
                   if(err){
            console.log('errorrrrrrrrrrrrrrrrrr',err);
                       return res.json({code : 101, status :false, message : 'Some Technical Problem',data:''});
                    }else{
                        console.log('Insert',insert);
                        sendOtp.send(req.body.mobile, "NEEMAP", function(err,data){
                            return res.json({code : 100, status :true, message : 'Succssfully Saved Please Verify Your Mobile No.', data :insert });
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
            return res.json({code : 101, status : false, message : 'Invalid Otp'});
        }else{
        if(err.type = 'sucsess'){
            user.query('UPDATE `tb_user` SET verifyNumber=true WHERE mobile = ?',req.body.mobile ,function(err,rs){
                console.log('0000000000000',err,rs)
                if(rs){
                    return res.json({code : 100, status: true, message : 'Otp Verified'});
                }
            })
        }else{
            return res.json({code : 101, status: false, message: 'Otp Verification Failed'})
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
        return res.json({code : 101, status : false, message : errorMessage[0], data : ''});
    }else{
        
        var mobile=req.body.mobile;
        var userRole = req.body.userRole;
        var email=req.body.email;        
        var password=req.body.password;

    // try{
        if(req.body.mobile  ){
           return new Promise ((resolve, reject)=>{
            user.query('SELECT * FROM tb_user WHERE mobile ="'+mobile+'"  AND userRole = "'+userRole+'"' ,   new Promise (function (error, results, fields) {
                console.log('resultsssssssssssss',results);
              if (error) {
                console.log('errrrrrrrrrrrrrrrrrrrrr',error);
                  res.json({ code : 101, status:false, message:'there are some error with query'})
                }else{
                if(results.length >0 ){
                    if(results[0].verifyNumber > 0){
                    //   decryptedString = await bcrypt.compare(req.body.password,results[0].password);
                    if(  bcrypt.compare(req.body.password,results[0].password)){
                      return resolve (res.json({status:true, message:'Login successfully'}));
                    }else{
                        res.json({status:false,message:"Mobile No. and password does not match"});
                    }
    
                }else{
                    return res.json({code : 101, status:false, message: 'Please verify your Mobile no.'})
              }
                }else{
                  res.json({status:false, message:"Mobile No. And User Role does not exits"});
                }
              }
            }));
        });
        }
       else if (req.body.email){
           return new Promise ((resolve, reject)=>{
            user.query('SELECT * FROM tb_user WHERE email ="'+email+'"  AND userRole = "'+userRole+'"'  ,async function (error, results, fields) {
            console.log('resultsssssssssssss',results);
          if (error) {
            console.log('errrrrrrrrrrrrrrrrrrrrr',error);
            return resolve ( res.json({ code : 101, status:false, message:'there are some error with query'}));
          }else{
            if(results.length >0){
                if(results[0].activeEmail > 0){
                //   decryptedString = cryptr.decrypt(results[0].password);
                if(await bcrypt.compare(req.body.password,results[0].password)){
                   return resolve (res.json({status:true, message:'Login successfully'}));
                }else{
                  return resolve ( res.json({status:false,message:"E-mail and password does not match"}));
                }

            }else{
                return resolve (res.json({code : 101, status:false, message: 'Please verify your E-mail'}));
    }

            }else{
             return resolve (res.json({status:false, message:"E-mail And User Role does not exits"}));
            }
          }
        });
        });
    }
//    }catch {
//         return res.json({code : 101, status : false, message : 'Error Please Try Again'});
//     }
}
})


var forgetPass = ((req,res)=>{
    var mobile = req.body.mobile;

    user.query("SELECT * FROM tb_user WHERE mobile =?", mobile, function(err,data){
        if(err){
            return res.json({code : 101, status: false, message: 'Oops! There is an error'});
        }else {
            console.log('dataaaaaaaaaaaaaaa',data);
            sendOtp.send(req.body.mobile , "NEEMAP", function(err,resp){
                return res.json({code : 100, status: true , message : 'Otp Sent On Registered Mobile No.'})
            })
        }
    })
})

var verifyResetPass = ((req,res)=>{

    var verifyOtp = req.body.verifyOtp;
    var mobile = req.body.mobile;

    sendOtp.verify(mobile,verifyOtp,((resp,err)=>{
        console.log('ERROROOROROOROOROOROOR',err);
        if(err.type == 'error'){
            return res.json({code : 101, status : false, message : 'Invalid Otp'});
        }else{
        if(err.type = 'sucsess'){
            user.query('UPDATE `tb_user` SET verifyNumber=true WHERE mobile = ?',req.body.mobile ,function(err,rs){
                console.log('0000000000000',err,rs)
                if(rs){
                    return res.json({code : 100, status: true, message : 'Otp Verified'});
                }
            })
        }else{
            return res.json({code : 101, status: false, message: 'Otp Verification Failed'})
        }

    }
    }))
})

var saveNewPassword = ((req,res)=>{
    var mobile = req.body.mobile;
    var password = req.body.password;

    user.query('SELECT * FROM tb_user WHERE mobile =?',mobile, async function(err,results){
        if(err){
            return res.json({code: 101, status: false, message: 'Some Error With Query'});
        }else{
            let pass = bcrypt.hashSync(req.body.password , 10);

            if(await bcrypt.compare(req.body.password, results[0].password)){
                return res.json({code:101, status: false, message: 'Can Not Set Old The Password Please Use Another One'})
            }else {
                user.query('UPDATE `tb_user` SET password ="'+pass+'" WHERE mobile ="'+mobile+'"', function(err,save){
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

module.exports = {registerMobile,login,verifyMobileNumber,forgetPass,verifyResetPass,saveNewPassword};