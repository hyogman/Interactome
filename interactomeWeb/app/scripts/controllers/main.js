'use strict';
/**
    This is the main controller of the application. This controller should have logic for the main (always running?) parts of the website.
**/
var app = angular.module('interactomeApp')


// This controller deals with google sign on top of page 
app.controller('TopCtrl', function($scope, UserService, AwsService, SearchService) {

    $scope.signedIn = function(oauth) {
        // Google authentication passed into userService to hold onto and track user.
        UserService.setCurrentUser(oauth)
            .then(function(user) {
                $scope.user = user;
            });
    };
});


app.controller('MainCtrl', function($scope, UserService, AwsService, SearchService) {

    $scope.abstractTargets = [];
    $scope.absRecd = null;
    // This function sets the user authentication from googleSignin directive. 
    /* 
    $scope.signedIn = function(oauth) {
        // Google authentication passed into userService to hold onto and track user.
        UserService.setCurrentUser(oauth)
            .then(function(user) {
                $scope.user = user;
            });
    };
    */
    // Determines what happens after one or more abstract is selected
    $scope.abstractsRec = function() {
        var abstractsChecked = ''
        var absCount = 0;
        $("input:checked").each(function() {
            abstractsChecked += $(this).val() + ",";
            $(this).click(); // uncheck it
            absCount++;
        });
        if (abstractsChecked != '') {
            abstractsChecked = abstractsChecked.slice(0, -1) // Remove last comma
            AwsService.postMessageToSNS('arn:aws:sns:us-west-2:005837367462:abstracts_req', abstractsChecked);
            $scope.absRecd = "Number of abstracts used to get recommendations: " + absCount; // this is just to show off functionality
        }
    };
    // Listen for broadcasts of s3 event
    var cleanupS3 = $rootScope.$on(AwsService.s3Broadcast, function() {
        var targets = AwsService.getLoadedS3Filenames();
        $scope.$apply(function() {
            $scope.abstractTargets.length = 0; //clears array without removing the array's refference (needed for binding)
            $scope.abstractTargets.push.apply($scope.abstractTargets, targets); // adding more than once requires an apply (not sure why)
        });
    });
    //Unsubscribe to S3 (from http://stackoverflow.com/questions/18856341/how-can-i-unregister-a-broadcast-event-to-rootscope-in-angularjs)
    $scope.$on("$destroy", function() {
        cleanupS3();
    });

});

app.controller('SearchCtrl', function($scope, UserService, AwsService, SearchService) {


    var institution = [];
    institution = $scope.institution;
    $scope.institution = SearchService.showResults(institution);

});