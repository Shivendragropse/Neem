var user = require('../../model/user');

var fetchUser = ((req,res)=>{

    var email = req.body.email;
    var mobile = req.body.mobile;

    user.query('SELECT * FROM tb_user WHERE email ="'+email+'" OR mobile="'+mobile+'"', function(err,results){
        if(err){
            console.log('err',err);
            return res.json({code: 101, status: false , message : 'Some Error'});
        }else {
            console.log('results',results);
            return res.json({
              code : 100,
              status: true,
              data :{firstName : results[0].firstName,
                     lastName  : results[0].lastName,
                     email : results[0].email,
                     mobile : results[0].mobile,
                   }
                })
             }
          })
       });

var updateProfile = ((req,res)=>{
    // try {
        var mobile = req.body.mobile;
        var email = req.body.email;
        
        user.query('SELECT * FROM tb_user WHERE email="'+email+'" OR mobile="'+mobile+'"', function(err,results){
            console.log('tttttttttt',results);
            if(err){
                console.log('err1111',err);
                return res.json({code:101, status : false, message: 'Some Error With Query'});
            }else {
                                     results[0].firstName = req.body.firstName,
                                     results[0].lastName =  req.body.lastName
                                
                user.query('UPDATE `tb_user` SET firstName ="'+req.body.firstName+'" WHERE email =?', email, function(error,data){
                    if(error){
                console.log('errorroroorororoor',error);
                        return res.json({code : 101, status: false, message : 'OOPS! There is an Error'});
                    }else{
                        console.log('dataaaa22222',data);
                        return res.json({code: 100, 
                            status : true ,
                            message: "Profile Photo Updated SuccessFully",
                            // firstName : data[0].firstName,
                            // lastName: data[0].lastName
                        })
                    }
                })
            }
        })

    // }catch{
    //     return res.json({code : 101, status : false, message : 'SomeThing Went Wrong'});
    // }
})

module.exports = {fetchUser,updateProfile};