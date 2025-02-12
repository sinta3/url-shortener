const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    fullname: {type:String, required: true},
    email: {type:String, required: true},
    password: {type:String, required: true},
    createdAt: {type: Date},
    updatedAt: {type: Date}
});

module.exports = mongoose.model('User', userSchema)
