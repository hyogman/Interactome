'use strict';

describe('Service: MainCache', function () {

  // load the service's module
  beforeEach(module('interactomeApp'));

  // instantiate service
  var MainCache;
  beforeEach(inject(function (_MainCache_) {
    MainCache = _MainCache_;
  }));

  it('should do something', function () {
    expect(!!MainCache).toBe(true);
  });

});
