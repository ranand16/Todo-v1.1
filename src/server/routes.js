var todosRoutes = require('server/routes/todo');
var usersRoutes = require('server/routes/user');

module.exports = function routes(app){
  app.use('/api',usersRoutes);
  app.use('/todos',todosRoutes);
};
