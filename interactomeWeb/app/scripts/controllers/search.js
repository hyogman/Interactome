'use strict';

angular.module('interactomeApp')
  .controller('SearchCtrl', function($scope, $location, SearchService, AwsService) {
    $scope.USER_TYPE = 0;
    $scope.PAPER_TYPE = 1;
    $scope.selectedAbstracts = [];
    $scope.fetchedResults = [];
    
    $scope.query = ($location.search()).q;
    SearchService.getResults($scope.query).then(function(data){
        // We check AwsService in case the user refreshed
        AwsService.credentials().then(function() {
            $scope.response = data;
            $scope.results = $scope.response.response.docs;
            //console.log($scope.results);
            for(var i =0; i < $scope.results.length; i++) {
                if ($scope.results[i].id.indexOf('User') > -1) {
                    console.log("userfound");
                    AwsService.getSingleUser($scope.results[i].id).then(function(data) {
                        data.type = $scope.USER_TYPE;
                        $scope.fetchedResults.push(data);
                    });
                } else if ($scope.results[i].id.indexOf('Paper') > -1) {
                    console.log("paper found");
                    AwsService.getSinglePaper($scope.results[i].id).then(function(data) {
                        data.type = $scope.PAPER_TYPE;
                        $scope.fetchedResults.push(data);
                    });
                }
            }
        });
    });

    $scope.backClick = function(){ $location.search('q', null).path("/"); }
});
  