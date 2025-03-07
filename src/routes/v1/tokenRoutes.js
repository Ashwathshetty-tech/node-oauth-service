const express = require('express');
const { generateTokens, refreshAccessToken } = require('../../controllers/v1/tokenController');
const { rateLimiter, authenticateClient, checkScopes,ipWhitelist} = require('../../middlewares')
const router = express.Router();

router.post('/generate-tokens', rateLimiter, ipWhitelist,
    authenticateClient, 
    checkScopes(['read', 'write']), generateTokens);
router.post('/refresh-token', refreshAccessToken);

module.exports = router;
