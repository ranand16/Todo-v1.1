import _ from 'lodash';
import angular from 'angular';
//import authTokenFactory from './authToken-factory';

const userFactory = angular.module('app.userFactory',[])
.factory('userFactory',($http,$q,AuthToken)=>{
  function getUsers($scope){
    $http.get('/api/users').success(response => {
      $scope.users = response.users;
    });
  }
  function createUser($scope){
    $http.post('/api/signup',{
    name: $scope.name,
    username: $scope.username,
    password: $scope.password,
    data:[]
    }).success(response => {
      $scope.registered = response.successMessage;
      $scope.notRegistered = response.failureMessage;
      $scope.name = '';
      $scope.username = '';
      $scope.password = '';
    });
  }
   function userLogin($scope){
   }
   function userLogin($scope,$location){
    $http.post('/api/login',{
      username:$scope.susername,
      password:$scope.spassword
    }).success(response => {
      $scope.token = response.token;
      $scope.success = response.success;
      AuthToken.setToken($scope.token);//as soon as its logged in ... set the token you got via response
      //console.log(AuthToken.getToken());
      //console.log(response);
      $scope.user = response;
      $location.path('/todoss');
    });

   }


   function getTasks($scope){
     $http.get('/api',{
       headers : { token : AuthToken.getToken() }
     }).success(response => {
       $scope.todos = response.todos;
       console.log("o/p");
       console.log($scope.todos);
     });
   }


   function gettodos($scope){
     $http.get('/api').success(response => {
       $scope.users = response.users;
     });
   }
   function logout(){
      AuthToken.setToken();
   }
   function isLoggedIn(){
    if(AuthToken.getToken())
      return true;
    else
      return false;
   }
   function getUser(){
    if(AuthToken.getToken())
      return $http.get('/api/me'); //refer routes/user.js line 128
    else
      return $q.reject({message:"Error in getting Token"}) ;
    }



   return {
    getUsers,
    userLogin,
    createUser,
    logout,
    isLoggedIn,
    getUser,

    getTasks
  };
})





.factory('AuthToken',($window) => {
  function getToken(){
    //console.log($window.localStorage.getItem('token'));
    return $window.localStorage.getItem('token');
  }

  function setToken(token){
    if(token)
      $window.localStorage.setItem('token',token);
    else
      $window.localStorage.removeItem('token');
  }
  return {
    getToken,
    setToken
  };
})







.factory('authInterceptorFactory',($q, $location, AuthToken) => {
  function request(config){
    var token = AuthToken.getToken();
    if(token){
      config.headers['x-access-token'] = token; //same as giving heaers in POSTMAN app to get access to aa different url
    }
    return config;
  }

  function responseError(config){
    if(response.status == 403)
      $location.path('/');
    return $q.reject(response);
  }
  return{
    request,
    responseError
  };
});



export default userFactory;
