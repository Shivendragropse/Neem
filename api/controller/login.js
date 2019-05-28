var Cryptr = require('cryptr');
var user = require('../../model/user');
cryptr = new Cryptr('myTotalySecretKey');
 
module.exports.signup=function(req,res){
    var today = new Date();
  var encryptedString = cryptr.encrypt(req.body.password);
    var users={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        mobile : req.body.mobile,
        password:encryptedString,
        created_at:today,
    }
    user.query("SELECT COUNT(*) AS cnt FROM tb_user WHERE email  = ? " , req.body.email, function(err , data){
      console.log('66666',data);
  if(err){
      return res.json({code : 101, status :false, message : 'SomeThing went wrong'});
  }   
  else{
      if(data[0].cnt > 0){  
          console.log('1111',data[0].cnt > 0);
          return res.json({code : 101, status :false, message : 'E-mail Already Exists Please try with a different email'});
      }else{
          user.query('INSERT INTO tb_user SET ?' , users, function(err , insert){
             if(err){
                 return res.json({code : 101, status :false, message : 'Something Went Wrong'});
              }else{
                  return res.json({code : 100, status :true, message : 'Succssfully Saved'});
              }
         })    

      }
  }
})
}



module.exports.authenticate=function(req,res){
    var email=req.body.email;
    var password=req.body.password;
   
   
    user.query('SELECT * FROM tb_user WHERE email = ?',[email], function (error, results, fields) {
      if (error) {
          res.json({ code : 101, status:false, message:'there are some error with query'})
      }else{
        if(results.length >0){
        decryptedString = cryptr.decrypt(results[0].password);
            if(password==decryptedString){
                res.json({status:true, message:'Login successfully'})
            }else{
                res.json({status:false,message:"Email and password does not match"});
            }
        }else{
          res.json({status:false, message:"Email does not exits"});
        }
      }
    });
}