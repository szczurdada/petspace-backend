const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CountrySchema = new Schema({
  country: { type: String },
  cities: [{ type: String }],
});

module.exports = model("Country", CountrySchema);
