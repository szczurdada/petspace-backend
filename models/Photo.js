const { Schema, model } = require("mongoose");

const Photo = new Schema(
  {
    publicId: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      maxLength: 300,
      default: null,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { toJSON: { virtuals: true }, timestamps: true },
);

module.exports = model("Photo", Photo);
