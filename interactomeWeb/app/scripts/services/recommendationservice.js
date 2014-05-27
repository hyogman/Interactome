'use strict';
/*
 Sends abstractList to Django server. Future rec computations done out of intermediary Django layer. Results then returned back to web app. 
*/
angular.module('interactomeApp.RecommendationService', [])

.factory('RecommendationService', function RecommendationService($q, $http) {
    var service = {
        // getRecs:
        //   @abstractList: should be a list of the dynamo Id's
        //   Returns: a promise which will resolve to an array of hashes that have paper data from dynamo.
        getRecs: function(abstractList) {
            var defered = $q.defer();

            //'http://54.201.190.162:8000/recs/'
            //'http://127.0.0.1:8000/recs/'

            // Send and recieve data to Django, POST request
            $http({
                method: 'POST',
                url: 'http://ec2-54-201-190-162.us-west-2.compute.amazonaws.com:8000/recs/',
                data: {
                    'list': abstractList,
                    'numAbstracts': abstractList.length
                }
            }).
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                window.alert("success");
                defered.resolve(data);


            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                window.alert("fail");
                console.log(data);
            });

            return defered.promise;

        },

    };

    return service;
});