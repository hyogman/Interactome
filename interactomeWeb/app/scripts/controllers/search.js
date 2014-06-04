'use strict';

angular.module('interactomeApp')
  .controller('SearchCtrl', function($scope, $location, SearchService, AwsService) {
    $scope.selectedAbstracts = [];
    $scope.fetchedResults = [];
    $scope.paper = {
        Authors: ["User48044"],
        Id: "Paper16562",
        Link: "http://sagebionetworks-interactome-abstracts.s3-us-west-2.amazonaws.com/Abstract16562.json",
        Title: "Identification of lung cancer biomarkers using lung cancer in female never smokers",
        authorData: "Yun Park"
    };

    
    $scope.query = ($location.search()).search;
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
                        $scope.fetchedResults.push(data);
                    });
                } else if ($scope.results[i].id.indexOf('Paper') > -1) {
                    console.log("paper found");
                    AwsService.getSinglePaper($scope.results[i].id).then(function(data) {
                        console.log("applying");
                        console.log(data);
                        $scope.fetchedResults.push(data);
                    });
                }
            }
            
        });
    });

    $scope.backClick = function(){ console.log($scope.fetchedResults);}//$location.path("/"); }
});
  