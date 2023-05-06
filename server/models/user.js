const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    //attributes
})

module.exports = mongoose.model('user',UserSchema);