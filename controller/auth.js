const bcrypt = require('bcrypt');
const saltRounds = 10;
const logger = require('../logger/logger');
const AuthModel = require('../model/db');
const { generateToken } = require("../model/auth");
const OTPsend= require('../model/otp');
const { registrationValidate, PasswordValidate, verifyemailValidate, loginValidate, resetpasswordValidate, updateprofileValidate } = require('../validate/validation');


const otp = Math.floor((Math.random()*10000+1));
logger.info(otp);


exports.index = (req, res)=>{
    res.render('index');
}

exports.registration = (req, res) => {
    res.render('registration', {
        values: req.body
    });
}
exports.signup = async(req, res) => {
    try {
        let { error } = registrationValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'fname') {
                var err1 = error.details[0].message;
                return res.render('registration', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'mname') {
                var err1 = error.details[0].message;
                return res.render('registration', {
                    error2: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'lname') {
                var err1 = error.details[0].message;
                return res.render('registration', {
                    error3: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'gender') {
                var err1 = error.details[0].message;
                return res.render('registration', {
                    error4: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'hobby') {
                var err1 = error.details[0].message;
                return res.render('registration', {
                    error5: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'mobile') {
                var err1 = error.details[0].message;
                return res.render('registration', {
                    error6: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'city') {
                var err1 = error.details[0].message;
                return res.render('registration', {
                    error8: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'Email') {
                var err1 = error.details[0].message;
                return res.render('registration', {
                    error9: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'Password') {
                var err1 = error.details[0].message;
                return res.render('registration', {
                    error10: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'ConfirmPassword') {
                var err1 = error.details[0].message;
                return res.render('registration', {
                    error11: err1,
                    values: req.body
                });
            }
        }
        console.log(req.file);
        const encryptedPassword = await bcrypt.hash(req.body.Password, saltRounds);
        AuthModel.findOne({ Email: req.body.Email }, async(err, response) => {
            if (!response) {
                const user = await new AuthModel({
                    fname: req.body.fname,
                    mname: req.body.mname,
                    lname: req.body.lname,
                    gender: req.body.gender,
                    hobby: req.body.hobby,
                    mobile: req.body.mobile,
                    Image: req.file.filename,
                    city: req.body.city,
                    Email: req.body.Email,
                    Password: encryptedPassword,
                });
                user.save((err, response) => {
                    if (err) {
                        let err1 = "User registration failed";
                        return res.render('registration', {
                            error: err1,
                            values: req.body
                        });
                    } else {
                        let success = "" + req.body.fname + "  " + req.body.mname + " " + req.body.lname + " successfully register";
                        return res.render('registration', {
                            error: success,
                            values: req.body
                        });
                    }
                })
            } else {
                let err1 = "User Email already exist";
                return res.render('registration', {
                    error: err1,
                    values: req.body
                });
            }
        })
    } catch (err) {
        logger.error("err", err);
    }
};


exports.forgetpassword = (req, res) => {
    res.render('forgetpassword', {
        values: req.body
    });
}

exports.verifyEmail = async(req, res) => {
    console.log(req.body);
    try {
        let { error } = PasswordValidate(req.body);
        console.log(error);
        if (error) {
            if (error.details[0].context.key == 'Email') {
                var err1 = error.details[0].message;
                return res.render('forgetpassword', {
                    error1: err1,
                    values: req.body
                });
            }
        }
        AuthModel.findOne({ Email: req.body.Email }, async(err, response) => {
            console.log("", response);
            if (response) {
                OTPsend(req.body.Email, otp);
                res.render('otp', {
                    Email: req.body.Email
                });

            } else {
                return res.render('forgetpassword', {
                    error: "Please enter valid Email"
                });

            }
        })

    } catch (err) {
        logger.error("err", err)

    }
};

exports.otp = (req, res) => {
    res.render('otp')
}

exports.verifyOtp = async(req, res, next) => {
    try {
        if (otp == req.body.otp) {
            res.render("forgetpassword");

        } else {
            var err1 = "Please enter correst OTP";
            return res.render('otp', {
                error: err1
            });
        }
    } catch (err) {
        logger.error("err", err)
    }
};

exports.verifyemail = (req, res) => {
    res.render('verifyEmail', {
        values: req.body
    });
}
exports.updatePassword = async(req, res, next) => {
    console.log(req.body);
    try {
        let { error } = verifyemailValidate(req.body);
        console.log(error);
        if (error) {

            if (error.details[0].context.key == 'Password') {
                var err1 = error.details[0].message;
                return res.render('verifyemail', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'ConfirmPassword') {
                var err1 = error.details[0].message;
                return res.render('verifyemail', {
                    error2: err1,
                    values: req.body
                });
            }
        }

        const encryptedPassword = await bcrypt.hash(req.body.Password, saltRounds);
        const updatePassword1 = { Password: encryptedPassword };
        console.log("12",updatePassword1);
        AuthModel.update({ otp: otp }, updatePassword1, async(err, response) => {
            if (err) throw err;

            res.redirect('/')

        })

    } catch (err) {
        logger.error("err", err)
    }
};

exports.login = (req, res) => {
    res.render('login', {
        values: req.body
    });
}
exports.authUser = async(req, res, next) => {
    try {
        let { error } = loginValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'Email') {
                var err1 = error.details[0].message;
                return res.render('login', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'Password') {
                var err1 = error.details[0].message;
                return res.render('login', {
                    error2: err1,
                    values: req.body
                });
            }
        }
        AuthModel.findOne({ Email: req.body.Email }, async(err, response) => {

            if (err) {
                var err1 = "User not found";
                return res.render('login', {
                    error: err1,
                    values: req.body
                });
            } else {
                const comparision = await bcrypt.compare(req.body.Password, response.Password);
                if (comparision) {
                    res.render('index');
                } else {
                    var err1 = "Email and password does not match";
                    return res.render('login', {
                        error: err1,
                        values: req.body
                    });
                }
            }
        })
    } catch (err) {
        logger.error("err", err)
    }
};
exports.logout = async(req, res) => {
    try {
        res.clearCookie("jwt");
        res.clearCookie("id");
        res.redirect('/');
    } catch (err) {
        logger.error("err", err)
    }
};

exports.resetPassword = (req, res) => {
    res.render('resetpassword')
}

exports.resetPass = async(req, res) => {
    try {

        let { error } = resetpasswordValidate(req.body);

        if (error) {
            if (error.details[0].context.key == 'currentpassword') {
                var err1 = error.details[0].message;
                return res.render('resetpassword', {
                    error1: err1
                });
            }
            if (error.details[0].context.key == 'Password') {
                var err1 = error.details[0].message;
                return res.render('resetpassword', {
                    error2: err1
                });
            }
            if (error.details[0].context.key == 'Pss') {
                var err1 = error.details[0].message;
                return res.render('resetpassword', {
                    error3: err1
                });
            }
        }

        const Email = req.user.Email;
        const user = await AuthModel.findOne({ Email });

        if (user) {
            const comparision = await bcrypt.compare(req.body.currentpassword, user.Password);
            if (comparision) {

                const updatePassword = { Password: await bcrypt.hash(req.body.Password, saltRounds) };

                const updateUser = await AuthModel.updateOne({ Email: Email }, updatePassword);

                if (updateUser) {
                    return res.render('resetpassword', {
                        error: "Your Password has been Reset"
                    });
                } else {
                    return res.render('resetpassword', {
                        error: "Your Password has not been Reset"
                    });
                }
            } else {
                return res.render('resetpassword', {
                    error: "Current Password is incorrect",
                });
            }
        }
    } catch (err) {
        logger.error("err", err)
    }
};

exports.viewprofile = async(req, res) => {

    const Email = req.user.Email;
    try {
        const user = await AuthModel.findOne({ Email });
        if (user) {
            res.render('viewprofile', {
                values: user
            });
        }
    } catch (err) {
        logger.error("err", err);
    }
};

exports.updateprofile = async(req, res) => {
    try {
        const { error } = updateprofileValidate(req.body);
        if (error) {

            if (error.details[0].context.key == 'fname') {
                var err1 = error.details[0].message;
                return res.render('updateprofile', {
                    error1: err1,
                    values: req.body
                });
            }

            if (error.details[0].context.key == 'mname') {
                var err1 = error.details[0].message;
                return res.render('updateprofile', {
                    error2: err1,
                    values: req.body
                });
            }

            if (error.details[0].context.key == 'lname') {
                var err1 = error.details[0].message;
                return res.render('updateprofile', {
                    error3: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'gender') {
                var err1 = error.details[0].message;
                return res.render('updateprofile', {
                    error4: err1,
                    values: req.body
                });
            }

            if (error.details[0].context.key == 'hobby') {
                var err1 = error.details[0].message;
                return res.render('updateprofile', {
                    error5: err1,
                    values: req.body
                });
            }

            if (error.details[0].context.key == 'mobile') {
                var err1 = error.details[0].message;
                return res.render('updateprofile', {
                    error6: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'city') {
                var err1 = error.details[0].message;
                return res.render('updateprofile', {
                    error8: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'Email') {
                var err1 = error.details[0].message;
                return res.render('updateprofile', {
                    error9: err1,
                    values: req.body
                });
            }
        }
        const Email = req.user.Email;
        const upadteprofile = {
            fname: req.body.fname,
            mname: req.body.mname,
            lname: req.body.lname,
            gender: req.body.gender,
            hobby: req.body.hobby,
            mobile: req.body.mobile,
            Image: req.file.filename,
            city: req.body.city,
            Email: req.body.Email,
        };
        if (req.user) {
            upadteprofile.Image = req.user.Email
        }
        const userUpdate = await AuthModel.updateOne({ Email }, upadteprofile)
        if (userUpdate) {
            res.redirect('/viewprofile')
        } else {
            return res.render('updateprofile', {
                error: "user details updation failed",
                values: req.body
            });
        }
    } catch (err) {
        logger.error("err", err);

    }
};