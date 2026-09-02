const Router = require("express");
const router = new Router();
const {
  authMiddleware,
  optionalAuthMiddleware,
} = require("../../middleware/authMiddleware");
const {
  getFamily,
  addFamilyMember,
  deleteFamilyMember,
} = require("./familyController");

router.get("/:username", optionalAuthMiddleware, getFamily);
router.post("/", authMiddleware, addFamilyMember);
router.delete("/:memberId", authMiddleware, deleteFamilyMember);

module.exports = router;
