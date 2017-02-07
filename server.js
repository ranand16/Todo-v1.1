var express = require('express');
var app = express();
var routes = require('server/routes');
var bodyParser = require('body-parser');
var config = require('./conf');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.database,function(err){
  if(err){
    console.log("There is a connection error");
  }
  else{
    console.log("connected to db");
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

routes(app);

app.all('/*',function(req, res){
  res.send('\
  <!DOCTYPE html>\
  <html>\
    <head>\
        <base href="/">\
        <title></title\
    </head>\
    <body>\
      <div ui-view></div>\
      <script type="text/javascript" src="bundle.js"></script>\
    </body>\
  </html>\
  ');
});
app.listen(config.port, function(){
  console.log('Its running bro!');
});
