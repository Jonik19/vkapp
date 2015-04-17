(function () {
  'use strict';

  var MenuController = function ($scope, ApiService, $route) {
    var self = this;
    var categories = $scope.categories = [];


    ApiService.getCategories().then(function (categoriesRes) {
      angular.copy(categoriesRes, categories);
    });
  };


  angular.module('vkApp')
    .controller('MenuController', [
      '$scope',
      'ApiService',
      '$route', MenuController]);
})();