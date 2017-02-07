
import _ from 'lodash';

export default function($scope, userFactory){

  userFactory.getUsers($scope);
  $scope.createUser = _.partial(userFactory.createUser,$scope);
  $scope.userLogin = _.partial(userFactory.userLogin,$scope);

}
