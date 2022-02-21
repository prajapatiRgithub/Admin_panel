const mongoose = require('mongoose');

const Category = new mongoose.Schema({

    categoryName: {
        type: String
    }
});

const CategoryModel = mongoose.model('Category', Category);

module.exports = CategoryModel;