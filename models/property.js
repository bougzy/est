const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: String,
    description: String,
    location: String,
    email: String,
    phone: String,
    image: String,
});

module.exports = mongoose.model('Property', propertySchema);
