var mysql = require('mysql');

var user = mysql.createPool({
    host : '127.0.0.1:3306',
    user : 'shivendra.jadon8357@gmail.com',
    password: 'Jadon@1234',
    database : 'neem',
    // debug : false
});

module.exports = user;