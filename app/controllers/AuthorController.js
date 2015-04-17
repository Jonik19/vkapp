(function () {
  'use strict';

  var AuthorController = function ($scope, VkService, VkCache, $route, ApiService) {
    var self = this;

    var id = $route.current.params.id;
    
    var author = $scope.author = {};
    var congratulations = $scope.congratulations = [];

    self.loadMore = function () {
      VkService.usersGet(id, ['photo_100']).then(function (users) {
        setAuthor(users[0]);
      });

      ApiService.getConsByAuthor(id).then(function (cons) {
        angular.copy(cons, congratulations);
      });
    };

    self.loadMore();


    function setAuthor(user) {
      author.first_name = user.first_name;
      author.last_name = user.last_name;
      author.photo = user.photo_100;
      author.id = user.id;
    }
  };


  angular.module('vkApp')
    .controller('AuthorController', [
      '$scope',
      'VkService',
      'VkCache',
      '$route',
      'ApiService', AuthorController]);
})();