const logger = require('../logger/logger');
const PortfolioModel = require('../model/portfolio');
const CategoryModel = require('../model/category');
const { portfolioValidate } = require('../validate/portfolio');


exports.portfolio = async(req, res) => {
    res.render('portfolio', {
        values: req.body,
    })
}

exports.viewPortfolio = async(req, res) => {
    try {

        const user = await PortfolioModel.aggregate([{
                $lookup: {
                    from: "categories",
                    localField: "categoryName",
                    foreignField: "projectCategory",
                    as: "anything"
                }
            }
        ]);


        if (user) {
            res.render('portfolio', {
                values: user
            });
        }
    } catch (err) {
        logger.error("err", err);
    }
};


exports.showPortfolio = async(req, res) => {
    try {
        const user = await CategoryModel.find();


        if (user) {
            res.render('add_portfolio', {
                values: user
            });
        }
    } catch (err) {
        logger.error("err", err);
    }
};

exports.addPortfolio = async(req, res) => {


    try {

        let { error } = portfolioValidate(req.body);
        if (error) {

            if (error.details[0].context.key == 'projectCategory') {
                var err1 = error.details[0].message;
                return res.render('add_portfolio', {
                    error1: err1,
                    values: req.body,

                });
            }
            if (error.details[0].context.key == 'projectName') {
                var err1 = error.details[0].message;
                return res.render('add_portfolio', {
                    error2: err1,
                    values: req.body,

                });
            }
            if (error.details[0].context.key == 'projectTitle') {
                var err1 = error.details[0].message;
                return res.render('add_portfolio', {
                    error3: err1,
                    values: req.body,

                });
            }
            if (error.details[0].context.key == 'projectDate') {
                var err1 = error.details[0].message;
                return res.render('add_portfolio', {
                    error4: err1,
                    values: req.body,

                });
            }
            if (error.details[0].context.key == 'projectDescription') {
                var err1 = error.details[0].message;
                return res.render('add_portfolio', {
                    error6: err1,
                    values: req.body,

                });
            }
        }
        const multipleImage = req.files.map(Image => Image.filename);
        const user = {
            projectCategory: req.body.projectCategory,
            projectName: req.body.projectName,
            P_image: multipleImage,
            projectTitle: req.body.projectTitle,
            projectDate: req.body.projectDate,
            projectDescription: req.body.projectDescription,

        }
        const userData = await new PortfolioModel(user)
        await userData.save().then(
            data => {
                res.redirect('/portfolio');
            });
    } catch (err) {
        logger.error("err", err)

    }
};

exports.showEditPortfolio = async(req, res) => {
    try {
        const categoryUser = await CategoryModel.find();

        const user = await PortfolioModel.findById(req.params.id);

        if (user && categoryUser) {
            res.render('edit_protfolio', {
                values: user,
                categoryValues: categoryUser
            });
        }
    } catch (err) {
        logger.error("err", err);
    }
};

exports.updatePortfolio = async(req, res) => {
    console.log(req.body);

    try {

        let { error } = portfolioValidate(req.body);

        if (error) {
            if (error.details[0].context.key == 'projectCategory') {
                var err1 = error.details[0].message;
                return res.render('edit_protfolio', {
                    error1: err1,
                    values: req.body,

                });
            }
            if (error.details[0].context.key == 'projectName') {
                var err1 = error.details[0].message;
                return res.render('edit_protfolio', {
                    error2: err1,
                    values: req.body,

                });
            }
            if (error.details[0].context.key == 'projectTitle') {
                var err1 = error.details[0].message;
                return res.render('edit_protfolio', {
                    error3: err1,
                    values: req.body,

                });
            }
            if (error.details[0].context.key == 'projectDate') {
                var err1 = error.details[0].message;
                return res.render('edit_protfolio', {
                    error4: err1,
                    values: req.body,

                });
            }
            if (error.details[0].context.key == 'projectDescription') {
                var err1 = error.details[0].message;
                return res.render('edit_protfolio', {
                    error6: err1,
                    values: req.body,

                });
            }
        } else {
            const multipleImage = req.files.map(Image => Image.filename);
            const userData = await PortfolioModel.findByIdAndUpdate(req.params.id, {
                projectCategory: req.body.projectCategory,
                projectName: req.body.projectName,
                P_image: multipleImage,
                projectTitle: req.body.projectTitle,
                projectDate: req.body.projectDate,
                projectDescription: req.body.projectDescription,
            });
            if (userData) {
                res.redirect('/portfolio');
            }
        }
    } catch (err) {
        logger.error("err", err);
    }
};





exports.deletePortfolio = async(req, res) => {
    try {

        const user = await PortfolioModel.findById({ _id: req.params.id });
        await PortfolioModel.deleteOne(user);
        await res.redirect('/portfolio');

    } catch (err) {
        logger.error("err", err);
    }
}

exports.multiDeletePortfolio = (req, res) => {
    try {

        const id = req.query;
        const count = Object.keys(id).length;
        for (let i = 0; i < count; i++) {
            PortfolioModel.findByIdAndDelete(Object.keys(id)[i], function(err) {
                if (err)
                    logger.error("err", err);
            });

        }
        res.redirect('/portfolio');

    } catch (err) {
        logger.error("err", err);
    }
}
