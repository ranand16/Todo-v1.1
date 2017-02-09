
import _ from 'lodash';

export default function($scope, $location, userFactory){


  userFactory.getUsers($scope);
  $scope.createUser = _.partial(userFactory.createUser,$scope);
  $scope.userLogin  = _.partial(userFactory.userLogin,$scope);
  

}
