(function () {
  'use strict';

  var SenderController = function ($scope, ApiService, UserService, VkService) {
    var self = this;

    var congratulations = $scope.congratulations = [];

    ApiService.getConsBySender(UserService.get('id')).then(function (cons) {
      angular.copy(cons || [], congratulations);
    });
    
  };


  angular.module('vkApp')
    .controller('SenderController', [
      '$scope',
      'ApiService',
      'UserService',
      'VkService',
       SenderController]);
})();