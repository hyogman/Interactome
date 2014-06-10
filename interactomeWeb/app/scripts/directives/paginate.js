'use strict';

angular.module('interactomeApp')
  .directive('paginate', function () {
    return {
      templateUrl: 'scripts/directives/paginate.html',
      restrict: 'E',
      scope: {
        totalItems: '=',
        numPerPage: '=',
        page: '=',
        filtered: '=',
        nonFiltered: '='
      },
      controller: ['$scope', '$timeout', function($scope, $timeout) {
        $scope.paginate = function() {
          // from http://stackoverflow.com/questions/18445590/jquery-animate-stop-scrolling-when-user-scrolls-manually
          // sorry - Nathan on the eve of projects day
          // This was added to avoid a jarring effect when trying to scroll at the start of the page.
          // the timeout is needed to allow an animation in the future to occur without allowing 
          // the 7 or so animation calls that occur... a better solution should be attempted in the future.
          $("body").bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(){
             $("body").unbind("scroll mousedown DOMMouseScroll mousewheel keyup");
             $('body').stop();
             $timeout(function(){$scope.animateAllowed=true;}, 400, true);
          });

          if($scope.animateAllowed) {
            $scope.animateAllowed = false;
            $('body').animate({scrollTop: 0}, 'normal', function(){
                $scope.animateAllowed = true;
                 $("body").unbind("scroll mousedown DOMMouseScroll mousewheel keyup");
             });
          }
          // Setting page to 0 is a hack to get the recs working on page 1.
          if ($scope.page == 0)
              $scope.page = 1;
          var begin = (($scope.page - 1) * $scope.numPerPage);
          var end = begin + $scope.numPerPage;
          $scope.filtered.length = 0;
          $scope.filtered = $scope.nonFiltered.slice(begin, end);
        };

        $scope.$watch('page', $scope.paginate);
        $scope.$watch('numPerPage', $scope.paginate);
      }]
    };
  });
