var user = require('../../model/user');

var doctorList = ((req,res)=>{

    user.query('SELECT user.firstName, user.lastName,doctor_list.speciality,doctor_list.rating,doctor_list.country,doctor_list.experience,doctor_list.distance,doctor_list.language,doctor_list.price_personal,doctor_list.price_oncall,doctor_list.price_onchat,doctor_list.status FROM user LEFT JOIN doctor_list ON user.id = doctor_list.doctor_id',function(err,data){
        console.log('data',data);
        if(err){
            return res.json({code: 101, status: false, message: 'Something Went Wrong'})
        }else {
            return res.json({code: 100, status: true, data})
        }
    })

})

var doctorDetail = ((req,res)=>{

    user.query('SELECT user.firstName, user.lastName,doctor_list.speciality,doctor_list.rating,doctor_list.about,doctor_list.country,doctor_list.experience,doctor_list.address,doctor_list.language,doctor_list.price_personal,doctor_list.price_oncall,doctor_list.price_onchat,doctor_list.status FROM user LEFT JOIN doctor_list ON user.id = doctor_list.doctor_id WHERE doctor_id =?',req.body.doctor_id,function(err,data){
        console.log('data',data);
        if(err){
            return res.json({code: 101, status: false, message: 'Something Went Wrong'})
        }else {
            if(!data[0] ||data[0] ==null ||data[0] ==undefined || data[0]=='')return res.send({code : 101, status: false, message: "User does not exist"});                                             
            return res.json({code: 100, status: true, data})
        }
    })

})


var filterList = ((req,res)=>{
    console.log('req.body', req.body);

    let qry;
    let speciality = req.body.speciality;
    let rating = req.body.rating;
    let language = req.body.language;
    let price_oncall = req.body.price_oncall;
    let price_onchat = req.body.price_onchat;
    let price_personal = req.body.price_personal;

    if(speciality === '' && rating === '' && language === '' && price_oncall === '' && price_onchat === '' && price_personal === ''){
        qry = 'SELECT * FROM doctor_list WHERE doctor_id =?', req.body.doctor_id;
    }else if (speciality !== '' && rating ==='' && language === ''&& price_oncall === '' && price_onchat === '' && price_personal ==='' ){
        console.log('speciality',speciality);
        qry = 'SELECT * FROM doctor_list WHERE doctor_id ="'+req.body.doctor_id+'"  AND speciality = "'+speciality+'"';
    }else if (speciality !== '' && rating !== '' && language === '' && price_oncall === '' && price_onchat === '' && price_personal ===''){
        qry  = 'SELECT * FROM doctor_list WHERE doctor_id ="'+req.body.doctor_id+'"  AND speciality = "'+speciality+'" AND rating = "'+rating+'"'; 
    }else if (speciality !== '' && rating !=='' && language !== '' && price_oncall === '' && price_onchat === '' && price_personal === ''){
        qry = 'SELECT * FROM doctor_list WHERE doctor_id ="'+req.body.doctor_id+'"  AND speciality = "'+speciality+'" AND rating = "'+rating+'" AND language ="'+language+'"';
    }else if (speciality !== '' && rating !=='' && language !=='' && price_oncall !== '' && price_onchat === '' && price_personal ===''){
        qry = 'SELECT * FROM doctor_list WHERE doctor_id ="'+req.body.doctor_id+'"  AND speciality = "'+speciality+'" AND rating = "'+rating+'" AND language ="'+language+'" AND price_oncall ="'+price_oncall+'"';
    }else if (speciality !== '' && rating !== '' && language !=='' && price_oncall !=='' && price_onchat !=='' && price_personal ===''){
        qry = 'SELECT * FROM doctor_list WHERE doctor_id ="'+req.body.doctor_id+'"  AND speciality = "'+speciality+'" AND rating = "'+rating+'" AND language ="'+language+'" AND price_oncall ="'+price_oncall+'" AND price_onchat ="'+price_onchat+'"';        
    }else if(speciality !== '' && rating !== '' && language !=='' && price_oncall!== '' && price_onchat!== '', price_personal!==''){
        qry = 'SELECT * FROM doctor_list WHERE doctor_id ="'+req.body.doctor_id+'"  AND speciality = "'+speciality+'" AND rating = "'+rating+'" AND language ="'+language+'" AND price_oncall ="'+price_oncall+'" AND price_onchat ="'+price_onchat+'" AND price_personal ="'+price_personal+'"';
    }
    
    user.query(qry, function(err,result){
        // console.log('doctor_id', qry);
        console.log('result',result);
        if(err){
            console.log(';;;;;;;;;;;;;;;;;;;;;;;;',err);
            return res.json({code : 101, status: false , message: 'Some Error occured'});
        }else{
            return res.json({code: 100, status: true, message: '', result:[]})
        }
    })
    
});

module.exports = {doctorList,doctorDetail};

