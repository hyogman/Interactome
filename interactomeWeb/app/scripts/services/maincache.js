'use strict';

// Simple way to keep state for mainctrl. Used when changing from main to search and back.
// If this factory needs to hold more complex data, it should be refactored to use $cacheFactory.
angular.module('interactomeApp').factory('MainCache', function () {
  var _stateHolder = {};

  return {
    get: function () {
      return _stateHolder;
    },
    set: function(state) {
      _stateHolder = state;
    },

    // Overwrites other data with the new papers and what the recs are based on
    // source: where the recs are coming from (E.G., what papers were selected)
    // papers: recs from source.
    setRecs: function (source, recPapers) {
      _stateHolder = {recOriginAbstracts: source, papers: recPapers};
    }
  };
});
