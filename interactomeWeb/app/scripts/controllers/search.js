'use strict';

angular.module('interactomeApp')
  .controller('SearchCtrl', function($scope, $location, SearchService, AwsService) {
    $scope.results = [];
    $scope.USER_TYPE = 0;
    $scope.PAPER_TYPE = 1;
    $scope.selectedAbstracts = [];
    $scope.fetchedResults = {};
    $scope.gettingAbstractRecs = false;

    //pagination vars
    $scope.filteredResults = [];
    $scope.currentPage = 1;
    $scope.totalItems = 0;
    $scope.numPerPage = 10;

    $scope.query = ($location.search()).q;
    SearchService.getResults($scope.query).then(function(data){
        // We check AwsService in case the user refreshed
        AwsService.credentials().then(function() {
            $scope.response = data;
            $scope.results = $scope.response.response.docs;
            $scope.totalItems = $scope.results.length;
            $scope.moreThanOnePage = $scope.totalItems > $scope.numPerPage;
            $scope.currentPage = 0;

            for(var i =0; i < $scope.results.length; i++) {
                if ($scope.results[i].id.indexOf('User') > -1) {
                    console.log("userfound");
                    AwsService.getSingleUser($scope.results[i].id).then(function(data) {
                        data.type = $scope.USER_TYPE;
                        $scope.fetchedResults[data.Id] = data;
                    });
                } else if ($scope.results[i].id.indexOf('Paper') > -1) {
                    console.log("paper found");
                    AwsService.getSinglePaper($scope.results[i].id).then(function(data) {
                        data.type = $scope.PAPER_TYPE;
                        $scope.fetchedResults[data.Id] = data;
                    });
                }
            }
        });
    });

    $scope.backClick = function(){ $location.search('q', null).path("/"); };

    $scope.getAbstractRecs = function(){
        console.log($scope.selectedAbstracts);
        //do animation here
    };
});
  