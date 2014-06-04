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
        $scope.clickMsg = "Show abstracts";
        var papLength = $scope.user.Papers.length;

        $scope.getPapers = function () {
            console.log($scope.user);
            AwsService.getBatchPaper($scope.user.Papers).then(function(data) {
                $scope.user.abstracts = data;
            });
        };

        $scope.click = function(){
            if($scope.showAbstracts) {
                $scope.showAbstracts = false;
                $scope.clickMsg = "Show abstracts";
            } else {
                $scope.showAbstracts = true;
                $scope.clickMsg = "Hide abstracts";
            }
        }

      }],
      link: function postLink($scope, element, attrs) {
        $scope.getPapers();
      }
    };
  });
