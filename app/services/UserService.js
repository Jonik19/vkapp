(function () {
  'use strict';

  var UserService = function ($q) {
    var obj = {};
    var user = {};

    obj.get = function (key) {
      return (key) ? user[key] : user;
    };

    obj.set = function (options) {
      var key;

      for(key in options) {
        user[key] = options[key];
      }

      return user;
    };

    return obj;
  };


  angular.module('vkApp')
    .factory('UserService', ['$q', UserService]);
})();