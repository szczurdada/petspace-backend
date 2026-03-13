const Router = require("express");
const router = new Router();
const upload = require("../middleware/multer");

router.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "Error" });
    }

    res.status(200).json({
        success: true,
        message: "Uploaded!",
        data: {
            url: req.file.path,
            public_id: req.file.filename,
        },
    });
});

module.exports = router;