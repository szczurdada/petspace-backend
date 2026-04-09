const Router = require("express");
const router = new Router();
const postwallController = require("../controllers/postwallController");

router.get("/:username", postwallController.getPostwall);

module.exports = router;