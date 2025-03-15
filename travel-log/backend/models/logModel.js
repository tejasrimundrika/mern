const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Log", logSchema);
