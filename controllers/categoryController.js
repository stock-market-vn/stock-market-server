const Category = require("../models/Category");

// CREATE CATEGORY
const create = async (req, res) => {
    const newCategory = new Category({
        id: req.body.id,
        category: req.body.category,
    });
    try {
        await newCategory
            .save()
            .then((category) => {
                return res.status(200).json(category);
            })
            .catch((error) => {
                return res.status(500).json(error);
            });
    } catch (error) {
        return res.status(501).json({ message: "Server error!!", error });
    }
};

// FIND ALL CATEGORIES
const findAll = async (req, res) => {
    await Category.find().then(categories => {
        return res.status(200).json(categories);
    }).catch((error) => {
        return res.status(500).json(error);
    })
}

// FIND ALL CATEGORIES
const findById = async (req, res) => {
    await Category.findById(req.params.id).then(category => {
        return res.status(200).json(category);
    }).catch((error) => {
        return res.status(500).json(error);
    })
}

// DELETE CATEGORY
const remove = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id)
            .then((category) => {
                res.status(200).json({
                    status: 1,
                    message: `Category delete successfully`,
                });
            })
            .catch((error) => {
                res.status(404).json({
                    status: 0,
                    message: "Category is non-existence",
                    error,
                });
            });
    } catch (error) {
        res.json({
            status: -1,
            message: "Server error",
            error: error.message,
        });
    }
};

module.exports = { create, remove, findAll, findById };