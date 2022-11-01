const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, max: 50 },
    phone: { type: Number, required: true, unique: true },
    email: { type: String, index: true, required: true, unique: true, max: 50 },
    password: { type: String, required: true },
    avatar: { type: String, default: 'https://via.huemed-univ.edu.vn/template/img/no_avatar.jpg' },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
