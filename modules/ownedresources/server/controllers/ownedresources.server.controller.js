'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Ownedresource = mongoose.model('Ownedresource'),
  Resource = mongoose.model('Resource'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a ownedresource
 */
exports.create = function (req, res) {
  var ownedresource = new Ownedresource({
    resource: req.body.resource,
    count: req.body.count
  });
  ownedresource.user = req.user;

  ownedresource.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(ownedresource);
    }
  });
};

/**
 * Show the current ownedresource
 */
exports.read = function (req, res) {
  res.json(req.ownedresource);
};

/**
 * Update a ownedresource
 */
exports.update = function (req, res) {
  var ownedresource = req.ownedresource;

  ownedresource.resource = req.body.resource;
  ownedresource.count = req.body.count;

  ownedresource.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(ownedresource);
    }
  });
};

/**
 * Delete an ownedresource
 */
exports.delete = function (req, res) {
  var ownedresource = req.ownedresource;

  ownedresource.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(ownedresource);
    }
  });
};

/**
 * List of ownedresources
 */
exports.list = function (req, res) {
  Ownedresource.find().sort('-created').populate('user', 'username').populate('resource','name').exec(function (err, ownedresources) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(ownedresources);
    }
  });
};

/**
 * ownedresource middleware
 */
exports.ownedresourceByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'ownedresource is invalid'
    });
  }

  Ownedresource.findById(id).populate('user', 'displayName').exec(function (err, ownedresource) {
    if (err) {
      return next(err);
    } else if (!ownedresource) {
      return res.status(404).send({
        message: 'No ownedresource with that identifier has been found'
      });
    }
    req.ownedresource = ownedresource;
    next();
  });
};
