const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const Comments = {
  content: { type: String, trim: true },
  timestamp: {
    type: Date,
    default: Date.now,
  },
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
};

module.exports = model("Comments", Comments);
