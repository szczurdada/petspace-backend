const Router = require("express");
const router = new Router();
const { optionalAuthMiddleware } = require("../../middleware/authMiddleware");
const { getPostwall } = require("./postwallController");

router.get("/:username", optionalAuthMiddleware, getPostwall);

module.exports = router;
