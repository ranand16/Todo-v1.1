var mongoose = require('mongoose');
var User = require('server/models/user');
var express = require('express');
var secretKey = "its_really_very_secret";
var api = express.Router();
var bcrypt = require('bcrypt-nodejs');
var jsonwebtoken = require('jsonwebtoken');

function createToken(user){
  var token = jsonwebtoken.sign({
    _id:user._id,
    name:user.name,
    username:user.username
  },secretKey);
  return token;
}
  api.post('/signup',function(req,res){
    var user = new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password
    });
    user.save(function(err){
      if(err){
        res.json({failureMessage:"User Registration Failed"});
        return;
      }
      res.json({successMessage:"User has been created"});
    });
  });

  api.get('/users',function(req, res){
    User.find({},function(err, users){
      if(err){
        res.send(err);
        return;
      }
      res.send({users:users});
    });
  });

  api.post('/user', function(req, res){
    User.findOne({
      username:req.body.eUser
    }).exec(function(err, user){
        if(err) throw err;
        res.send({user:user});

    });
  });

  api.get('/hehe',function(req, res){
    console.log("Hey fellas...so much to do!!");
    res.send("Hey brother...!");
  });

  api.post('/login', function(req, res){
    User.findOne({
      username:req.body.username
    }).select('password').exec(function(err,user){
        if(err) throw err;
        if(!user){
          res.send({message:"User doesnot exist!"});
        }else if(user){
          var validPassword = user.comparePassword(req.body.password);
          if(!validPassword){
            res.send({message:"Invalid password"});
        }else{
          var token = createToken(user);
          res.json({
            success:true,
            message:"successfully login!",
            token: token
          });
          res.redirect('home');
        }
      }
    });
  });


  api.use(function(req, res, next){
    console.log("We have a guest");
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    //check whether token exists
    if(token){
      jsonwebtoken.verify(token,secretKey,function(err,decoded){
        if(err){
          res.status(403).send({success:false, message:"Failed to authenticate user"});
        } else {
          res.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(403).send({success:false, message:"No token provided"});
    }
  });

  // with the valid token travel the other part of API

  api.route('/')
    .post(function(req, res){
      var todo = new Todo({
        
      });
    })

    .get(function(req, res){

    });


  module.exports = api;
