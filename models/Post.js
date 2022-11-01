const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    idOwner: { type: mongoose.Schema.ObjectId, ref: "User" },
    nameOwner: { type: String, required: true },
    avatarOwner: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
