'use strict';

angular.module('interactomeApp')
  .controller('SearchCtrl', function($scope, $location, SearchService, AwsService, RecommendationService, MainCache) {
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
            
            $scope.currentPage = 0;
        });
    });
    
    $scope.$watch('filteredResults', function() {
        var tempId;
        for(var i = 0; i < $scope.filteredResults.length; i++) {
            tempId = $scope.filteredResults[i].id;
            if ($scope.fetchedResults[tempId] === undefined) {
                 if (tempId.indexOf('User') > -1) {
                    AwsService.getSingleUser(tempId).then(function(data) {
                        data.type = $scope.USER_TYPE;
                        $scope.fetchedResults[data.Id] = data;
                    });
                } else if (tempId.indexOf('Paper') > -1) {
                    AwsService.getSinglePaper(tempId).then(function(data) {
                        data.type = $scope.PAPER_TYPE;
                        $scope.fetchedResults[data.Id] = data;
                    });
                }
            }
        }
        $scope.moreThanOnePage = $scope.totalItems > $scope.numPerPage;
    });

    $scope.backClick = function(){ $location.search('q', null).path("/"); };

    $scope.getAbstractRecs = function() {
        RecommendationService.getRecs($scope.selectedAbstracts).then(function(reclist) {
            $('body').animate({scrollTop: 0}, 2000, function() { 
                $scope.$apply(function() {
                    MainCache.setRecs($scope.selectedAbstracts, reclist);
                    $location.search('q', null).path("/");
                });
            });
        });
        $scope.gettingAbstractRecs = true;
    };
});
  