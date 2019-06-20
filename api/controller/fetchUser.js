var user = require('../../model/user');

var fetchUser = ((req,res)=>{

    var email = req.body.email;
    var mobile = req.body.mobile;

    user.query('SELECT * FROM user WHERE email ="'+email+'" OR mobile="'+mobile+'"', function(err,results){
        if(err){
            console.log('err',err);
            return res.json({code: 101, status: false , message : 'Some Error'});
        }else {
      if(!results[0] ||results[0] ==null ||results[0] ==undefined || results[0]=='')return res.send({ status: false, message: "User does not exist"});

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
        
        user.query('SELECT * FROM user WHERE email="'+email+'" OR mobile="'+mobile+'"', function(err,results){
            // console.log('tttttttttt',results);
            if(err){
                console.log('err1111',err);
                return res.json({code:101, status : false, message: 'Some Error With Query'});

            }else {   
             if(!results[0] ||results[0] ==null ||results[0] ==undefined || results[0]=='')return res.send({ status: false, message: "User does not exist"});                                             
                user.query('UPDATE `user` SET firstName = "'+req.body.firstName+'" , lastName = "'+req.body.lastName+'" WHERE email="'+email+'" OR mobile="'+mobile+'"', function(error,data){
                    console.log('dataaaa22222',data);
                    if(error){
                console.log('errorroroorororoor',error);
                        return res.json({code : 101, status: false, message : 'OOPS! There is an Error'});
                    }else{
                        return res.json({code: 100, 
                            status : true ,
                            message: "Profile Photo Updated SuccessFully",
                        })
                    }
                })
            }
        })

    // }catch{
    //     return res.json({code : 101, status : false, message : 'SomeThing Went Wrong'});
    // }
})


var updateHealthInformation = ((req,res)=>{
    // try {
        var mobile = req.body.mobile;
        var email = req.body.email;
        
        user.query('SELECT * FROM user WHERE email="'+email+'" OR mobile="'+mobile+'"', function(err,results){
            // console.log('tttttttttt',results);
            if(err){
                console.log('err1111',err);
                return res.json({code:101, status : false, message: 'Some Error With Query'});

            }else {   
             if(!results[0] ||results[0] ==null ||results[0] ==undefined || results[0]=='')return res.send({ status: false, message: "User does not exist"});                                             
                user.query('UPDATE `user` SET height = "'+req.body.height+'" , weight = "'+req.body.weight+'", bloodgroup = "'+req.body.bloodgroup+'" WHERE email="'+email+'" OR mobile="'+mobile+'"', function(error,data){
                    console.log('dataaaa22222',data);
                    if(error){
                console.log('errorroroorororoor',error);
                        return res.json({code : 101, status: false, message : 'OOPS! There is an Error'});
                    }else{
                        return res.json({code: 100, 
                            status : true ,
                            message: "Health Information Updated SuccessFully",
                        })
                    }
                })
            }
        })

    // }catch{
    //     return res.json({code : 101, status : false, message : 'SomeThing Went Wrong'});
    // }
})



var homePage = ((req,res)=>{
    user.query('Select * FROM user WHERE id =?',req.body.id, function(err,data){
        console.log('data',data);
        if(err){
            return res.json({code :101 , status : false, message : 'Some Error With Query'});
        }else{
            return  res.json({code: 100, status : true, data :{
                firstName : data[0].firstName,
                image : data[0].image,
                notification : [],
                my_appoitment : [],
                doctor : [],
                lab : []
            }});
        }
    })
})

var profile = ((req,res)=>{
    // console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk',req.currentUser[0].firstName);
   return res.json({code : 100 , status : true ,message :''});
})


module.exports = {fetchUser,updateProfile,homePage,updateHealthInformation, profile};