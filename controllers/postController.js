const Post = require("../models/Post.js");

// CREATE POST
const create = async (req, res) => {
  const newPost = new Post({
    idOwner: req.user.id,
    nameOwner: req.user.name,
    avatarOwner: req.user.avatar,
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
  });

  try {
    await newPost
      .save()
      .then((savedPost) => {
        return res.status(201).json({ postId: savedPost._id, ...savedPost._doc });
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
  } catch (error) {
    return res.status(500).json({ status: -1, message: "server error", error });
  }
};

const findList = async (req, res) => {
  try {
    let limit = req.query.pageSize || 10
    let skip = limit * (req.query.pageIndex - 1) || 0
    if (skip < 0) skip = 0

    await Post.find().limit(limit).skip(skip).sort({ updatedAt: -1 })
      .then((posts) => {
        return res.status(200).json(posts.map(post => {
          return { postId: post._id, ...post._doc }
        }));
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const readAll = async (req, res) => {
  try {
    await Post.find()
      .then((post) => {
        return res.status(200).json(post);
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const readOne = async (req, res) => {
  try {
    await Post.findById(req.params.id)
      .then((post) => {
        return res.status(200).json(post);
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).json('Please input data update')
  }
  const post = {
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
  };
  try {
    await Post.findByIdAndUpdate(
      req.params.id,
      { $set: post },
      {
        new: true,
      }
    )
      .then((post) => {
        res
          .status(200)
          .json({ status: 1, message: `${req.params.id} update successfully` });
      })
      .catch((error) => {
        res
          .status(404)
          .json({ status: 0, message: "You are not alowed to do that", error });
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

const remove = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id)
      .then((post) => {
        res.status(200).json({
          status: 1, message: `Post ${req.params.id} delete successfully`
        })
      })
      .catch(error => {
        res.status(404).json({
          status: 0, message: "Post-id is non-existence", error
        })
      })
  } catch (error) {
    res.status(500).json({
      status: -1, message: "Server error", error
    })
  }
}

module.exports = { create, readAll, findList, readOne, update, remove };
