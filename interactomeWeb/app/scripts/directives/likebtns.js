'use strict';

// This directive is used to add a like and dislike button to a dom.
// For future use, an SNS topic should be passed to it or more logic should be added
//  to AWS service to handle it.

// For example on use, see main.html. This is transcluded into abstractlistgroupitem.
angular.module('interactomeApp').directive('likeBtns', function () {
    return {
        templateUrl: 'scripts/directives/likebtns.html',
        restrict: 'E',
        scope: { 
            id: '@',
            likeStatus: '='
        },
        controller: ['$scope', 'AwsService', 'UserService', function($scope, AwsService, UserService) {
            $scope.likeClick = function() {
                if($scope.likeStatus != true) { // will be undefined on first click which is ok
                  //AwsService.postMessageToSNS('arn:aws:sns:us-west-2:005837367462:abstracts_liked', $scope.paper.Id);
                  $scope.likeStatus = true; // true == liked
                  AwsService.updateDynamoPref($scope.id, $scope.likeStatus, UserService.currentUsername());
                }
            };

            $scope.dislikeClick = function() {
                if($scope.likeStatus != false) { // will be undefined on first click which is ok
                  //AwsService.postMessageToSNS('arn:aws:sns:us-west-2:005837367462:abstracts_disliked', $scope.paper.Id);
                  $scope.likeStatus = false; // false == disliked
                  AwsService.updateDynamoPref($scope.id, $scope.likeStatus, UserService.currentUsername());
                }
            };
        }]
    };
  });
