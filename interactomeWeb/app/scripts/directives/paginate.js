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
      controller: ['$scope', function($scope) {
        $scope.paginate = function() {
          $('body').animate({scrollTop: 0});
          // Setting page to 0 is a hack to get the recs working on page 1.
          if ($scope.page == 0)
              $scope.page = 1;
          var begin = (($scope.page - 1) * $scope.numPerPage);
          var end = begin + $scope.numPerPage;
          $scope.filtered = $scope.nonFiltered.slice(begin, end);
        };

        $scope.$watch('page', $scope.paginate);
        $scope.$watch('numPerPage', $scope.paginate);
      }]
    };
  });
