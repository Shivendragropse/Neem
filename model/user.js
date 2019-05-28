var mysql = require('mysql');

var user = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password: '',
    database : 'neem',
    debug : false
});

module.exports = user;