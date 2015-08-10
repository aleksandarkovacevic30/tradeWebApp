'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Resource = mongoose.model('Resource'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, resource;

/**
 * Resource routes tests
 */
describe('Resource CRUD tests', function () {
  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'password'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new resource
    user.save(function () {
      resource = {
        title: 'Resource Title',
        content: 'Resource Content'
      };

      done();
    });
  });

  it('should be able to save an resource if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new resource
        agent.post('/api/resources')
          .send(resource)
          .expect(200)
          .end(function (resourceSaveErr, resourceSaveRes) {
            // Handle resource save error
            if (resourceSaveErr) {
              return done(resourceSaveErr);
            }

            // Get a list of resources
            agent.get('/api/resources')
              .end(function (resourcesGetErr, resourcesGetRes) {
                // Handle resource save error
                if (resourcesGetErr) {
                  return done(resourcesGetErr);
                }

                // Get resources list
                var resources = resourcesGetRes.body;

                // Set assertions
                (resources[0].user._id).should.equal(userId);
                (resources[0].title).should.match('Resource Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an resource if not logged in', function (done) {
    agent.post('/api/resources')
      .send(resource)
      .expect(403)
      .end(function (resourceSaveErr, resourceSaveRes) {
        // Call the assertion callback
        done(resourceSaveErr);
      });
  });

  it('should not be able to save an resource if no title is provided', function (done) {
    // Invalidate title field
    resource.title = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new resource
        agent.post('/api/resources')
          .send(resource)
          .expect(400)
          .end(function (resourceSaveErr, resourceSaveRes) {
            // Set message assertion
            (resourceSaveRes.body.message).should.match('Title cannot be blank');

            // Handle resource save error
            done(resourceSaveErr);
          });
      });
  });

  it('should be able to update an resource if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new resource
        agent.post('/api/resources')
          .send(resource)
          .expect(200)
          .end(function (resourceSaveErr, resourceSaveRes) {
            // Handle resource save error
            if (resourceSaveErr) {
              return done(resourceSaveErr);
            }

            // Update resource title
            resource.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing resource
            agent.put('/api/resources/' + resourceSaveRes.body._id)
              .send(resource)
              .expect(200)
              .end(function (resourceUpdateErr, resourceUpdateRes) {
                // Handle resource update error
                if (resourceUpdateErr) {
                  return done(resourceUpdateErr);
                }

                // Set assertions
                (resourceUpdateRes.body._id).should.equal(resourceSaveRes.body._id);
                (resourceUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of resources if not signed in', function (done) {
    // Create new resource model instance
    var resourceObj = new Resource(resource);

    // Save the resource
    resourceObj.save(function () {
      // Request resources
      request(app).get('/api/resources')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single resource if not signed in', function (done) {
    // Create new resource model instance
    var resourceObj = new Resource(resource);

    // Save the resource
    resourceObj.save(function () {
      request(app).get('/api/resources/' + resourceObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', resource.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single resource with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/resources/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Resource is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single resource which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent resource
    request(app).get('/api/resources/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No resource with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an resource if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new resource
        agent.post('/api/resources')
          .send(resource)
          .expect(200)
          .end(function (resourceSaveErr, resourceSaveRes) {
            // Handle resource save error
            if (resourceSaveErr) {
              return done(resourceSaveErr);
            }

            // Delete an existing resource
            agent.delete('/api/resources/' + resourceSaveRes.body._id)
              .send(resource)
              .expect(200)
              .end(function (resourceDeleteErr, resourceDeleteRes) {
                // Handle resource error error
                if (resourceDeleteErr) {
                  return done(resourceDeleteErr);
                }

                // Set assertions
                (resourceDeleteRes.body._id).should.equal(resourceSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an resource if not signed in', function (done) {
    // Set resource user
    resource.user = user;

    // Create new resource model instance
    var resourceObj = new Resource(resource);

    // Save the resource
    resourceObj.save(function () {
      // Try deleting resource
      request(app).delete('/api/resources/' + resourceObj._id)
        .expect(403)
        .end(function (resourceDeleteErr, resourceDeleteRes) {
          // Set message assertion
          (resourceDeleteRes.body.message).should.match('User is not authorized');

          // Handle resource error error
          done(resourceDeleteErr);
        });

    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Resource.remove().exec(done);
    });
  });
});
