'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TradeSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  user1: {
    type: Schema.ObjectId,
    required: 'User 1 cannot be blank'
  },
  user2: {
    type: Schema.ObjectId,
    required: 'User 2 cannot be blank'
  },
  resource1: {
    type: Schema.ObjectId,
    required: 'Resoruce 1 cannot be blank'
  },
  resource2: {
    type: Schema.ObjectId,
    required: 'Resoruce 2 cannot be blank'
  }
});
/**
 * trade Schema
 */
/*var TradeSchema = new Schema({
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
*/

mongoose.model('Trade', TradeSchema);
