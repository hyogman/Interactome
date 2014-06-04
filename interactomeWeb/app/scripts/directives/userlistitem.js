'use strict';

angular.module('interactomeApp')
  .directive('userListItem', function () {
    return {
      templateUrl: 'scripts/directives/userlistitem.html',
      restrict: 'E',
      scope: {
        user: '=',
        selectedAbstracts: '='
      },
      controller: ['$scope', 'AwsService', function($scope, AwsService) {
        $scope.showAbstracts = false;
        $scope.getPapers = function () {
            console.log($scope.user);
            AwsService.getBatchPaper($scope.user.Papers).then(function(data) {
                $scope.user.abstracts = data;
            });
        };

      }],
      link: function postLink($scope, element, attrs) {
        $scope.getPapers();
      }
    };
  });
