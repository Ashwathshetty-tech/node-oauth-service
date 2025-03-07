const express = require('express');
const { generateAuthCode } = require('../../controllers/v2/authCodeController');
const { exchangeAuthCode } = require('../../controllers/v2/tokenController');
const { revokeToken } = require('../../controllers/v2/revokeTokenController');
const checkBlacklist = require('../../middlewares/tokenBlackList');
const router = express.Router();

router.post('/auth-code', generateAuthCode);
router.post('/token', exchangeAuthCode);
router.post('/revoke', revokeToken);
router.get('/protected', checkBlacklist, (req, res) => {
  res.json({ message: 'Protected Route Accessed' });
});

module.exports = router;