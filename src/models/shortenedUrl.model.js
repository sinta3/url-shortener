const mongoose = require('mongoose');

const shortenedUrlSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    userId:  {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    originalUrl: {type: String, required: true, unique: true},
    shortenedCode: {type: String, required: true, unique: true},
    createdAt: {type: Date},
    updatedAt: {type: Date}
});

module.exports = mongoose.model('ShortenedUrls', shortenedUrlSchema)
