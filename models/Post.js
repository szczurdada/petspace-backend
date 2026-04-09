const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const Post = new Schema({
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  postwall: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Postwall",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = model("Post", Post);
