const express = require('express');
const logger = require('../logger/logger');
const CategoryModel = require('../model/category');
const { categoryValidate } = require('../validate/catagory');

exports.category = async(req, res) => {
    res.render('category', {
        values: req.body,
    })
}

exports.viewCategory = async(req, res) => {
    try {
        const user = await CategoryModel.find();

        if (user) {
            res.render('category', {
                values: user
            });
        }

    } catch (err) {
        logger.error("err", err);
    }
};

exports.showCategory = async(req, res) => {
    res.render('add_catagory', {
        values: req.body,
    })
}

exports.addCategory = async(req, res, next) => {
    try {
        let { error } = categoryValidate(req.body);
        if (error) {

            if (error.details[0].context.key == 'categoryName') {
                var err1 = error.details[0].message;
                return res.render('add_catagory', {
                    error1: err1,
                    values: req.body,
                });
            }
        }
        const user = {
            categoryName: req.body.categoryName,
        }
        const userData = await new CategoryModel(user)
        await userData.save().then(
            data => {
                res.redirect('/category');
            });
    } catch (err) {
        logger.error("err", err)
    }
};

exports.showEditCategory = async(req, res) => {
    try {
        const user = await CategoryModel.findById({ _id: req.params.id });

        if (user) {
            res.render('edit_catagory', {
                values: user
            });
        }
    } catch (err) {
        logger.error("err", err);
    }
};

exports.updateCategory = async(req, res) => {

    try {
        let { error } = categoryValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'categoryName') {
                var err1 = error.details[0].message;
                res.render('edit_catagory', {
                    error1: err1,
                    values: req.body
                });
            }

        } else {
            const userData = await CategoryModel.findByIdAndUpdate(req.params.id, {
                categoryName: req.body.categoryName,
            });
            if (userData) {
                res.redirect('/category');
            }
        }
    } catch (err) {
        logger.error("err", err);
    }
};

exports.deleteCategory = async(req, res) => {
    try {
        const user = await CategoryModel.findById({ _id: req.params.id });
        await CategoryModel.deleteOne(user);
        await res.redirect('/category');

    } catch (err) {
        logger.error("err", err);
    }
}

exports.multiDeleteCategory = (req, res) => {
    try {

        const id = req.query;
        const count = Object.keys(id).length;
        for (let i = 0; i < count; i++) {
            CategoryModel.findByIdAndDelete(Object.keys(id)[i], function(err) {
                if (err)
                    logger.error("err", err);
            });

        }
        res.redirect('/category');

    } catch (err) {
        logger.error("err", err);
    }
}
