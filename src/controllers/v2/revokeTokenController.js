const { addToBlacklist } = require('../../services/v2/blacklistService');

const revokeToken = async (req, res) => {
  const token = req.body.token;

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  await addToBlacklist(token);

  res.json({ message: 'Token revoked successfully' });
};

module.exports = { revokeToken };
