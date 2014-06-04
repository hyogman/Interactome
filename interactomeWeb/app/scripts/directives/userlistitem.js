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
        var papLength = $scope.user.Papers.length;
        $scope.SHOW_ABSTRACTS_MSG = (papLength > 1)? "Click to show " + papLength + " abstracts by this author" : "Click to show the abstract by this author";
        $scope.HIDE_ABSTRACTS_MSG = (papLength > 1)? "Click to hide " + papLength + " abstracts by this author" : "Click to hide the abstract by this author";
        $scope.clickMsg = $scope.SHOW_ABSTRACTS_MSG;

        $scope.getPapers = function () {
            console.log($scope.user);
            AwsService.getBatchPaper($scope.user.Papers).then(function(data) {
                $scope.user.abstracts = data;
            });
        };

        $scope.click = function(){
            if($scope.showAbstracts) {
                $scope.showAbstracts = false;
                $scope.clickMsg = $scope.SHOW_ABSTRACTS_MSG;
            } else {
                $scope.showAbstracts = true;
                $scope.clickMsg = $scope.HIDE_ABSTRACTS_MSG;
            }
        }

      }],
      link: function postLink($scope, element, attrs) {
        $scope.getPapers();
      }
    };
  });
