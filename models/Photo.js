const { Schema, model } = require("mongoose");

const Photo = new Schema({
  publicId: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    maxLength: 300,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = model("Photo", Photo);
