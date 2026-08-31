const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const Photo = require("../../models/Photo");
const { errorResponse } = require("../../utils/errors");
const { notify } = require("../../utils/notify");

const isLikedBy = (doc, userId) =>
  doc.likes.some((id) => id.toString() === userId);

const toggleLike = async (Model, id, userId) => {
  const doc = await Model.findById(id);
  if (!doc) return null;
  const liked = isLikedBy(doc, userId);
  liked ? doc.likes.pull(userId) : doc.likes.push(userId);
  await doc.save();
  return { liked: !liked, count: doc.likes.length, ownerId: doc.user };
};

const likeHandler = (Model, type) => async (req, res) => {
  try {
    const result = await toggleLike(Model, req.params.id, req.user.id);
    if (!result) return res.status(404).json(errorResponse("NOT_FOUND"));
    const { liked, count, ownerId } = result;
    if (liked) await notify({ recipient: ownerId, user: req.user.id, type });
    res.json({ liked, count });
  } catch (err) {
    console.error(err);
    res.status(500).json(errorResponse("INTERNAL_SERVER_ERROR"));
  }
};

module.exports = {
  likePost: likeHandler(Post, "like"),
  likeComment: likeHandler(Comment, "like"),
  likePhoto: likeHandler(Photo, "like"),
};