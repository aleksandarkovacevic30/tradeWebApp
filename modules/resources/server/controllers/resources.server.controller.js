'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Resource = mongoose.model('Resource'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a resource
 */
exports.create = function (req, res) {
  var resource = new Resource(req.body);
  resource.user = req.user;

  resource.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(resource);
    }
  });
};

/**
 * Show the current resource
 */
exports.read = function (req, res) {
  res.json(req.resource);
};

/**
 * Update a resource
 */
exports.update = function (req, res) {
  var resource = req.resource;

  resource.title = req.body.title;
  resource.content = req.body.content;

  resource.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(resource);
    }
  });
};

/**
 * Delete an resource
 */
exports.delete = function (req, res) {
  var resource = req.resource;

  resource.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(resource);
    }
  });
};

/**
 * List of Resources
 */
exports.list = function (req, res) {
  Resource.find().sort('-created').populate('user', 'displayName').exec(function (err, resources) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(resources);
    }
  });
};

/**
 * Resource middleware
 */
exports.resourceByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Resource is invalid'
    });
  }

  Resource.findById(id).populate('user', 'displayName').exec(function (err, resource) {
    if (err) {
      return next(err);
    } else if (!resource) {
      return res.status(404).send({
        message: 'No resource with that identifier has been found'
      });
    }
    req.resource = resource;
    next();
  });
};
