const Comment = require("../models/Comment");
const { errorResponse } = require("../utils/errors");

const createComment = async (req, res) => {
  try {
    const { content, postId, photoId } = req.body;
    if (!content || (!postId && !photoId))
      return res.status(400).json(errorResponse("MISSING_REQUIRED_FIELDS"));
    let comment;
    if (postId) {
      comment = await Comment.create({
        content,
        post: postId,
        user: req.user.id,
      });
    } else {
      comment = await Comment.create({
        content,
        photo: photoId,
        user: req.user.id,
      });
    }
    await comment.populate("user", "name avatar");
    res.status(201).json(comment);
  } catch (e) {
    res.status(500).json(errorResponse("INTERNAL_SERVER_ERROR"));
  }
};

const getComments = async (req, res) => {
  try {
    const { postId, photoId} = req.params;
    let comments;
    if (postId) {
    comments = await Comment.find({ post: postId })
      .sort({
        createdAt: -1,
      })
      .populate("user", "name avatar");}
      else { 
        comments = await Comment.find({ photo: photoId })
      .sort({
        createdAt: -1,
      })
      .populate("user", "name avatar");}
    res.json(comments);
  } catch (e) {
    res.status(500).json(errorResponse("INTERNAL_SERVER_ERROR"));
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment)
      return res.status(404).json(errorResponse("COMMENT_NOT_FOUND"));
    if (comment.user.toString() !== req.user.id)
      return res.status(403).json(errorResponse("ACCESS_DENIED"));
    await comment.deleteOne();
    res.json({ message: "Comment deleted" });
  } catch (e) {
    res.status(500).json(errorResponse("INTERNAL_SERVER_ERROR"));
  }
};

module.exports = { createComment, getComments, deleteComment };
