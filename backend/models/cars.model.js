// require the mongoose package
const mongoose = require('mongoose');

// create a schema
const Schema = mongoose.Schema;

// create a car schema
const carSchema = new Schema(
  {
    make: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    registration: {
      type: String,
      required: true
    },
    owner: {
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true
    }
  },
  // I am going to create a timestamp on my schema so that I know when the object was created/ updated
  { timestamps: true }
);

// create a model
module.exports = mongoose.model('Cars', carSchema);
