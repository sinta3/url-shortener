const express = require('express');
const router = express.Router();
const shortenedUrlController = require('@controllers/shortenedUrl.controller');
const checkAuth = require('@middlewares/checkAuth.middleware');

router.get('/:shortCode', shortenedUrlController.redirectUrl);
router.post('/newUrl', checkAuth, shortenedUrlController.createShortenedUrl);

module.exports = router;