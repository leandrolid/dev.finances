const mongoose = require('mongoose');

const InflowSchema = new mongoose.Schema({
    description: String,
    price: Number,
    date: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    type: Boolean
});

module.exports = mongoose.model('Inflow', InflowSchema);

