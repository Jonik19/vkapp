(function () {
  'use strict';

  var GetterController = function ($scope, ApiService, UserService, VkService) {
    var self = this;


    var congratulations = $scope.congratulations = [];

    ApiService.getConsByGetter(UserService.get('id')).then(function (cons) {
      angular.copy(cons || [], congratulations);
    });
    
  };


  angular.module('vkApp')
    .controller('GetterController', [
      '$scope',
      'ApiService',
      'UserService',
      'VkService',
       GetterController]);
})();