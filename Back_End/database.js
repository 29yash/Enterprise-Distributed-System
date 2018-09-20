var mysql = require('mysql');
var dbPool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'yash',
    database : 'homeaway'
});

var getConnection = function(callback) {
    dbPool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};

module.exports = getConnection;