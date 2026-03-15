const Router = require("express");
const router = new Router();
const upload = require("../middleware/multer");
const authMiddleware = require("../middleware/middleware");
const { uploadAvatar, uploadPhoto } = require("../controllers/UploadController");

router.post("/upload/avatar", authMiddleware, upload.single("image"), uploadAvatar);
router.post("/upload/photo", authMiddleware, upload.single("image"), uploadPhoto);

module.exports = router;