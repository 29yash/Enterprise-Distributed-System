var express = require('express');
var App = express();
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var mysql      = require('mysql');

var dbConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'yash',
    database : 'homeaway'
  });

  var server = App.listen(8080, function () {
    console.log("Server started on port 8080");
    
    dbConnection.connect();

    dbConnection.query('SELECT * from users', function(err, rows, fields) {
        if (!err)
          console.log('The solution is: ', rows);
        else
          console.log('Error while performing Query.');
      });      

});