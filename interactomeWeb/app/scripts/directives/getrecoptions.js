'use strict';

angular.module('interactomeApp')
  .directive('getRecOptions', function () {
    return {
      templateUrl: 'scripts/directives/getrecoptions.html',
      restrict: 'E',
      scope: {
        showOptions: '=',
        getRecCallback: '&getRecs',
        selected: '='
      },
      controller: ['$rootScope', '$scope', function($rootScope, $scope) {

        // Controls get-recs cancel button behavior. Let's directives know to become unselected.
        $scope.cancelSelectedAbstracts = function() { 
          //$emit travels upwards so since we are using rootscope (directives have isolated scope)
          //it will not bubble to any other scopes.
          $rootScope.$emit('cancelSelectedAbstracts');
          $scope.selected.length = 0;
        };

      }]
    };
  });
