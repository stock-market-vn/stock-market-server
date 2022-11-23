const User = require("../models/User");
const Verify = require('../models/Verify');
const CryptoJS = require("crypto-js");
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

// GET ME
const readMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id, '-isAdmin')
    return res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error);
  }
}

// GET ALL USER
const readAll = async (req, res) => {
  try {
    if (req.user == undefined || !req.user.isAdmin) {
      const users = await User.find({}, '-password');
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
    data = {
      name: req?.body?.name,
      phone: req?.body?.phone,
      email: req?.body?.email,
      avatar: req?.body?.avatar,
    }
    const id = req.user.id;
    console.log("id", id);
    await User.findByIdAndUpdate(
      id,
      { $set: data },
      {
        new: true,
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

// UPDATE USER
const updateIsAdmin = async (req, res) => {
  try {
    const id = req.body.id;
    data = {
      isAdmin: req.body.isAdmin,
    }
    await User.findByIdAndUpdate(
      id,
      { $set: data },
      {
        new: true,
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
    let user = null;
    if (req.body.email) {
      let users = await User.find({ email: req.body.email }).catch(error => {
        res.status(404).json({ status: 0, message: "Email is non-existence", error });
      })
      user = users[0]
    }
    let id = null;
    if (user) {
      id = user._id;
    } else {
      id = req.body.id;
    }
    data = {
      password: CryptoJS.AES.encrypt(
        req.body.newPassword,
        process.env.PASS_SEC
      ).toString(),
    }

    await User.findByIdAndUpdate(
      id,
      { $set: data },
      {
        new: true,
        select: { password: 0 }
      },
    )
      .then((user) => {
        res
          .status(200)
          .json({ status: 1, user, message: `Update password successfully` });
      })
      .catch((error) => {
        res
          .status(404)
          .json({ status: 0, message: "User-id is non-existence", error });
      });
  } catch (error) {
    res.status(500).json({ status: 0, message: "Server error", error });
  }
};

// DELETE USER
const remove = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
      .then((user) => {
        res
          .status(200)
          .json({ status: 1, message: `Delete successfully` });
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

function randomNumber(length) {
  return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
}

// CHECK EMAIL
const checkEmail = async (req, res) => {
  let code = randomNumber(5);
  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: 'ginkutin1999@gmail.com',
        pass: 'muthlxcuxmnxaama'
      }
    })
  );

  var mailOptions = {
    from: 'ginkutin1999@gmail.com',
    to: req.body.email,
    subject: 'Verify email from Stock Market',
    text: code.toString()
  };

  transporter.sendMail(mailOptions, async function (error, info) {
    if (error) {
      res.status(500).json(error.message);
    } else {
      const newVerify = new Verify({ email: req.body.email, code: code });
      try {
        await newVerify
          .save()
          .then(() => {
            return res.status(200).json({ status: 1, message: 'Sent verify code, Please check your email!' });
          })
          .catch(error => {
            return res.status(400).json(error);
          });
      } catch (error) {
        return res
          .status(500)
          .json({ status: -1, message: 'server error', error });
      }
    }
  });
};

// CHECK VERIFY CODE
const checkVerifyCode = async (req, res) => {
  try {
    const results = await Verify.find({ email: req.body.email, code: parseInt(req.body.code) });
    if (results[0]) {
      res.status(200).json({ status: 1, message: true });
    } else {
      res.status(200).json({ status: 0, message: false });
    }
  } catch (error) {
    res.json({
      status: -1,
      message: 'Server error',
      error: error.message
    });
  }
}

const addNewUser = async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    avatar: req.body.avatar,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    isAdmin: req.body.isAdmin,
  });

  try {
    await newUser
      .save()
      .then((savedUser) => {
        res.status(201).json(savedUser);
      })
      .catch((error) => {
        res.status(400).json({ message: "Account already exists" })
      });
  } catch (error) {
    res.status(500).json({ status: -1, message: "server error", error });
  }
}

module.exports = { readMe, readOne, readAll, updateUser, updatePassword, remove, checkEmail, checkVerifyCode, addNewUser, updateIsAdmin };
