angular.module('vkApp')
  .directive('pagination', ['$templateCache', '$compile', '$http', function ($templateCache, $compile, $http) {


    return {
      restrict: 'E',
      templateUrl: 'parts/pagination.html',

      scope: {
        onChange: '=',
        pagesCount: '=',
        currentPage: '='
      },

      link: function ($scope, element, attrs) {

        $scope.previusPage = function () {
          if($scope.currentPage > 1) {
            $scope.currentPage--;
            
            $scope.onChange($scope.currentPage);
          }
        };

        $scope.nextPage = function () {
          if($scope.currentPage < $scope.pagesCount) {
            $scope.currentPage++;

            $scope.onChange($scope.currentPage);
          }
        };

        // $scope.$watch('currentPage', function (newVal, oldVal, scope) {
        //   if(oldVal !== undefined) {
        //    scope.onChange(scope.currentPage);
        //   }
        // });

      }
    };
  }]);