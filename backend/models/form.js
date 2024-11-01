const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  }
});

const formSchema = new mongoose.Schema({
  label:{
    type:String,
    required:true
  },
  type: {
    type: String,
    required: true
  },
  NoOfOptions:{
    type: Number,
    required: function () {
      return this.type === 'dropdown';
    },
    default: null
  },
  required:{
    type: Boolean,
    required: true
  },
  options:{
    type: [optionSchema],
    required: function () {
      return this.type === 'dropdown';
    },
    default: []
  }
})

const NewForm = mongoose.model('NewForm', formSchema);

module.exports = NewForm;