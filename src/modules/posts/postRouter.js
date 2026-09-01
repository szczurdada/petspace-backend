const Router = require("express");
const router = new Router();
const { authMiddleware } = require("../../middleware/authMiddleware");
const {
  createPost,
  getPosts,
  getFeed,
  updatePost,
  deletePost,
} = require("./postController");

router.post("/", authMiddleware, createPost);
router.get("/postwall/:postwallId", authMiddleware, getPosts);
router.get("/feed/:username", authMiddleware, getFeed);
router.put("/:postId", authMiddleware, updatePost);
router.delete("/:postId", authMiddleware, deletePost);

module.exports = router;
