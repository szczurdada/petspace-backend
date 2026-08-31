const Router = require("express");
const router = new Router();
const { authMiddleware } = require("../../middleware/authMiddleware");
const postController = require("./postController");

router.post("/", authMiddleware, postController.createPost);
router.get("/postwall/:postwallId", authMiddleware, postController.getPosts);
router.get("/feed/:username", authMiddleware, postController.getFeed);
router.put("/:postId", authMiddleware, postController.updatePost);
router.delete("/:postId", authMiddleware, postController.deletePost);

module.exports = router;