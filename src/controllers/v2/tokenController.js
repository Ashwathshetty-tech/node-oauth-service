const jwt = require('jsonwebtoken');
const redis = require('redis');
const client = redis.createClient();
client.connect();

const generateAccessToken = (payload, scopes) => {
  return jwt.sign({ ...payload, scopes }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const exchangeAuthCode = async (req, res) => {
  const { auth_code } = req.body;

  const data = await client.get(auth_code);

  if (!data) {
    return res.status(400).json({ message: 'Invalid or Expired Authorization Code' });
  }

  const { client_id, user_id } = JSON.parse(data);

  const accessToken = generateAccessToken({ client_id, user_id }, ['read', 'write']);
  const refreshToken = generateRefreshToken({ client_id, user_id });

  await client.del(auth_code); // Delete used auth code

  res.json({ access_token: accessToken, refresh_token: refreshToken,token_type: 'Bearer', expires_in: process.env.ACCESS_TOKEN_EXPIRY });
};

module.exports = { exchangeAuthCode };
