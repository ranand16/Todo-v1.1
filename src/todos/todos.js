import _ from 'lodash';

export default function($scope, todoFactory){
  let params = {
    createHasInput:false
  };
  todoFactory.getTasks($scope);
  $scope.onCompletedClick = todo => {
    todo.isCompleted = !todo.isCompleted;
  };
  $scope.onEditClick = todo => {
    todo.isEditing = true;
    todo.updatedTask = todo.task;
  };
  $scope.createTask = _.partial(todoFactory.createTask, $scope, params);
  $scope.deleteTask = _.partial(todoFactory.deleteTask, $scope);
  $scope.updateTask = _.partial(todoFactory.updateTask, $scope);
  $scope.$watch('createTaskInput',_.partial(todoFactory.watchCreateTaskInput,params,$scope));
  $scope.onCancelClick = todo => {
    todo.isEditing = false;
  };

}
