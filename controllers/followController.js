const User = require("../models/User");

const follow = async (req, res) => {
  const followedUser = await User.findOneAndUpdate(
    { name: req.body.name },
    {
      $addToSet: { followers: req.user.id },
    },
    {
      new: true,
    }
  )
    .then((user) => {
      var followedUser = user.id;
      return followedUser;
    })
    .catch((error) => {
      return 0;
    });

  if (followedUser) {
    await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { following: followedUser } },
      {
        new: true,
      }
    )
      .then((user) => {
        return res.status(200).json({ status: 1, user });
      })
      .catch((error) => {
        return res.status(500).json({ status: 0, error });
      });
  } else {
    return res.status(404).json({ status: 0, message: "User is not defined!" });
  }
};

const unFollow = async (req, res) => {
  const unFollowedUser = await User.findOneAndUpdate(
    { name: req.body.name },
    {
      $pull: { followers: req.user.id },
    },
    {
      new: true,
    }
  )
    .then((user) => {
      var followedUser = user.id;
      return followedUser;
    })
    .catch((error) => {
      return 0;
    });

  if (unFollowedUser) {
    await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { following: unFollowedUser } },
      {
        new: true,
      }
    )
      .then((user) => {
        return res.status(200).json({ status: 1, user });
      })
      .catch((error) => {
        return res.status(500).json({ status: 0, error });
      });
  } else {
    return res.status(404).json({ status: 0, message: "User is not defined!" });
  }
};

module.exports = { follow, unFollow };
