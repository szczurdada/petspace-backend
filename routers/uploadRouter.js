const Router = require("express");
const router = new Router();
const upload = require("../middleware/multer");
const cloudinary = require("../utils/cloudinary");

router.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file provided" });
  }

  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "my-app" }, (err, result) =>
          err ? reject(err) : resolve(result),
        )
        .end(req.file.buffer);
    });

    res.status(200).json({
      success: true,
      data: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

module.exports = router;
