const StockToday = require("../models/StockToday");

// GET ALL Stock
const readAll = async (req, res) => {
    await StockToday.find({})
        .then((stocks) => {
            return res.status(200).json(stocks);
        })
        .catch((error) => {
            return res.status(404).json({ message: "Stocks are non-existence", error });
        });
};

module.exports = { readAll };