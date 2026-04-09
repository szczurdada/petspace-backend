const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const Reposts = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = model("Reposts", Reposts);