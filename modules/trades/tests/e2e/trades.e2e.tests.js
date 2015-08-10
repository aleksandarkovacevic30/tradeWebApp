'use strict';

describe('Articles E2E Tests:', function () {
  describe('Test trades page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3000/trades');
      expect(element.all(by.repeater('trade in trades')).count()).toEqual(0);
    });
  });
});
