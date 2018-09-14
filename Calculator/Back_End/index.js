var express = require('express');
var App = express();
var bodyParser = require('body-parser');
var cors = require('cors');

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: true })); 
App.use(express.static(__dirname + '/')); 

App.use(cors({ origin: 'http://localhost:3000', credentials: true }));

var server = App.listen(3001, function () {
    console.log("Server started on port 3001");
});

App.post('/calculate',function(req,res){
    console.log("Inside Calculate Route");
    console.log(req.body);
    
    if(req.body.expression){
        res.writeHead(200,{
            'Content-Type' : 'application/json'
        });
        try{
         let expression = eval(req.body.expression);
         res.end(JSON.stringify({result : expression}));
        }
        catch (error) {
            if (error instanceof SyntaxError) {
              res.end(JSON.stringify({error: 'Syntax Error: '+ error.message}));
            }
          }
    }
});
