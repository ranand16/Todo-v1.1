import angular from 'angular';
import uiRouter from 'angular-ui-router';

import todoFactory from 'factories/todo-factory';
import userFactory from 'factories/user-factory';

import todosController from 'todos/todos';
import userController from 'user/user';

const app = angular.module('app',[uiRouter,todoFactory.name,userFactory.name]);

app.config(($stateProvider,$urlRouterProvider,$locationProvider) => {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('todos',{
      url:'/todo',
      template:require('todos/todos.html'),
      controller:todosController
    })
    .state('todoss',{
      url:'/todoss',
      template:require('user/todoss.html'),
      controller:userController
    })
    .state('about',{
      url:'/about',
      template:require('about/about.html')
    })
    .state('user',{
      url:'/',
      template:require('user/user.html'),
      controller:userController
    });
    $locationProvider.html5Mode(true);
});
export default app;
