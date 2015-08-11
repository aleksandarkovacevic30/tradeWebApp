'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Resource Schema
 */
var ResourceSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Resource should have name'
  },
  picture: {
    type: String,
    default: '',
    trim: true   
  }
});

mongoose.model('Resource', ResourceSchema);
