const User = require("../models/User");
const CryptoJS = require("crypto-js");

// GET ME
const readMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id, '-password -isAdmin')
    return res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error);
  }
}

// GET ALL USER
const readAll = async (req, res) => {
  try {
    if (req.user == undefined || !req.user.isAdmin) {
      const users = await User.find({}, '-password -isAdmin');
      return res.status(200).json(users);
    } else if (req.user.isAdmin) {
      const users = await User.find();
      return res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET USER BY ID
const readOne = async (req, res) => {
  try {
    if (req.user == undefined || !req.user.isAdmin) {
      await User.findById(req.params.id, '-password -isAdmin')
        .then((user) => {
          return res.status(200).json(user);
        })
        .catch((error) => {
          return res
            .status(400)
            .json({ status: 0, message: "User-id is non-existence", error });
        });
    } else if (req.user.isAdmin) {
      await User.findById(req.params.id)
        .then((user) => {
          return res.status(200).json(user);
        })
        .catch((error) => {
          return res
            .status(400)
            .json({ status: 0, message: "User-id is non-existence", error });
        });
    }

  } catch (error) {
    return res.status(500).json({ status: -1, message: "Server error", error });
  }
};

// UPDATE USER
const updateUser = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      data = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        avatar: req.body.avatar,
      }
    } else {
      data = req.body
    }

    await User.findByIdAndUpdate(
      req.user.id,
      { $set: data },
      {
        new: true,
        select: { password: 0 }
      },
    )
      .then((user) => {
        res
          .status(200)
          .json({ status: 1, user, message: `update successfully` });
      })
      .catch((error) => {
        res
          .status(404)
          .json({ status: 0, message: "User-id is non-existence", error });
      });
  } catch (error) {
    error.json({
      status: -1,
      message: "Server error",
      error: error.message,
    });
  }
};

// UPDATE PASSWORD
const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).catch(error => {
      return res.status(500).json(error.message)
    })

    const hashedPassord = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalPassword = hashedPassord.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.oldPassword)
      return res.status(401).json({ status: 0, message: "OldPassword is incorect!" });

    data = {
      password: CryptoJS.AES.encrypt(
        req.body.newPassword,
        process.env.PASS_SEC
      ).toString(),
    }

    await User.findByIdAndUpdate(
      req.user.id,
      { $set: data },
      {
        new: true,
        select: { password: 0 }
      },
    )
      .then((user) => {
        res
          .status(200)
          .json({ status: 1, user, message: `update successfully` });
      })
      .catch((error) => {
        res
          .status(404)
          .json({ status: 0, message: "User-id is non-existence", error });
      });
  } catch (error) {
    error.json({
      status: -1,
      message: "Server error",
      error: error.message,
    });
  }
};

// DELETE USER
const remove = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
      .then((user) => {
        res
          .status(200)
          .json({ status: 1, message: `User ${req.params.id} delete successfully` });
      })
      .catch(error => {
        res.status(404).json({
          status: 0,
          message: "User-id is non-existence",
          error
        })
      })
  } catch (error) {
    res.json({
      status: -1,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { readMe, readOne, readAll, updateUser, updatePassword, remove };
