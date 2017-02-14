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
<<<<<<< HEAD
  }
   function userLogin($scope){
=======
   }
   function userLogin($scope,$location){
>>>>>>> ea3ff7f938d19a7cbd52f821dc97878754384398
    $http.post('/api/login',{
      username:$scope.susername,
      password:$scope.spassword
    }).success(response => {
      $scope.token = response.token;
      $scope.success = response.success;
<<<<<<< HEAD
      //AuthToken.setToken($scope.token); //as soon as its logged in ... set the token you got via response
      // getUser()
      //   .then(function(data){
      //       $scope.user = response.data;
      //     console.log($scope.user);
      //   });

=======
      AuthToken.setToken($scope.token);//as soon as its logged in ... set the token you got via response
      console.log(AuthToken.getToken());
      $scope.user = response;
      $location.path('/todo');
>>>>>>> ea3ff7f938d19a7cbd52f821dc97878754384398
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
    getUser
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
