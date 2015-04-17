(function () {
  'use strict';

  var SendController = function ($scope, $rootScope, $location, VkService, ApiService, VkCache, $route, $http, UserService) {
    var self = this;

    var id = $route.current.params.id;

    var friends = $scope.friends = [];
    var sendFriends = $scope.sendFriends = [];
    var con = $scope.con = {};

    var backUrl = false;

    $scope.localUser = {
      uid: UserService.get('id'),
      user_id: UserService.get('id'),
      first_name: 'Себе',
      last_name: '',
      selected: false
    };

    $http.get('/api/cons/'+id, {cache: true}).then(function (response) {
      fillCon(response.data);
    });

    VkCache.users.get('friendList').then(function (users) {
      angular.copy(users, friends);
    }, function (put) {

      // better use execute method with @filter, "can_post" field. Хранимые процедуры (ВК)
      VkService.call('friends.get', {
        user_id: UserService.get('id'),
        fields: 'first_name,last_name'
      }).then(function (response) {
        put(response.response);

        angular.copy(response.response, friends);
      });
    });
    
    self.send = function (text) {

      text += '\n\n[js_questions|Поздравления на стену]: http://vk.com/app4826667';

      if(!sendFriends.length) {
        alert('Выберите кому отправлять');
        return false;
      };

      (function after() {

        var owner_id = sendFriends[0].uid;
        sendFriends.splice(0, 1);

        VkService.call('wall.post', {
          owner_id: owner_id,
          message: text,
          attachments: ''
        }).then(function (response) {
          if(sendFriends.length) {
            after();
          }

          //request to server

          ApiService.sendCon({
            fromId: UserService.get('id'),
            toId: owner_id,
            conId: id
          }).then(function (response) {
            
          }, function (response) {
            alert(response.error);
          });

          toBackUrl();
        }, function (response) {
          if(sendFriends.length) {
            after();
          }

          toBackUrl();
        });
      })();


    };

    self.addSendFriend = function (friend) {
      var index = sendFriends.indexOf(friend);

      if(index == -1) {
        sendFriends.push(friend);
      } else {
        friend.selected = false;
        sendFriends.splice(index, 1);
      }

    };

    function fillCon(con) {
      angular.copy(con, $scope.con);
    }

    function toBackUrl() {
      if(!backUrl) {
        $location.url($rootScope.previusUrl);
        backUrl = true;
      }
    }

  };


  angular.module('vkApp')
    .controller('SendController', [
      '$scope',
      '$rootScope',
      '$location',
      'VkService',
      'ApiService',
      'VkCache',
      '$route',
      '$http',
      'UserService', SendController]);
})();