const { model, Schema } = require('mongoose');

const sch = new Schema({
  Guild: String,
  Array: Array,
})

module.exports = model('custmsg', sch)