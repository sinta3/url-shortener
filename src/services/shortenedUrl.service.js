const { generateShortCode } = require('@services/counterShortenedCode.service');
const mongoose = require('mongoose')
const ShortenedUrl = require('@models/shortenedUrl.model');
const ShortenedUrlModel = require('@models/shortenedUrl.model');
const UserModel= require('@models/user.model');

async function createShortenedUrl(req,res) {
    try {
        const { originalUrl } = req.body;
        const { email } = req.userData;

        const userDetail = await UserModel.findOne({ email });
        if (!userDetail) {
            const error = new Error('User not found for this authentication');
            error.status = 400;
            throw error;
        };

        const existingUrl = await ShortenedUrl.findOne({originalUrl});
        if (existingUrl) {
            const error = new Error('Original url already exists, please chose others');
            error.status = 400;
            throw error;
        };

        const shortenedCode = await generateShortCode();
        const shortenedUrlData = new ShortenedUrlModel({
            _id: new mongoose.Types.ObjectId(),
            userId: userDetail._id,
            originalUrl,
            shortenedCode,
            createdAt: new Date()
        });
          
        const saveUrl = await ShortenedUrlModel.create(shortenedUrlData)
        if (saveUrl) {
            const jsonRes = {
                message: 'Create url shortener success',
                data: {
                    originalUrl,
                    shortenedUrl: `${process.env.BASE_URL}/shortened/${shortenedCode}`
                }
            }
            return jsonRes;
        } {
            const error = new Error("Failed to create url shortener");
            error.status = 400;
            throw error;
        }
    } catch (err) {
      throw err;
    }
}

async function getOriginalUrl(req,res){
    try {
        const { shortCode } = req.params;
        const urlDoc = await ShortenedUrlModel.findOne({ shortenedCode: shortCode });

        if (!urlDoc) {
            const error = new Error("Short URL not found");
            error.status = 400;
            throw error;
        }

        return urlDoc.originalUrl;
    } catch (err) {
       throw err;
    }
}

module.exports = {
    createShortenedUrl,
    getOriginalUrl
}