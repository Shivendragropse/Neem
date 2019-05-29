var mysql = require('mysql');

var user = mysql.createPool({
    host : '127.0.0.1:3306',
    user : 'root',
    password: '',
    database : 'neem',
    debug : false
});

module.exports = user;