function encodeBase62(num) {
    const BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let shortCode = "";
    while (num > 0) {
        shortCode = BASE62[num % 62] + shortCode;
        num = Math.floor(num / 62);
    }
    return shortCode || "0"; // Return "0" if num is 0
}

function getRandomLetters(length = 2) {
    let letters = "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    for (let i = 0; i < length; i++) {
        letters += chars[Math.floor(Math.random() * chars.length)];
    }

    return letters;
}

module.exports = {
    encodeBase62,
    getRandomLetters
}