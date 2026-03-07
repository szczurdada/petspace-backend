const { Schema, model, mongoose } = require("mongoose");

const User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: 3,
  },
  name: { type: String, required: true, trim: true },
  password: { type: String, required: true, minlength: 8 },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  avatar: { type: String, default: null },
  bio: { type: String, default: null },
  gender: { type: String, default: null },
  birthDate: { type: Date, default: null },
  country: { type: String, default: null },
  city: { type: String, default: null },
  breed: { type: String, default: null },
  onboardingCompleted: { type: Boolean, default: false },
});

module.exports = model("User", User);
