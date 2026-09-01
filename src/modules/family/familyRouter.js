const Router = require("express");
const router = new Router();
const { authMiddleware } = require("../../middleware/authMiddleware");
const {
  getFamily,
  addFamilyMember,
  deleteFamilyMember,
} = require("./familyController");

router.get("/:username", getFamily);
router.post("/", authMiddleware, addFamilyMember);
router.delete("/:memberId", authMiddleware, deleteFamilyMember);

module.exports = router;
