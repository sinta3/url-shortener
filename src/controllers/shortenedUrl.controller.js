const shortenedUrlService = require('@services/shortenedUrl.service');

async function redirectUrl(req, res, next) {
    try {
        const originalUrl = await shortenedUrlService.getOriginalUrl(req,res);

        return res.redirect(originalUrl);
    } catch (err) {
        next(err); 
    }
}

async function createShortenedUrl(req, res, next) {
    try {
        const createUrlResult = await shortenedUrlService.createShortenedUrl(req,res);
        res.status(200).json(createUrlResult);
    } catch (err) {
        next(err); 
    }
}

module.exports = {
    createShortenedUrl,
    redirectUrl
};