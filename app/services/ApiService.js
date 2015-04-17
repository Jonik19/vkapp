(function () {
  'use strict';

  var ApiService = function ($http, $q) {
    var obj = {};

    obj.sendCon = function (data) {
      var deferred = $q.defer();

      if(!data.fromId || !data.toId || !data.conId) {
        deferred.reject({error: 'Неправильные даные'});
        return deferred.promise;
      }

      var dataObj = {
        fromId: data.fromId,
        toId: data.toId,
        conId: data.conId
      };

      $http.post('/api/sends/create', dataObj).then(function (response) {
        if(!response.data || response.data.error) deferred.reject(response.data);

        if(response.data && response.data.success) deferred.resolve(response.data);
      }, function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    };

    obj.addCon = function (data) {
      var deferred = $q.defer();

      if(!data.text || !data.categoryId) {
        deferred.reject({error: 'Неправильные даные'});
        return deferred.promise;
      }

      var dataObj = {
        text: data.text,
        categoryId: data.categoryId
      };

      $http.post('/api/cons/create', dataObj).then(function (response) {
        if(!response.data || response.data.error) deferred.reject(response.data);

        deferred.resolve(response.data);
      }, function (response) {
        deferred.reject(response && response.data);
      });

      return deferred.promise;
    };

    obj.getCategories = function () {
      var deferred = $q.defer();

      $http.get('/api/categories', {cache: true}).then(function (response) {
        deferred.resolve(response.data);
      }, function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    };

    obj.getTop = function () {
      var deferred = $q.defer();

      $http.get('/api/top', {cache: true}).then(function (response) {
        if(!response.data || response.data.error) deferred.reject(response.data);
        
        deferred.resolve(response.data);
      }, function (response) {
        deferred.reject(response && response.data);
      });

      return deferred.promise;
    };

    obj.getConsByAuthor = function (authorId) {
      var deferred = $q.defer();

      if(!authorId) {
        deferred.reject({error: 'Неправильное id автора'});
        return deferred.promise;
      }

      $http.get('/api/cons/byauthor/'+authorId, {cache: true}).then(function (response) {
        if(!response.data || response.data.error) deferred.reject(response.data);
        
        deferred.resolve(response.data);
      }, function (response) {
        deferred.reject(response && response.data);
      });

      return deferred.promise;
    };

    obj.getConsByGetter = function (getterId) {
      var deferred = $q.defer();

      if(!getterId) {
        deferred.reject({error: 'Неправильное id автора'});
        return deferred.promise;
      }

      $http.get('/api/my/get/'+getterId, {cache: true}).then(function (response) {
        if(!response.data || response.data.error) deferred.reject(response.data);
        
        deferred.resolve(response.data);
      }, function (response) {
        deferred.reject(response && response.data);
      });

      return deferred.promise;
    };

    obj.getConsBySender = function (senderId) {
      var deferred = $q.defer();

      if(!senderId) {
        deferred.reject({error: 'Неправильное id автора'});
        return deferred.promise;
      }

      $http.get('/api/my/send/'+senderId, {cache: true}).then(function (response) {
        if(!response.data || response.data.error) deferred.reject(response.data);
        
        deferred.resolve(response.data);
      }, function (response) {
        deferred.reject(response && response.data);
      });

      return deferred.promise;
    };



    return obj;
  };


  angular.module('vkApp')
    .factory('ApiService', [
      '$http',
      '$q', ApiService]);
})();