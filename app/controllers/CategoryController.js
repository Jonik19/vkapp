(function () {
  'use strict';

  var CategoryController = function ($scope, VkService, UserService, VkCache, $http, $route) {
    var self = this;
    var catId = $route.current.params.id;

    var itemsPerPage = 9, currentPage = 1;

    var category = $scope.category = {};
    var congratulations = $scope.congratulations = [];



    self.loadMore = function () {
      console.log('load more', arguments);

      $http.get('/api/category/'+catId+'/'+currentPage, {cache: true}).then(function (response) {
        if(!category.count) getCategoryDesc(response);

        [].push.apply(congratulations, response.data.congratulations);
      });

      currentPage++;
    };

    self.myFun = function () {
      alert(arguments);
    };

    // Нужно чтобы вызывался только здесь, а не через DOM

    self.loadMore();


    function getCategoryDesc(response) {
      category.name = response.data.name;
      category.count = response.data.count;

      category.pagesCount = Math.ceil(category.count/itemsPerPage);
    }
  };


  angular.module('vkApp')
    .controller('CategoryController', [
      '$scope',
      'VkService',
      'UserService',
      'VkCache',
      '$http',
      '$route', CategoryController]);
})();