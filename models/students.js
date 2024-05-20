const mongoose = require("mongoose");

const studentsScheme = mongoose.Schema({
    
    name: {
        type: String,
    },
    email: {
        type: String,
    },

    Phone: {
        type: Number,
    },
    address: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Student', studentsScheme);