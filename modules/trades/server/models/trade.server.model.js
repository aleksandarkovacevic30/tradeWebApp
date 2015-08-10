'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * trade Schema
 */
var TradeSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  state: {
    type: String,
    default: 'pending',
    trim: true
  },
  ownedResource1: {
    type: Schema.ObjectId,
    ref: 'OwnedResource',
    required: 'Owned Resource cannot be blank'
  },
  ownedResource2: {
    type: Schema.ObjectId,
    ref: 'OwnedResource',
    required: 'Owned Resource cannot be blank'
  },
});

/**
 * ownedResource Schema
 */
var OwnedResourceSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  count: {
    type: Number,
    default: 1
  },
  resource: {
    type: Schema.ObjectId,
    ref: 'Resource',
    required: 'Resource cannot be blank'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: 'User cannot be blank'
  },
});


mongoose.model('OwnedResource', OwnedResourceSchema);
mongoose.model('Trade', TradeSchema);
