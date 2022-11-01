const mongoose = require("mongoose");

const DetailStockSchema = new mongoose.Schema(
    {
        organCode: { type: String, required: true },
        ticker: { type: String, required: true },
        comGroupCode: { type: String, required: true },
        icbCode: { type: String, required: true },
        organTypeCode: { type: String, required: true },
        comTypeCode: { type: String, required: true },
        organName: { type: String, required: true, index: true },
        organShortName: { type: String, required: true, index: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("DetailStock", DetailStockSchema);
