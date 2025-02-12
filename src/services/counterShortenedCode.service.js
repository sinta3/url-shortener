
const CounterModel = require('@models/counterShortenedCode.model');
const { encodeBase62, getRandomLetters } = require('@utils/helper.util')

async function generateShortCode() {
    const counter = await CounterModel.findOneAndUpdate(
        { uniqueKey: "url_count" },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true }
    );

    const shortCode = encodeBase62(counter.sequenceValue);
    const randomPart = getRandomLetters(2);

    return shortCode + randomPart; 
}

module.exports = {
    generateShortCode
}