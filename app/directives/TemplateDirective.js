angular.module('vkApp')
  .directive('template', ['$templateCache', '$compile', '$http', function ($templateCache, $compile, $http) {
    var rootPath = 'templates/', url;

    return {
      // replace: true,
      
      // templateUrl: function (elem, attrs) {
        
      //   return rootPath + attrs.templateUrl;
      // },
      link: function (scope, element, attrs) {
        var tpl;

        rootPath = attrs.rootPath || rootPath;
        url = rootPath + attrs.templateUrl;

        if(tpl = $templateCache.get(url)) {
          callBack(tpl);
        } else {
          $http.get(url, {cache: true}).then(function (response) {
            $templateCache.put(url, response.data);
            callBack(response.data);
          });
        }



        function callBack(tpl) {
          console.log('some code');
          var fn = $compile(tpl)(scope);


          element.after(fn);
          element.remove();
        }
      }
    }
  }]);