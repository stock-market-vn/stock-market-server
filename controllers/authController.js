const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
const register = async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    avatar: req.body.avatar,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
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
};

//LOGIN
const login = async (req, res, next) => {
  try {
    await User.findOne({ email: req.body.email })
      .then((user) => {
        const { password, _id, ...orther } = user._doc;

        const hashedPassword = CryptoJS.AES.decrypt(
          user.password,
          process.env.PASS_SEC
        );

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        // originalPassword !== req.body.password &&
        //   res.status(401).json({ status: 0, message: "Wrong credentials!" });

        const accessToken = jwt.sign(
          {
            id: _id,
            ...orther
          },
          process.env.JWT_SEC,
          {
            expiresIn: "30d", // expires in 30d
          }
        );

        const refreshToken = jwt.sign(
          {
            id: user._id,
          },
          process.env.JWT_REFRESH_KEY,
          {
            expiresIn: "30d", // expires in 30 days
          }
        );

        res
          .status(200)
          .json({ user: { _id, ...orther }, accessToken });
      })
      .catch((error) => {
        return res
          .status(401)
          .json({ user, status: 0, message: "Wrong credentials!", error });
      });

    // res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ status: -1, message: "Server error", error });
  }
};

// REFRESH TOKEN
const refreshToken = async (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  const accessToken = jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SEC,
    {
      expiresIn: "30s", // expires in 30s
    }
  );
};

module.exports = { register, login };
