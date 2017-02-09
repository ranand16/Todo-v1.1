var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  task: String,
  isCompleted: Boolean,
  isEditing: Boolean
});

var Todo = mongoose.model('Todo',todoSchema);
module.exports.Todo = Todo;
module.exports.todoSchema = todoSchema;
