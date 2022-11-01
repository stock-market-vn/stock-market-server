const mongoose = require("mongoose");

const WatchListSchema = new mongoose.Schema(
    {
        idUser: { type: mongoose.Schema.ObjectId, ref: "User" },
        symbol: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("WatchList", WatchListSchema);
