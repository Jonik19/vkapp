(function () {
  'use strict';

  var AddController = function ($scope, ApiService) {
    var self = this;

    var con = $scope.con = {};
    var categories = $scope.categories = [];

    ApiService.getCategories().then(function (categoriesRes) {
      angular.copy(categoriesRes, categories);
    });

    self.add = function (categoryId, text) {
      ApiService.addCon({
        categoryId: categoryId,
        text: text
      }).then(function (response) {
        if(response.success) alert('Ваше поздравление будет добавлено после проверки модератором');
        clearCon();
      });
    };

    function clearCon() {
      con.text = '';
      con.categoryId = '';
    }
  };


  angular.module('vkApp')
    .controller('AddController', [
      '$scope',
      'ApiService',
       AddController]);
})();