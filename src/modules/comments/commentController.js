const Comment = require("../../models/Comment");
const Post = require("../../models/Post");
const Photo = require("../../models/Photo");
const { errorResponse } = require("../../utils/errors");
const { notify } = require("../../utils/notify");
const { withLiked } = require("../../utils/likes");

const createComment = async (req, res) => {
  try {
    const { content, postId, photoId, replyCommentId } = req.body;
    if (!content || (!postId && !photoId))
      return res.status(400).json(errorResponse("MISSING_REQUIRED_FIELDS"));

    let replyTo = null;
    if (replyCommentId) {
      replyTo = await Comment.findById(replyCommentId).select("user parent");
      if (!replyTo)
        return res.status(404).json(errorResponse("COMMENT_NOT_FOUND"));
    }

    const comment = await Comment.create({
      content,
      user: req.user.id,
      parent: replyTo ? replyTo.parent || replyTo._id : null,
      ...(postId ? { post: postId } : { photo: photoId }),
    });

    await comment.populate("user", "name avatar username");

    if (replyTo) {
      await notify({ recipient: replyTo.user, user: req.user.id, type: "comment" });
    } else {
      const target = await (postId ? Post : Photo)
        .findById(postId || photoId)
        .select("user");
      if (target) {
        await notify({ recipient: target.user, user: req.user.id, type: "comment" });
      }
    }

    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json(errorResponse("INTERNAL_SERVER_ERROR"));
  }
};

const getComments = async (req, res) => {
  try {
    const { postId, photoId } = req.params;
    const filter = postId ? { post: postId } : { photo: photoId };
    const userId = req.user?.id;

    const comments = await Comment.find(filter)
      .sort({ createdAt: 1 })
      .populate("user", "name avatar username");

    res.json(comments.map((c) => withLiked(c.toObject(), userId)));
  } catch (err) {
    console.error(err);
    res.status(500).json(errorResponse("INTERNAL_SERVER_ERROR"));
  }
};

const updateComment = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content)
      return res.status(400).json(errorResponse("MISSING_REQUIRED_FIELDS"));

    const comment = await Comment.findById(req.params.commentId);
    if (!comment)
      return res.status(404).json(errorResponse("COMMENT_NOT_FOUND"));
    if (comment.user.toString() !== req.user.id)
      return res.status(403).json(errorResponse("ACCESS_DENIED"));

    comment.content = content;
    await comment.save();
    res.json({ message: "Comment updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json(errorResponse("INTERNAL_SERVER_ERROR"));
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment)
      return res.status(404).json(errorResponse("COMMENT_NOT_FOUND"));
    if (comment.user.toString() !== req.user.id)
      return res.status(403).json(errorResponse("ACCESS_DENIED"));

    await comment.deleteOne();
    await Comment.deleteMany({ parent: comment._id });
    res.json({ message: "Comment deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json(errorResponse("INTERNAL_SERVER_ERROR"));
  }
};

module.exports = { createComment, getComments, updateComment, deleteComment };
