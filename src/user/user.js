
import _ from 'lodash';

export default function($scope, $location, userFactory){

  $scope.user = '';
  //userFactory.getUsers($scope);
  $scope.createUser = _.partial(userFactory.createUser,$scope);
  //$scope.userLogin  = _.partial(userFactory.userLogin,$scope);
  $scope.userLogin  = _.partial(userFactory.userLogin,$scope,$location);
  $scope.loggedIn = _.partial(userFactory.isLoggedIn,$scope); //for displaying the logOut button and future purposes.
  // $scope.$on('routeChangeStart',function(){
  //    $scope.loggedIn = userFactory.isLoggedIn();
  //
  //    userFactory.getUser()
  //               .then(function(data){
  //                 $scope.user = data.data;
  //               });
  //  }); FOR FUTURE USE while making more pages
  $scope.logout = function(){
    userFactory.logout();
    $location.path('/logout');
  }

  let params = {
    createHasInput:false
  };
  $scope.onCompletedClick = todo => {
    todo.isCompleted = !todo.isCompleted;
  };
  $scope.onEditClick = todo => {
    todo.isEditing = true;
    todo.updatedTask = todo.task;
  };
  $scope.onCancelClick = todo => {
    todo.isEditing = false;
  };
  userFactory.getTasks($scope);
  $scope.createTask = _.partial(userFactory.createTask, $scope, params);
  $scope.$watch('createTaskInput',_.partial(userFactory.watchCreateTaskInput,params,$scope));
  //$scope.updateTask = _.partial(userFactory.updateTask, $scope);


}
