var mysql = require('mysql');

var user = mysql.createPool({
    host : 'localhost',
    port : '3306',
    user : 'shivendra.jadon8357@gmail.com',
    password: 'Jadon@1234',
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