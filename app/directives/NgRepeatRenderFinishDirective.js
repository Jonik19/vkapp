angular.module('vkApp')
  .directive('ngRepeatRenderFinish', [function () {


    return {
      restrict: 'A',

      link: function ($scope, element, attrs) {
        if($scope.$last) {
          console.log('render-finish');
          $scope.$evalAsync(attrs.ngRepeatRenderFinish);
        }
      }
    };
  }]);