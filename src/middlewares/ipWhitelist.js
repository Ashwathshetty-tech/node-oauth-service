const { getWhitelistedIPs } = require('../helpers/flagsmith');

const ipWhitelist = async (req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  console.log('Request Ip', req.ip);
  console.log('Request Ip', req.connection.remoteAddress);

  const whitelistedIPs = await getWhitelistedIPs();

  if (whitelistedIPs.includes(clientIP)) {
    console.log(`✅ Allowed IP: ${clientIP}`);
    next();
  } else {
    console.log(`❌ Blocked IP: ${clientIP}`);
    return res.status(403).json({ message: 'Access Forbidden: Your IP is not allowed' });
  }
};

module.exports = ipWhitelist;
