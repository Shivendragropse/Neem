var mysql = require('mysql');

var user = mysql.createPool({
    host : 'http://18.216.45.119:3000',
    port : '3306',
    user : 'root',
    password: '123456',
    database : 'neem',
    // debug : false
})

user.on('connection',function(connection){
    console.log('Connected To DataBase SuccessFully');

user.on('error',function(err){
    console.log(new Date(), 'MySQL Error' , err.code);
});
user.on('close',function(err){
    console.log(new Date(), 'MySQL close', err);
});
});



module.exports = user;