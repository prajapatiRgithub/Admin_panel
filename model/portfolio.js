const mongoose = require('mongoose');
const Portfolio = new mongoose.Schema({

    projectCategory: {
        type: String
    },

    projectName: {
        type: String
    },

    P_image: {
        type: Array
    },

    projectTitle: {
        type: String
    },

    projectDate: {
        type: String
    },

    projectDescription: {
        type: String
    },
});

const PortfolioModel = mongoose.model('Portfolio', Portfolio);

module.exports = PortfolioModel;