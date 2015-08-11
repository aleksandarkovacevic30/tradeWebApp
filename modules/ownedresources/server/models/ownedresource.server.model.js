'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var OwnedresourceSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * ownedResource Schema
 */
/*var OwnedResourceSchema = new Schema({
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
});*/


//mongoose.model('OwnedResource', OwnedResourceSchema);
mongoose.model('Ownedresource', OwnedresourceSchema);
