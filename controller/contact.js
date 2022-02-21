const logger = require('../logger/logger');
const ContactModel = require('../model/contact');
const { contactValidate } = require('../validate/contact');


exports.contact = async(req, res) => {
    res.render('contact', {
        values: req.body,
    })
};

exports.viewcontact = async(req, res) => {
    try {
        const user = await ContactModel.find();

        if (user) {
            res.render('contact', {
                values: user
            });
        }
    } catch (err) {
        logger.error("err", err);
    }
};

exports.showcontact = async(req, res) => {
    res.render('contactus', {
        values: req.body,
    })
};

exports.addcontact = async(req, res, next) => {

    try {

        let { error } = contactValidate(req.body);
        if (error) {

            if (error.details[0].context.key == 'contactname') {
                var err1 = error.details[0].message;
                return res.render('contactus', {
                    error1: err1,
                    values: req.body,

                });
            }
            if (error.details[0].context.key == 'email') {
                var err1 = error.details[0].message;
                return res.render('contactus', {
                    error2: err1,
                    values: req.body,
                });
            }
            if (error.details[0].context.key == 'contactnumber') {
                var err1 = error.details[0].message;
                return res.render('contactus', {
                    error3: err1,
                    values: req.body,
                });
            }
            if (error.details[0].context.key == ' message') {
                var err1 = error.details[0].message;
                return res.render('contactus', {
                    error4: err1,
                    values: req.body,
                });
            }
            if (error.details[0].context.key == 'date') {
                var err1 = error.details[0].message;
                return res.render('contactus', {
                    error6: err1,
                    values: req.body,
                });
            }
        }



        const user = {
            contactname: req.body.contactname,
            email: req.body.email,
            contactnumber: req.body.contactnumber,
            message: req.body.message,
            date: req.body.date,
        }
        const userData = await new ContactModel(user)
        await userData.save()
        .then(data => {
                res.redirect('/contact');
            });
    } catch (err) {
        logger.error("err", err)
    }
};

exports.showEditContact = async(req, res) => {
    try {
        const user = await ContactModel.findById({ _id: req.params.id });

        if (user) {
            res.render('edit_contact', {
                values: user
            });
        }
    } catch (err) {
        logger.error("err", err);
    }
};

exports.updateContact = async(req, res) => {

    try {
        let { error } = contactValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'contactname') {
                var err1 = error.details[0].message;
                res.render('edit_contact', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'email') {
                var err1 = error.details[0].message;
                res.render('edit_contact', {
                    error2: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'contactnumber') {
                var err1 = error.details[0].message;
                res.render('edit_contact', {
                    error3: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'message') {
                var err1 = error.details[0].message;
                res.render('edit_contact', {
                    error4: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'date') {
                var err1 = error.details[0].message;
                res.render('edit_contact', {
                    error5: err1,
                    values: req.body
                });
            }
        } else {
            const userData = await ContactModel.findByIdAndUpdate(req.params.id, {
                contactname: req.body.contactname,
                email: req.body.email,
                contactnumber: req.body.contactnumber,
                message: req.body.message,
                date: req.body.date,
            });
            if (userData) {
                res.redirect('/contact');
            }
        }
    } catch (err) {
        logger.error("err", err);
    }
};

exports.deleteContact = async(req, res) => {
    try {
        const user = await ContactModel.findById({ _id: req.params.id });
        await ContactModel.deleteOne(user);
        await res.redirect('/contact');

    } catch (err) {
        logger.error("err", err);
    }
}

exports.multiDeleteContact = (req, res) => {
    try {
        console.log(req.query);
        var id = req.query;
        var count = Object.keys(id).length;
        for (let i = 0; i < count; i++) {
            ContactModel.findByIdAndDelete(Object.keys(id)[i], function(err) {
                if (err)
                    logger.error("err", err);
            });

        }
        res.redirect('/contact');
    } catch (err) {
        logger.error("err", err);
    }
}