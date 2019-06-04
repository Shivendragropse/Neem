var user = require('../../model/user');

var doctorProfile = ((req,res)=>{

    var log = {
        speciality : req.body.speciality,
        about : req.body.about,
        country : req.body.country,
        experience : req.body.experience,
        address : req.body.address,
        lattitude: req.body.lattitude,
        longitude : req.body.longitude,
        language : req.body.language,
        price_personal : req.body.price_personal,
        price_oncall : req.body.price_oncall,
        price_onchat : req.body.price_onchat,
        status : req.body.status,
        created_at : new Date(),
    }

    req.checkBody ({
        'speciality':{
            notEmpty : true,
            errorMessage : 'Please Fill The speciality'
        },

        'about':{
            notEmpty : true,
            errorMessage : 'Tell me About YourSelf'
        },

        'country':{
            notEmpty : true,
            errorMessage : 'Fill The Country'
        },

        'experience':{
            notEmpty: true,
            errorMessage: 'Please Fill the Experience'
        },

        'address':{
            notEmpty: true,
            errorMessage : 'Please Fill the Address'
        },

        'language': {
            notEmpty : true,
            errorMessage : 'Please Fill the Language Column'
        },

        'price_personal': {
            notEmpty : true,
            errorMessage : 'Please Fill the price'
        },

        'price_oncall': {
            notEmpty : true,
            errorMessage : 'Please Fill the price'
        },

        'price_onchat' : {
            notEmpty : true,
            errorMessage : 'Please Fill the price'
        },
    });

    const errors = req.validationErrors();
    if (errors){
        var errorMessage = [];
        errors.forEach((err)=>{
            errorMessage.push(err.msg);
        });
        return res.json({code : 101 , status : false , message : errorMessage[0] , data : ''});
    }else {
        
    }
    

})