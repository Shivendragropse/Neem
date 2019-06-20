var user = require('../../model/user');
var async = require('async');
var adminSetting = ((req,res)=>{
    try{  

    var heightResultArr   ;
    var weightResultArr ;
    var bloodgroupResultArr ;

    user.query('SELECT * FROM height WHERE status = 1', function(err,heightResult){
        heightResultArr = heightResult;
         console.log('result',  heightResultArr);
         
     })
     user.query('SELECT * FROM bloodgroup WHERE status = 1', function(err,bloodgroupResult){
        bloodgroupResultArr = bloodgroupResult;
         console.log('result',  bloodgroupResultArr);
         
     })
     user.query('SELECT * FROM weight WHERE status = 1', function(err,weightResult){
         weightResultArr = weightResult;
        console.log('result',  weightResultArr);
        return res.json({code : 100, status : true, heightResultArr,bloodgroupResultArr,weightResultArr});  
    })
    

    }catch(error) {
        console.log('error',error);
        return res.json({code : 101, status: false, message: 'something went wrong'});
    }
})

module.exports = {adminSetting};