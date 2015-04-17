(function () {
  'use strict';

  var UserPopUpDirective = function (VkService, VkCache) {
    
    return {
      restrict: 'A',

      link: function (scope, elem, attrs) {
        elem.bind('mouseover', function (e) {
          showPopUp(attrs.userPopUp);
        });
      }
    };

    function showPopUp(userId) {
      var user;

      VkService.usersGet(userId).then(function (users) {
        callBack(users[0]);
      });

      function callBack(user) {
        alert(user.first_name+' '+user.last_name);
        // Показать popup
      }
    }

  };


  angular.module('vkApp')
    .directive('userPopUp', [
      'VkService',
      'VkCache', UserPopUpDirective]);
})();