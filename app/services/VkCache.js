(function () {
  'use strict';

  var VkCache = function ($q, $cacheFactory) {
    var obj = {};

    // cacheFactory with promises
    var promiseCF = function (id) {
      var cache = $cacheFactory(id);

      return {
        get: function (name) {
          var deffered = $q.defer(),
            result;

          if(result = cache.get(name)) {
            deffered.resolve(result);
          } else {
            deffered.reject(put(name));
          }

          return deffered.promise;
        }

      };

      function put(name) {
        return function (data) {
          cache.put(name, data);
        }
      }
    };

    // obj.users = $cacheFactory('vkUsers');
    obj.users = promiseCF('vkUsers');
    obj.cons = promiseCF('vkCons');

    return obj;
  };


  angular.module('vkApp')
    .factory('VkCache', ['$q', '$cacheFactory', VkCache]);
})();