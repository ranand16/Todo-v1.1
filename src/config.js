import angular from 'angular';
import uiRouter from 'angular-ui-router';

import todoFactory from 'factories/todo-factory';
import userFactory from 'factories/user-factory';
import homeFactory from 'factories/home-factory';
//import authTokenFactory from 'factories/authToken-factory';
//import authInterceptorFactory from 'factories/authInterceptor-factory';

import todosController from 'todos/todos';
import userController from 'user/user';
import homeController from 'home/home';


const app = angular.module('app',[uiRouter,todoFactory.name,userFactory.name,homeFactory.name]);

app.config(($stateProvider,$urlRouterProvider,$locationProvider) => {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('todos',{
      url:'/todo',
      template:require('todos/todos.html'),
      controller:todosController
    })
    .state('about',{
      url:'/about',
      template:require('about/about.html')
    })
    .state('home',{
      url:'/home',
      template:require('home/home.html'),
      controller:homeController
    })
    .state('user',{
      url:'/',
      template:require('user/user.html'),
      controller:userController
    });
    $locationProvider.html5Mode(true);
});
export default app;
