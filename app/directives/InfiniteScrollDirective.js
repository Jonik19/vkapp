angular.debounce = function (fn, delay) {
  var timeout;

  var injector = angular.injector(['ng']);
  var $timeout = injector.get('$timeout');

  return function () {

    if(timeout !== undefined) {
      $timeout.cancel(timeout);
    }

    timeout = $timeout(function () {
      fn(5);
      delete timeout;

    }, delay);

  };
};

// throttle defination


angular.module('vkApp')
  .directive('infiniteScroll', [function () {
    return {
      restrict: 'A',

      link: function($scope, element, attrs) {
        var raw = element[0];

        element.bind('scroll', angular.debounce(function () {
          console.log('Сработал скролл');
          if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
            $scope.$apply(attrs.infiniteScroll);
          }
        }, 200));
      }
    };
  }]);
