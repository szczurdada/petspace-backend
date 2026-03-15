const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/config");
const { errorResponse } = require("../utils/errors");

const generateAccessToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class authController {
  async signup(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Errors", errors });
      }
      const { name, username, password, email } = req.body;
      const candidateEmail = await User.findOne({ email });
      if (candidateEmail) {
        return res.status(400).json(errorResponse("EMAIL_ALREADY_EXISTS"));
      }
      const candidateUsername = await User.findOne({ username });
      if (candidateUsername) {
        return res.status(400).json(errorResponse("USERNAME_ALREADY_EXISTS"));
      }
      const hashPassword = bcrypt.hashSync(password, 5);
      const user = new User({ name, username, password: hashPassword, email });
      await user.save();
      const token = generateAccessToken(user._id);
      return res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          onboardingCompleted: false,
        },
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration error" });
    }
  }

  async signin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      const validPassword = user
        ? bcrypt.compareSync(password, user.password)
        : false;

      if (!user || !validPassword) {
        return res.status(401).json(errorResponse("INVALID_CREDENTIALS"));
      }

      const token = generateAccessToken(user._id);

      return res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          onboardingCompleted: user.onboardingCompleted,
        },
      });
    } catch (e) {
      console.log(e);
      res.status(500).json(errorResponse("INTERNAL_SERVER_ERROR"));
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      console.log(e);
      res.status(500).json(errorResponse("INTERNAL_SERVER_ERROR"));
    }
  }

  async getUser(req, res) {
    try {
      const { username } = req.params;
      const user = await User.findOne({ username }).select({
        password: 0,
        email: 0,
      }).populate("photos");
      if (!user) {
        return res.status(404).json(errorResponse("USER_NOT_FOUND"));
      }
      res.json(user);
    } catch (e) {
      console.log(e);
      res.status(500).json(errorResponse("INTERNAL_SERVER_ERROR"));
    }
  }

  async registrationsSteps(req, res) {
    try {
      const { bio, gender, birthDate, country, city, breed } = req.body;
      const user = await User.findByIdAndUpdate(
        req.user.id,
        {
          bio,
          gender,
          birthDate,
          country,
          city,
          breed,
        },
        { new: true },
      );
      res.json(user);
    } catch (e) {
      console.log(e);
      res.status(500).json(errorResponse("INTERNAL_SERVER_ERROR"));
    }
  }

  async updateUser(req, res) {
    try {
      const { bio, gender, birthDate, country, city, breed, interests } =
        req.body;
      const update = await User.findOneAndUpdate(
        { _id: req.user.id },
        { bio, gender, birthDate, country, city, breed, interests },
        { new: true },
      );
      res.json(update);
    } catch (e) {
      console.log(e);
      res.status(500).json(errorResponse("INTERNAL_SERVER_ERROR"));
    }
  }
}

module.exports = new authController();
