
const winston = require('winston');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/adminPanel')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const Schema = mongoose.Schema;

// Create Auth Schema
const Auth = new Schema({
    fname: { type: String },
    mname: { type: String },
    lname: { type: String },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'other']
    },
    hobby: { type: Array },
    mobile: { type: String },
    Image: { type: String },
    city: { type: String },
    Email: {
        type: String,
        uniq: true
    },
    Password: { type: String }
});

const AuthModel = mongoose.model('Auth', Auth);
module.exports = AuthModel;
