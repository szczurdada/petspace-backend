const Postwall = require("../models/Postwall");
const User = require("../models/User");
const { errorResponse } = require("../utils/errors");

const getPostwall = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json(errorResponse("USER_NOT_FOUND"));
    }
    const postwall = await Postwall.findOne({ user: user._id });
    res.json(postwall);
  } catch (e) {
    res.status(500).json(errorResponse("INTERNAL_SERVER_ERROR"));
  }
};

module.exports = { getPostwall };
