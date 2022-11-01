const WatchList = require("../models/WatchList");

const create = async (req, res) => {
    const newWatchList = new WatchList({
        idUser: req.user.id,
        symbol: req.body.symbol,
    });

    try {
        await newWatchList
            .save()
            .then((watchList) => {
                return res.status(200).json(watchList);
            })
            .catch((error) => {
                return res.status(500).json(error.message);
            });
    } catch (error) {
        return res.status(501).json({ message: "Server error!!", error });
    }
};

const findByMe = async (req, res) => {
    await WatchList.find({ idUser: req.user.id }).then((watchLists) => {
        return res.status(200).json(watchLists)
    }).catch(error => {
        return res.status(500).json(error.message);
    })
}

const remove = async (req, res) => {
    await WatchList.findByIdAndDelete(req.params.watchListId).catch(error => {
        return res.status(500).json(error.message);
    })

    return res.status(200).json({ message: `Delete watch list successfully!` })
}

module.exports = { create, findByMe, remove };
