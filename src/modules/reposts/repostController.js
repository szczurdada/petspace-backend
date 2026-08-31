const Repost = require("../../models/Repost");
const Post = require("../../models/Post");
const { errorResponse } = require("../../utils/errors");

const toggleRepost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json(errorResponse("POST_NOT_FOUND"));
    if (post.user.toString() === req.user.id)
      return res.status(400).json(errorResponse("INVALID_REQUEST"));

    const existing = await Repost.findOne({
      post: post._id,
      user: req.user.id,
    });

    if (existing) {
      await existing.deleteOne();
    } else {
      await Repost.create({ post: post._id, user: req.user.id });
    }

    const count = await Repost.countDocuments({ post: post._id });
    res.json({ reposted: !existing, count });
  } catch (err) {
    console.error(err);
    res.status(500).json(errorResponse("INTERNAL_SERVER_ERROR"));
  }
};

module.exports = { toggleRepost };
