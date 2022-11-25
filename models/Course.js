const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    categoryId: { type: String, ref: "Category", unique: false },
    authorName: {type: String, required: true},
    authorAvatar: {type: String, required: true},
    title: { type: String, required: true },
    description: { type: String, require: true },
    urlBanner: { type: String, require: true },
    urlCourse: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
