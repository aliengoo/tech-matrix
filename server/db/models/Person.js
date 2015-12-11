var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var promisePlugin = require('./promisePlugin');
var nameListPlugin = require('./namesListPlugin');

var personSchema = new Schema({
  name: {
    type: String,
    index: {unique: true}
  },
  notes: {
    type: String
  },
  tags: {
    type: Array
  },
  updated: {
    type: Date,
    required: true,
    default: Date.now
  }
});

// text indexes
personSchema.index({
  name: 'text',
  notes: 'text',
  tags: 'text'
}, {
  name: 'Person text index',
  weights: {
    name: 10, notes: 4, tags: 1
  }
});

personSchema.plugin(promisePlugin);
personSchema.plugin(nameListPlugin);

module.exports = mongoose.model('Person', personSchema);
