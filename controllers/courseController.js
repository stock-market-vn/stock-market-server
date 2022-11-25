const Course = require("../models/Course.js");

const create = async (req, res) => {
  const newCourse = Course({
    categoryId: req.body.categoryId,
    authorName: req.body.authorName,
    authorAvatar: req.body.authorAvatar,
    title: req.body.title,
    description: req.body.description,
    urlBanner: req.body.urlBanner,
    urlCourse: req.body.urlCourse,
  });
    try {
      await newCourse
        .save()
        .then((savedCourse) => {
          res.status(200).json({
            status: 1,
            message: "successfully!",
            Course: savedCourse,
          });
        })
        .catch((error) => {
          console.log(error);
          return res.status(400).json(error.message);
        });
    } catch (error) {
      return res.status(501).json(error);
    }
};

const readAll = async (req, res) => {
  try {
    let limit = req.query.pageSize || 10
    let skip = limit * (req.query.pageIndex - 1) || 0
    if (skip < 0) skip = 0

    await Course.find().limit(limit).skip(skip)
      .then((course) => {
        res.status(200).json(course);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } catch (error) {
    res.stauts(500).json(error);
  }
};

const findList = async (req, res) => {
  try {
    await Course.find()
      .then((course) => {
        res.status(200).json(course);
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
    await Course.findById(req.params.id)
      .then((course) => {
        res.status(200).json(course);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } catch (error) {
    res.stauts(500).json(error);
  }
};

const update = async (req, res) => {
  const course = {
    categoryId: req.body.categoryId,
    authorName: req.user.name,
    authorAvatar: req.user.avatar,
    title: req.body.title,
    description: req.body.description,
    urlBanner: req.body.urlBanner,
    urlCourse: req.body.urlCourse,
  };

  try {
    await Course.findByIdAndUpdate(
      req.params.id,
      {
        $set: course,
      },
      {
        new: true,
        select: {},
      }
    )
      .then((course) => {
        res.status(200).json(course);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

const remove = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id)
      .then((course) => {
        res
          .status(200)
          .json({ status: 1, message: `Course delete successfully` });
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { create, readAll, findList, readOne, update, remove};
