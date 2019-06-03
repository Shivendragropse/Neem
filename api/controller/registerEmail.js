var user = require('../../model/user');
var bcrypt = require('bcryptjs');
var nodemailer = require ('nodemailer');
var smtpTransport = require ('nodemailer-smtp-transport');
var randomstring = require('randomstring');
var dotenv = require('dotenv');
const env = dotenv.config();
dotenv.config({path: '.env'});
dotenv.config({encoding: 'utf8'});
var NEEM = env.parsed['NEEMurl'];

var transporter = nodemailer.createTransport({
    service : 'Gmail',
    host : 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth : {
         user: 'er.jitendra7104@gmail.com',
        pass: 'jitu918333'
    }
});

var registerEmail = ((req,res)=>{
console.log('req.body',req.body);
    var today = new Date();
    // var emailToken = randomstring.generate(64);
    const otp = randomstring.generate(6);
    var otpExpires = Date.now() + 86400000;
    var encryptedString = bcrypt.hashSync(req.body.password, 10);
    var log = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        // activeEmailOtp : emailToken,
        otp : otp,
        activeEmailOtpExp : otpExpires,
        activeEmail : false,
        password : encryptedString,
        created_at : today,
        userRole : req.body.userRole,
        type : 'Email',
        created_at : today,
        device_id : false,
        device_type : false,
        device_token : false,
    }

    req.checkBody ({
        'firstName': {
            notEmpty : true,
            errorMessage : 'Please Fill The FirstName'
        },
        'lastName' : {
            notEmpty : true,
            errorMessage : 'Please Fill The LastName'
        },
        'email':{
            notEmpty : true,
            errorMessage : 'Please Fill The E-mail'
        },
        'password':{
            notEmpty : true,
            errorMessage :'Please Fill The Password'
        },
    });

    const errors = req.validationErrors();
    if(errors){
        var errorMessage = [];
        errors.forEach((err)=>{
            errorMessage.push(err.msg);
        });
        return res.json({code: 101, status : false, message : errorMessage[0], data:''})
    }else {
        if(req.body.userRole == 1){
        user.query("SELECT COUNT(*) AS cnt FROM tb_user WHERE email = ?",req.body.email, function(err, data){
            if(err){
                return res.json({code : 101, status : false, message : 'Something Went Wrong'});
            }else {
                if(data[0].cnt >0){
                    return res.json({code : 101 , status : false , message : 'E-mail Already Exists Please Try With A Another E-mail'});
                }else { const mailOptions = {
                    from : 'er.jitendra7104@gmail.com',
                    to  : req.body.email,
                    subject : 'Account Activation | NEEM',
                    html: `<body>
                           <h1>Hello ${req.body.email}</h1>
                           <h2>This is your One Time Password : ${otp} </h2>
                           `
                };
                transporter.sendMail(mailOptions, function (err,info){
                    if (err) {
                        console.log('errororoororororoororoo',err);
                        return res.json({code: 101 ,status : false, message : 'Network Error. Unable to send email currently'})
                    }else{
                        console.log('infooooooooooooooooooo', info);
                        user.query("INSERT INTO tb_user SET ?",log , function(err , insert) {
                            console.log('insertttttt',err,insert);
                            if(err) {
                                return res.json({code : 101 , status : false, message : 'Some Technical Problem', data :''});
                            }else{
                                
                                return res.json({code : 100 , status: true,otp: otp, message : 'Succssfully Saved Please Verify Your E-mail Address',data : insert});
                            }
                        })  
                        
                    }
                }) 
                    
                }
            }
        })
           }else if (req.body.userRole == 2){
            user.query("SELECT COUNT(*) AS cnt FROM tb_user WHERE email = ?",req.body.email, function(err, data){
                if(err){
                    return res.json({code : 101, status : false, message : 'Something Went Wrong'});
                }else {
                    if(data[0].cnt >0){
                        return res.json({code : 101 , status : false , message : 'E-mail Already Exists Please Try With A Another E-mail'});
                    }else { const mailOptions = {
                        from : 'er.jitendra7104@gmail.com',
                        to  : req.body.email,
                        subject : 'Account Activation | NEEM',
                        html: `<body>
                               <h1>Hello ${req.body.email}</h1>
                               <h2>This is your One Time Password : ${otp} </h2>
                               `
                    };
                    transporter.sendMail(mailOptions, function (err,info){
                        if (err) {
                            console.log('errororoororororoororoo',err);
                            return res.json({code: 101 ,status : false, message : 'Network Error. Unable to send email currently'})
                        }else{
                            console.log('infooooooooooooooooooo', info);
                            user.query("INSERT INTO tb_user SET ?",log , function(err , insert) {
                                console.log('insertttttt',err,insert);
                                if(err) {
                                    return res.json({code : 101 , status : false, message : 'Some Technical Problem', data :''});
                                }else{
                                    
                                    return res.json({code : 100 , status: true,otp :otp, message : 'Succssfully Saved Please Verify Your E-mail Address',data : insert});
                                }
                            })  
                            
                        }
                    }) 
                        
                    }
                }
            })
           }else if (req.body.userRole == 3){
            user.query("SELECT COUNT(*) AS cnt FROM tb_user WHERE email = ?",req.body.email, function(err, data){
                if(err){
                    return res.json({code : 101, status : false, message : 'Something Went Wrong'});
                }else {
                    if(data[0].cnt >0){
                        return res.json({code : 101 , status : false , message : 'E-mail Already Exists Please Try With A Another E-mail'});
                    }else { const mailOptions = {
                        from : 'er.jitendra7104@gmail.com',
                        to  : req.body.email,
                        subject : 'Account Activation | NEEM',
                        html: `<body>
                               <h1>Hello ${req.body.email}</h1>
                               <h2>This is your One Time Password : ${otp} </h2>
                               `
                    };
                    transporter.sendMail(mailOptions, function (err,info){
                        if (err) {
                            console.log('errororoororororoororoo',err);
                            return res.json({code: 101 ,status : false, message : 'Network Error. Unable to send email currently'})
                        }else{
                            console.log('infooooooooooooooooooo', info);
                            user.query("INSERT INTO tb_user SET ?",log , function(err , insert) {
                                console.log('insertttttt',err,insert);
                                if(err) {
                                    return res.json({code : 101 , status : false, message : 'Some Technical Problem', data :''});
                                }else{
                                    
                                    return res.json({code : 100 , status: true,otp :otp, message : 'Succssfully Saved Please Verify Your E-mail Address',data : insert});
                                }
                            })  
                            
                        }
                    }) 
                        
                    }
                }
            })
           }
           else {
           return res.json({code : 101, status : false , message: 'Please fill Valid Role'})
           }
    }
})

