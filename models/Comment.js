const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const Comment = new Schema(
  {
    content: { type: String, trim: true, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    photo: { type: mongoose.Schema.Types.ObjectId, ref: "Photo" },
  },
  { toJSON: { virtuals: true }, timestamps: true },
);

module.exports = model("Comment", Comment);
