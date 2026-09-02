const Router = require("express");
const router = new Router();
const {
  authMiddleware,
  optionalAuthMiddleware,
} = require("../../middleware/authMiddleware");
const {
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
  removeFollower,
} = require("./followsController");

router.get("/followers/:username", optionalAuthMiddleware, getFollowers);
router.get("/following/:username", optionalAuthMiddleware, getFollowing);
router.post(
  "/followers/:username/follow/:targetUsername",
  authMiddleware,
  followUser,
);
router.delete(
  "/followers/:username/unfollow/:targetUsername",
  authMiddleware,
  unfollowUser,
);
router.delete(
  "/followers/:username/remove/:followerUsername",
  authMiddleware,
  removeFollower,
);

module.exports = router;
