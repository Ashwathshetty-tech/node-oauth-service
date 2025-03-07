const { isBlacklisted } = require('../services/v2/blacklistService');

const checkBlacklist = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (await isBlacklisted(token)) {
    return res.status(401).json({ message: 'Token has been revoked' });
  }

  next();
};

module.exports = checkBlacklist;
