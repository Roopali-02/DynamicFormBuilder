const mongoose = require('mongoose');
const {Schema } = require('mongoose');

const finalFormSchema = new Schema({
  data: {
    type: Map,
    of: Schema.Types.Mixed, // Allows any type of value (string, number, etc.)
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
})

const finalForm = mongoose.model('finalForm', finalFormSchema);
module.exports = finalForm;