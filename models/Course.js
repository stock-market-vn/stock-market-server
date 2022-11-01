const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    categoryId: { type: mongoose.Schema.ObjectId, ref: "Category", unique: true },
    authorName: {type: String, required: true},
    authorAvatar: {type: String, required: true},
    title: { type: String, required: true },
    description: { type: String, require: true },
    urlBanner: { type: String, require: true },
    ada: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
