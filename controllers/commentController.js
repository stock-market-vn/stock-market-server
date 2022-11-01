const Comment = require("../models/Comment.js");
const Post = require("../models/Post.js");

const create = async (req, res) => {
  const newComment = new Comment({
    idOwner: req.user.id,
    nameOwner: req.user.name,
    avatarOwner: req.user.avatar,
    idPost: req.body.idPost,
    content: req.body.content,
  });

  const error = newComment.validateSync();

  if (error) {
    res.status(400).json(error);
  } else {
    try {
      await newComment
        .save()
        .then((savedComment) => {
          res.status(200).json({
            status: 1,
            message: "successfully!",
            comment: savedComment,
          });
          return savedComment._id;
        })
        .catch((error) => {
          return res.status(400).json(error.message);
        });
    } catch (error) {
      res.status(501).json(error);
    }
  }
};

const findCommentByPost = async (req, res) => {
  try {
    await Comment.find({ idPost: req.body.idPost })
      .then((comments) => {
        res.status(200).json(comments);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } catch (error) {
    res.stauts(500).json(error);
  }
}

const readAll = async (req, res) => {
  try {
    await Comment.find()
      .then((comment) => {
        res.status(200).json(comment);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } catch (error) {
    res.stauts(500).json(error);
  }
};

const readOne = async (req, res) => {
  try {
    await Comment.findById(req.params.id)
      .then((comment) => {
        res.status(200).json(comment);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } catch (error) {
    res.stauts(500).json(error);
  }
};

const update = async (req, res) => {
  try {
    await Comment.findById(
      req.params.id
    ).exec()
      .then((comment) => {
        if (comment.userId == req.user.id) {
          comment.content = req.body.content;
          res.status(200).json(comment);
          comment.save();
        } else {
          res.status(400).json({ message: "You are not alowed to do that!" });
        }
      })
      .catch((error) => {
        res.status(404).json({ message: "CommentId is undifind!", error });
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

const remove = async (req, res) => {
  try {
    var err = {};
    const postId = await Comment.findByIdAndDelete(req.params.id)
      .then((comment) => {
        return comment.postId;
      })
      .catch((error) => {
        err = error;
        return 0;
      });

    if (postId) {
      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      })
        .then(
          res.status(200).json({
            status: 1,
            message: `Update Successfully`,
          })
        )
        .catch((error) => {
          return res.status(500).json(error);
        });
    } else {
      return res.status(400).json({ status: 0, error: err });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { create, readAll, readOne, update, remove, findCommentByPost };
