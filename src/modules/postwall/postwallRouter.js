const Router = require("express");
const router = new Router();
const { getPostwall } = require("./postwallController");

router.get("/:username", getPostwall);

module.exports = router;
