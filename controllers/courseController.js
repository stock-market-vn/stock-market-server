const Course = require("../models/Course.js");
const User = require("../models/User.js");

const create = async (req, res) => {
  const newCourse = Course({
    categoryId: req.body.categoryId,
    authorName: req.user.name,
    authorAvatar: req.user.avatar,
    title: req.body.title,
    description: req.body.description,
    urlBanner: req.body.urlBanner,
    ada: req.body.ada,
  });

  const error = newCourse.validateSync();

  if (error) {
    return res.status(400).json(error);
  } else {
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
          return res.status(400).json(error.message);
        });
    } catch (error) {
      return res.status(501).json(error);
    }
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
    title: req.body.title,
    content: req.body.content,
    url: req.body.url,
    image: req.body.image,
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

const join = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.body.idCourse, {
      $addToSet: { users: req.user.id },
    })
      .then((course) => {
        return course;
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
    if (course) {
      await User.findByIdAndUpdate(
        req.user.id,
        {
          $addToSet: { courses: req.body.idCourse },
        },
        {
          new: true,
          select: { isAdmin: 0, password: 0 },
        }
      )
        .then((user) => {
          return res.status(200).json(user);
        })
        .catch((error) => {
          return res.status(400).json(error);
        });
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const unJoin = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.body.idCourse, {
      $pull: { users: req.user.id },
    })
      .then((course) => {
        return course;
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
    if (course) {
      await User.findByIdAndUpdate(
        req.user.id,
        {
          $pull: { courses: req.body.idCourse },
        },
        {
          new: true,
          select: { isAdmin: 0, password: 0 },
        }
      )
        .then((user) => {
          return res.status(200).json(user);
        })
        .catch((error) => {
          return res.status(400).json(error);
        });
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { create, readAll, findList, readOne, update, remove, join, unJoin };
