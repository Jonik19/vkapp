(function () {
  'use strict';

  var MyController = function ($scope, ApiService, UserService, type, VkService) {
    var self = this;

    var congratulations = $scope.congratulations = [];

    if(type === 2) {
      $scope.title = 'Отправленные поздравления';

      ApiService.getConsBySender(UserService.get('id')).then(function (cons) {
        angular.copy(cons || [], congratulations);
      });
    } else if(type === 1) {
      $scope.title = 'Полученные поздравления';

      
      ApiService.getConsByGetter(UserService.get('id')).then(function (cons) {
        angular.copy(cons || [], congratulations);
      });
    }

    
    
  };


  angular.module('vkApp')
    .controller('MyController', [
      '$scope',
      'ApiService',
      'UserService',
      'type',
      'VkService',
       MyController]);
})();