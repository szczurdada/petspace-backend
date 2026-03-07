const { Schema, model, mongoose } = require("mongoose");

const Postwall = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
});

module.exports = model("Postwall", Postwall);
