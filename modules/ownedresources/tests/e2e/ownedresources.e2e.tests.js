'use strict';

describe('Articles E2E Tests:', function () {
  describe('Test ownedresources page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3000/ownedresources');
      expect(element.all(by.repeater('ownedresource in ownedresources')).count()).toEqual(0);
    });
  });
});
