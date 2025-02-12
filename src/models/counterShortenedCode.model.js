const mongoose = require('mongoose');

const counterShortenedCodeSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    uniqueKey: {type:String},
    sequenceValue: {type: Number}
});

module.exports = mongoose.model('CounterShortenedCode', counterShortenedCodeSchema)
