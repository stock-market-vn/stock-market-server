const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    idOwner: { type: mongoose.Schema.ObjectId, ref: "User" },
    idPost: {type: mongoose.Schema.ObjectId, ref: "Post", required: true},
    nameOwner: { type: String, required: true },
    avatarOwner: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);