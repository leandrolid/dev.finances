const mongoose = require('mongoose');

const OutflowSchema = new mongoose.Schema({
    description: String,
    price: Number,
    date: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    type: Boolean
});

module.exports = mongoose.model('Outflow', OutflowSchema);

