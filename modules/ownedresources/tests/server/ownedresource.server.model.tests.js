'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Ownedresource = mongoose.model('Ownedresource');

/**
 * Globals
 */
var user, ownedresource;

/**
 * Unit tests
 */
describe('Ownedresource Model Unit Tests:', function () {
  beforeEach(function (done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function () {
      ownedresource = new Ownedresource({
        title: 'Ownedresource Title',
        content: 'Ownedresource Content',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      return ownedresource.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without title', function (done) {
      ownedresource.title = '';

      return ownedresource.save(function (err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function (done) {
    Ownedresource.remove().exec(function () {
      User.remove().exec(done);
    });
  });
});
