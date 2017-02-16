
import _ from 'lodash';

export default function($scope, $location, userFactory){

  //userFactory.getUsers($scope);
  $scope.createUser = _.partial(userFactory.createUser,$scope);

  //$scope.userLogin  = _.partial(userFactory.userLogin,$scope);
  $scope.userLogin  = _.partial(userFactory.userLogin,$scope,$location);
  $scope.loggedIn = _.partial(userFactory.isLoggedIn,$scope);

  $scope.user = '';
  $scope.$on('routeChangeStart',function(){
     $scope.loggedIn = userFactory.isLoggedIn();

     userFactory.getUser()
                .then(function(data){
                  $scope.user = data.data;
                });
   });

  $scope.logout = function(){
    userFactory.logout();
    $location.path('/logout');
  }

  //$scope.getTasks =
  userFactory.getTasks($scope);
}
