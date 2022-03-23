const mongoose = require("mongoose");

const Box = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  theme: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  dimensions: {
    type: String,
  },
  location: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("box", Box);
