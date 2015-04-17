(function () {
  'use strict';

  angular.module('vkApp', ['ngRoute']);

  var config = function ($routeProvider, $httpProvider) {
      $routeProvider
        .when('/my/get', {
          controller: 'GetterController',
          controllerAs: 'getterCtrl',
          templateUrl: 'templates/GetterPage.html'
        })
        .when('/my/send', {
          controller: 'SenderController',
          controllerAs: 'senderCtrl',
          templateUrl: 'templates/SenderPage.html'
        })
        .when('/category/:id', {
          controller: 'CategoryController',
          controllerAs: 'categoryCtrl',
          templateUrl: 'templates/CategoryPage.html'
        })
        .when('/author/:id', {
          controller: 'AuthorController',
          controllerAs: 'authorCtrl',
          templateUrl: 'templates/AuthorPage.html'
        })
        .when('/send/:id', {
          controller: 'SendController',
          controllerAs: 'sendCtrl',
          templateUrl: 'templates/SendPage.html'
        })
        .when('/add', {
          controller: 'AddController',
          controllerAs: 'addCtrl',
          templateUrl: 'templates/AddPage.html'
        })
        .when('/top', {
          controller: 'TopController',
          controllerAs: 'topCtrl',
          templateUrl: 'templates/TopPage.html'
        })
        .otherwise({
          redirectTo: '/my/get'
        });

      $httpProvider.interceptors.push(function () {
        return {
          request: function (config) {
            return config;
          }, 
          response: function (response) {
            return response;
          }
        }
      });
  };

  var run = function ($rootScope, $location, UserService, VkService) {

    VkService.usersGet().then(function (users) {
      UserService.set(users[0]);
    });

    $rootScope.user = UserService.get();

    $rootScope.$on('$routeChangeStart', function (event, next, prev) {
      $rootScope.previusUrl = $rootScope.currentUrl || "/";
      $rootScope.currentUrl = $location.url();

      VkService.SDK.autoScroll(null, 600);
    });

    $rootScope.autoScroll = VkService.SDK.autoScroll;

    };

  angular.module('vkApp')
    .config(['$routeProvider', '$httpProvider', config]);

  angular.module('vkApp')
    .run(['$rootScope', '$location', 'UserService', 'VkService', run]);

})();