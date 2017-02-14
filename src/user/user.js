
import _ from 'lodash';

export default function($scope, $location, userFactory){

  userFactory.getUsers($scope);
  $scope.createUser = _.partial(userFactory.createUser,$scope);
<<<<<<< HEAD
  $scope.userLogin  = _.partial(userFactory.userLogin,$scope);

=======
  $scope.userLogin  = _.partial(userFactory.userLogin,$scope,$location);

  $scope.loggedIn = userFactory.isLoggedIn();

  $scope.user = '';
   $scope.$on('routeChangeStart',function(){
     $scope.loggedIn = userFactory.isLoggedIn();

     userFactory.getUser()
                .then(function(data){
                  $scope.user = data.data;
                });
   });
  // $scope.doLogin = function(){
  //   $scope.processing = true;
  //   $scope.error = '';
  //   $scope.userLogin
  //     .success(function(data){
  //       $scope.processing = false;
  //       userFactory.getUser()
  //                  .then(function(data){
  //                    $scope.user = data.data;
  //                  });
  //       if(data.success)
  //         $location.path('/home');
  //       else
  //         $scope.error = data.message;
  //     });
  // }

  $scope.logout = function(){
    userFactory.logout();
    $location.path('/logout');
  }
>>>>>>> ea3ff7f938d19a7cbd52f821dc97878754384398

}
