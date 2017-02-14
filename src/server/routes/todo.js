var mongoose = require('mongoose');
var Todo = require('server/models/todo').Todo;
var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
  Todo.find(function(err, results){
    if(err) {console.log(err);}
    res.send({todos:results});
  });
});
//done
router.get('/hehe',function(req,res){
  res.send("hehehahahh");
  });
//not neede but done
router.post('/',function(req,res){
  //var todo = new Todo(req.body);
  var todo = new Todo({
    task: req.body.task,
    isCompleted: req.body.isCompleted,
    isEditing: req.body.isEditing
  });
  todo.save(function(err){
    if(err){
      console.log(err);
      return;
    }
    console.log('Saved');
    res.send('SUCCESS!!');
  });
});
//done
router.put('/:id',function(req,res){
  var id = req.params.id;
  Todo.update({ _id: mongoose.Types.ObjectId(id) },
  {  $set: {task : req.body.task}},
  function(err){
    if(err){console.log(err);}
    res.send('ToDo updated');
  });
});

router.delete('/:id',function(req,res){
  var id = req.params.id;
  Todo.remove({ _id: mongoose.Types.ObjectId(id) },function(err){
    if(err) {console.log(err);}
    res.send('ToDo deleted');
  });
});

module.exports = router;
