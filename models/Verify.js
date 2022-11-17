const mongoose = require("mongoose");

const VerifySchema = new mongoose.Schema(
    {
        email: {type: String, max: 50},
        code: {type: Number}
    }
);

module.exports = mongoose.model("Verify", VerifySchema);