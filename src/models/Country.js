const { Schema, model } = require("mongoose");

const Country = new Schema({
  country: { type: String, required: true, unique: true },
  cities: [{ type: String }],
});

module.exports = model("Country", Country);
