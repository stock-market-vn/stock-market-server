const { json } = require("express");
const DetailStock = require("../models/DetailStock");

// get detail stock  by symbol
const readAll = async (req, res) => {
    if (!req.query.symbol)
    await DetailStock.find({})
        .then((detailStocks) => {
            return res.status(200).json(detailStocks);
        })
        .catch((error) => {
            return res.status(404).json({ message: "Stocks are non-existence", error });
        });

let symbol = req.query.symbol

try {
    await DetailStock.find({})
        .then((detailStock) => {
            const detail = detailStock.find(item => {
                if (item.ticker === symbol) {
                    return true;
                };
            })
            return res.status(200).json(detail);
            
        })
        .catch((error) => {
            return res.status(404).json({ message: "Stocks are non-existence", error });
        });
} catch (error) {
    return res.status(500);
}
};

// GET Stock BY ID
const readOne = async (req, res) => {
    try {
        await DetailStock.findById(req.params.id)
            .then((detailStock) => {
                if (detailStock) {
                    return res.status(200).json(detailStock);
                } else {
                    return res
                        .status(400)
                        .json({ status: 0, message: "DetailStock-id is non-existence" });
                }
            })
            .catch((error) => {
                return res
                    .status(500)
                    .json({ status: -1, message: "Server error", error });
            });
    } catch (error) {
        return res.status(500).json({ status: -1, message: "Server error", error });
    }
};

module.exports = { readOne, readAll };
