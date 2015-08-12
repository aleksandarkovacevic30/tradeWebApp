'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
/**
 * ownedResource Schema
 */
var OwnedresourceSchema = new Schema({
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


//mongoose.model('OwnedResource', OwnedResourceSchema);
mongoose.model('Ownedresource', OwnedresourceSchema);