// var verifyEmail = ((req, res, next)=> {
//     console.log('888888888888',req.params);
//     const Token= req.params.token;
//     var otp = req.params.otp;
//      console.log('11111111111111111111111', Token, typeof Token)
//  try {
//      if(!Token || Token == null || Token == '' || Token==undefined || !otp ||otp==''){
//          return res.json({status: false, message:"There is something wrong with the verification.Please retry."});
//      }
//      user.query('SELECT * FROM tb_user WHERE activeEmailOtp =?', Token, function(err, data){
//          console.log('987654',data);
//          if(err){
//              console.log('ERROR',err);
//              return res.json({code : 101, status: false, message : 'Error Please Try Again'});
//          }
//          if(!data){
//             console.log('data',data);
//              return res.json({code: 101, status : false, message : 'Error! Account already activated'});
//          }
//          else{
//              user.query('UPDATE `tb_user` SET activeEmail=true ', function(err,saved){
//                  if(err){
//                      console.log('errrrr',err);
//                      return res.json({code:101, status : false, message : 'Some Error With Query'})
//                  }
//                  if(!saved){
//                      console.log('saveed',saved);
//                      return  res.json({code: 101, status: false, message : 'Please Try Again'});
//                  }
//                  return res.json({code: 100, status : true, message: 'SuccessFully Saved'});
//              })
//          }
         
//      })

//     }catch {
//         return res.json({code : 101, status : false,message: 'Some Error With Query'});
//     }
// });

var verifyOtp = ((req,res)=>{
    console.log('//////',req.body);
    var email = req.body.email;
    var otp = req.body.otp;
    // try {
        user.query('SELECT * FROM tb_user WHERE email ="'+email+'"  AND otp = "'+otp+'"' , function (error, results){
         console.log('999999',results !== null);            
            if (error) {
                console.log('errrr2222',err);
                return res.json({code : 101, status : false, message : 'Error Occured'});
            }
              console.log('888888888',results[0]);  
              if(results[0] === undefined || results[0] === null || results[0] ==='' ){
                  console.log('===========================',results[0] === undefined || results[0] === null || results[0] ==='');
                return res.json({code: 101, status : false ,message :'Enter Correct Otp'});
              }else{
                
            if(results[0].activeEmail>0){
                return res.json({code : 101, status : false, message : 'Error! Account already verified'})
            } else{
                 user.query('UPDATE `tb_user` SET activeEmail=true AND otp ="'+otp+'"', function(err,saved){
                     if(err){
                         console.log('errrrr',err);
                         return res.json({code:101, status : false, message : 'Some Error With Query'})
                     }
                     if(!saved){
                         console.log('saveed',saved);
                         return  res.json({code: 101, status: false, message : 'Please Try Again'});
                     }
                     return res.json({code: 100, status : true, message: 'E-mail Verified SuccessFully'});
                 })
             }
            }           
        },(e)=>{
            console.log('Errorrrrr8888',e);
        })
    // }catch {
    //     return res.json({code : 101, status : false , message : 'Error Please Try Again'});
    // }
})


