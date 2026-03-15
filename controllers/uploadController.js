const cloudinary = require("../utils/cloudinary");
const User = require("../models/User");
const Photo = require("../models/Photo");
const { errorResponse } = require("../utils/errors");

const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      })
      .end(buffer);
  });
};

const uploadAvatar = async (req, res) => {
  try {
    const result = await uploadToCloudinary(req.file.buffer, "my-app/avatars");
    await User.findByIdAndUpdate(req.user.id, { avatar: result.public_id });
    res.status(200).json({
      data: { url: result.secure_url, public_id: result.public_id },
    });
  } catch (err) {
    res.status(500).json(errorResponse("UPLOAD_FAILED"));
  }
};

const uploadPhoto = async (req, res) => {
  try {
    const result = await uploadToCloudinary(req.file.buffer, "my-app/photos");
    const photo = await Photo.create({
      publicId: result.public_id,
      user: req.user.id,
    });
    await User.findByIdAndUpdate(req.user.id, { $push: { photos: photo._id } });
    res.status(200).json({
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        _id: photo._id,
      },
    });
  } catch (err) {
    res.status(500).json(errorResponse("UPLOAD_FAILED"));
  }
};

module.exports = { uploadAvatar, uploadPhoto };
