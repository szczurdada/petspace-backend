const { Schema, model } = require("mongoose");

const Breed = new Schema({
  name: { type: String },
});

module.exports = model("Breed", Breed);
