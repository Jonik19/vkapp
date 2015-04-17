(function () {
  'use strict';

  var TopController = function ($scope, ApiService, VkCache, VkService) {
    var self = this;

    var topUsers = $scope.topUsers = [];
    var topIds = [];

    ApiService.getTop().then(function (users) {
      VkCache.users.get('topUsers').then(function (ids) {
        callBack(users, ids);
      }, function (put) {
        var ids = [].slice.call(users).map(function (user) {
          return user.author;
        });

        put(ids);
        callBack(users, ids);
      });



      function callBack(tops, ids) {
        VkService.usersGet(ids, ['photo_50']).then(function (users) {
          for(var i=0, l=users.length; i < l; i++) {
            topUsers.push({
              rating: tops[i].rating,
              vkOpts: users[i]
            });
          }

          console.log(topUsers);
        });
      }
    }, function (response) {
      alert('Произошла ошибка: '+response.error);
    });
  };


  angular.module('vkApp')
    .controller('TopController', [
      '$scope',
      'ApiService',
      'VkCache',
      'VkService',

       TopController]);
})();