import _ from 'lodash';
import angular from 'angular';

const userFactory = angular.module('app.userFactory',[])
.factory('userFactory',($http)=>{
  function getUsers($scope){
    $http.get('/api/users').success(response => {
      $scope.users = response.users;
    });
  }
  function createUser($scope){
    $http.post('/api/signup',{
    name: $scope.name,
    username: $scope.username,
    password: $scope.password
    }).success(response => {
      $scope.registered = response.successMessage;
      $scope.notRegistered = response.failureMessage;
      $scope.name = '';
      $scope.username = '';
      $scope.password = '';
    });
  }
  function userLogin($scope){
    $http.post('/api/login',{
      username:$scope.susername,
      password:$scope.spassword
    }).success(response => {
      $scope.token = response.token;
      $scope.success = response.success;
    });
  }
  return {
    getUsers,
    userLogin,
    createUser
  };
});
export default userFactory;
