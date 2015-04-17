(function () {
  'use strict';

  var VkService = function ($q, $document, VkCache) {
    var obj = {};

    obj.call = function (name, data) {
      var deffered = $q.defer();

      VK.api(name, data || callBack, callBack);

      return deffered.promise;

      function callBack(response) {
        if(response.error) deffered.reject(response);
        else deffered.resolve(response);
      }
    };

    obj.SDK = {};

    obj.SDK.call = function () {
      var deffered = $q.defer();
      var args = Array.prototype.slice.call(arguments);

      VK.callMethod.apply(VK, args);

      return deffered.promise;

      function callBack(response) {
        if(response.error) deffered.reject(response);
        else deffered.resolve(response);
      }
    };

    obj.SDK.autoScroll = function (w, h) {
        var setts = {
          width: w || $document[0].body.clientWidth,
          height: h || $document.find('#wrapper').height()
        };

        obj.SDK.call('resizeWindow', null, setts.height+100);
    };



    /*
    * @returns promise
    * @param ids string|number
    * @param fields array|undefined
    *
    * Замечание: элементы массива fields должны
    * идти в порядке указанном в документации ВКонтакте (vk.com/dev/fields).
    * Нельзя писать каждый раз в произвольном порядке,
    * иначе кеширования происходить не будет.
    */
    obj.usersGet = function (ids, fields) {
      var deffered = $q.defer();

      var uFields = '' + (fields || []).join(',');
      var userIds = ''+ids+uFields;

      VkCache.users.get(userIds).then(function (users) {
        deffered.resolve(users);
      }, function (put) {
        var data = {
          fields: uFields,
          v: '5.28'
        };

        ids && (data.user_ids = ids); 

        obj.call('users.get', data).then(function (response) {
          put(response.response);
          deffered.resolve(response.response);
        }, function (response) {
          if(response.error) deffered.reject(response);
        });
      });

      console.log(userIds);

      return deffered.promise;
    };

    return obj;
  };


  angular.module('vkApp')
    .factory('VkService', ['$q', '$document', 'VkCache', VkService]);
})();