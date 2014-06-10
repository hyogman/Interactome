'use strict';

describe('Directive: userListItem', function () {

  // load the directive's module
  beforeEach(module('interactomeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<user-list-item></user-list-item>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the userListItem directive');
  }));
});
