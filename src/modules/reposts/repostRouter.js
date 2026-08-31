const Router = require("express");
const router = new Router();
const { authMiddleware } = require("../../middleware/authMiddleware");
const { toggleRepost } = require("./repostController");

router.post("/:postId", authMiddleware, toggleRepost);

module.exports = router;
