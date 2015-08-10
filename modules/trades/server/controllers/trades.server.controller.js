'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Trade = mongoose.model('Trade'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a trade
 */
exports.create = function (req, res) {
  var trade = new Trade(req.body);
  trade.user = req.user;

  trade.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(trade);
    }
  });
};

/**
 * Show the current trade
 */
exports.read = function (req, res) {
  res.json(req.trade);
};

/**
 * Update a trade
 */
exports.update = function (req, res) {
  var trade = req.trade;

  trade.title = req.body.title;
  trade.content = req.body.content;

  trade.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(trade);
    }
  });
};

/**
 * Delete an trade
 */
exports.delete = function (req, res) {
  var trade = req.trade;

  trade.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(trade);
    }
  });
};

/**
 * List of trades
 */
exports.list = function (req, res) {
  Trade.find().sort('-created').populate('user', 'displayName').exec(function (err, trades) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(trades);
    }
  });
};

/**
 * trade middleware
 */
exports.tradeByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'trade is invalid'
    });
  }

  Trade.findById(id).populate('user', 'displayName').exec(function (err, trade) {
    if (err) {
      return next(err);
    } else if (!trade) {
      return res.status(404).send({
        message: 'No trade with that identifier has been found'
      });
    }
    req.trade = trade;
    next();
  });
};
