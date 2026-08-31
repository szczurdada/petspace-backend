const Router = require("express");
const router = new Router();
const {
  getMessages,
  getConversations,
  markMessagesRead,
} = require("./chatController");
const { authMiddleware } = require("../../middleware/authMiddleware");

router.get("/conversations/:username", authMiddleware, getConversations);
router.post("/:roomId/read", authMiddleware, markMessagesRead);
router.get("/:roomId", authMiddleware, getMessages);

module.exports = router;
