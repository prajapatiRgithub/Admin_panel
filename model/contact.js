const mongoose = require('mongoose');
const Contact = new mongoose.Schema({

    contactname: {
        type: String
    },
    email: {
        type: String
    },
    contactnumber: {
        type: String
    },
    message: {
        type: String
    },
    date: {
        type: String
    }
});

const ContactModel = mongoose.model('Contact', Contact);
module.exports = ContactModel;