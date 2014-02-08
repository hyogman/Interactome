'use strict';
angular.module('interactomeApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'interactomeApp.Awsservice',
    'interactomeApp.Userservice',
    'ngRoute'
    //'bootstrap.js'
])

.config(function(AwsserviceProvider) {
    AwsserviceProvider
        .setArn(
            'arn:aws:iam::005837367462:role/newRole');
})


.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});


window.onLoadCallback = function() {
    // When the document is ready
    angular.element(document).ready(function() {
        // Bootstrap the oauth2 library
        gapi.client.load('oauth2', 'v2', function() {
            // Finally, bootstrap our angular app
            angular.bootstrap(document, ['interactomeApp']);
        });
    });
}