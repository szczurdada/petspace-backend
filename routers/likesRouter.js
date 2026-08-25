const Router = require("express");
const router = new Router();
const {
  likePost,
  likeComment,
  likePhoto,
} = require("../controllers/likesController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/post/:id", authMiddleware, likePost);
router.post("/comment/:id", authMiddleware, likeComment);
router.post("/photo/:id", authMiddleware, likePhoto);

module.exports = router;