var forgetPassword = ((req,res)=>{
    console.log('req.body',req.body);
    var email = req.body.email;
    const Otp = randomstring.generate(6);
    var otp = Otp;

    user.query('SELECT * FROM tb_user WHERE email =?',email, function(err,data){
        console.log('datareset',data);
        if(err)
      return res.json({code : 101, status : false, message : ' Oops! There is an error'});
    
      if(!data ||data==null ||data==undefined)return res.send({ status: false, message: "User does not exist"});
   
     if(data[0].activeEmail == 0) {
     return res.json({code : 101,status: false, message :"Please activate first, using the link sent to your email address"});
     }else {
         var mailOptions = {
            from: `er.jitendra7104@gmail.com`,
            to : req.body.email,
            subject : 'Forget Password | NEEM',
            html : `
                 <body>
                 <h1>Hello ${req.body.email}</h1>
                 <h2>This is One Time Password to Reset Password : ${Otp} . Please enter this OTP to reset password.</h2>
                 </body>
            `
         };
         transporter.sendMail(mailOptions, function(err,info){
             if(err){
                 return res.json({code : 101,status : false , message: "Error Sending Activation Link"});
             }else {
                 user.query('UPDATE `tb_user` SET  otp ="'+otp+'" WHERE email=?',email,function(err,saved){
                    //  console.log('err',log);s
                    if(err)
                        return res.json({code: 101, status : false, message : 'Please Try Again'});
                 if (saved ){
                     console.log('savedddddd',saved);
                     return res.json({code : 100, status : true ,email : email,Otp : Otp,message :"Reset Password Otp sent to your email address" })
                 }else {
                     return res.json({code : 101, status : false, message : "Please Try To reset Again"});
                 }
                 })
             }
         })
     }
    })

})

var verifyResetOtp = ((req,res)=>{
    console.log('//////',req.body);
    var email = req.body.email;
    var otp = req.body.otp;
    // try {
        user.query('SELECT * FROM tb_user WHERE email ="'+email+'"  AND otp = "'+otp+'"' , function (error, results){
         console.log('999999',results !== null);            
            if (error) {
                console.log('errrr2222',err);
                return res.json({code : 101, status : false, message : 'Error Occured'});
            }
              console.log('888888888',results[0]);  
              if(results[0] === undefined || results[0] === null || results[0] ==='' ){
                  console.log('===========================',results[0] === undefined || results[0] === null || results[0] ==='');
                return res.json({code: 101, status : false ,message :'Enter Correct Otp'});
              }else{
                return res.json({code : 100, status: true, message : 'Otp Verified', data:{}});            }           
        },(e)=>{
            console.log('Errorrrrr8888',e);
        })
    // }catch {
    //     return res.json({code : 101, status : false , message : 'Error Please Try Again'});
    // }
})

var saveNewPassword = ((req,res)=>{
    console.log('req.body',req.body);
    var password = req.body.password;
    var email = req.body.email;
    // try{
        if(!password || password === null || password === '') return res.json({code :101 , status : false, message : 'Enter Password'});
        user.query('SELECT * FROM tb_user WHERE email =?',email, async function(err,data){
            if (err){
                return res.json({code : 101 , status : false, message : 'Error Occured'});
            }else {
                let pass = bcrypt.hashSync(req.body.password ,10);
                // console.log('data1',typeof await bcrypt.compare(req.body.password,data[0].password));
                if(await bcrypt.compare(req.body.password,data[0].password)){
                    // console.log('data88888888888888888888888', req.body.password,data[0].password);                
                return res.json({code : 101,status : false ,message : 'Can Not Set Old The Password Please Use Another One'});    
                
                }
                 else{ 
                      user.query('UPDATE `tb_user` SET password ="'+pass+'" WHERE email ="'+email+'"', function(err,save){
                        if(err) {
                            console.log('err',err);
                            return res.json({code : 101, status : false, message : 'SomeThing Went Wrong'});
                        }else{
                            console.log('save',save);
                            return res.json({code : 100 , status : true, message : 'Password SuccessFully Changed'});
                        }
                    })
                }
            }
        })

    // } catch  {
    //     return res.json({code : 101, status : false, message : 'Error.Please Try Again'});
    // }
})

module.exports = {registerEmail,
    // verifyEmail,
    verifyOtp,
    verifyResetOtp,
    saveNewPassword,
    forgetPassword};