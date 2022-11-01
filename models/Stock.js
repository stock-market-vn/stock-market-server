const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema(
    {
        open: { type: Number, required: true },
        hight: { type: Number, required: true },
        low: { type: Number, required: true },
        close: { type: Number, required: true },
        volume: { type: Number, required: true },
        date: { type: Date, required: true, index: true },
        symbol: { type: String, required: true, index: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Stock", StockSchema);
