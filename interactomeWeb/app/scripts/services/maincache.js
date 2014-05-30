'use strict';

// Simple way to keep state for mainctrl. Used when changing from main to search and back.
// If this factory needs to hold more complex data, it should be refactored to use $cacheFactory.
angular.module('interactomeApp').factory('MainCache', function () {
  var _stateHolder = null;

  return {
    get: function () {
      return _stateHolder;
    },
    set: function(state) {
      _stateHolder = state;
    }
  };
});
