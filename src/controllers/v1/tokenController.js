const jwt = require('jsonwebtoken');
require('dotenv').config();

// Generate Access Token
const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
};

// Generate Refresh Token
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
};

const generateTokens = (req, res) => {
    const { client_id, user_id } = req.body;
    const { scopes } = req.client;
  
    const payload = { client_id, user_id };
  
    const accessToken = generateAccessToken(payload, scopes);
    const refreshToken = generateRefreshToken(payload);
  
    res.json({
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: 'Bearer',
      expires_in: process.env.ACCESS_TOKEN_EXPIRY,
      scopes
    });
};

const refreshAccessToken = (req, res) => {
    const { refresh_token } = req.body;
  
    if (!refresh_token) return res.status(400).json({ message: 'Refresh token required' });
  
    try {
      const decoded = jwt.verify(refresh_token, process.env.JWT_SECRET);
      const newAccessToken = generateAccessToken({ client_id: decoded.client_id, user_id: decoded.user_id });
      
      res.json({ access_token: newAccessToken, expires_in: process.env.ACCESS_TOKEN_EXPIRY });
    } catch (err) {
      res.status(401).json({ message: 'Invalid Refresh Token' });
    }
};
  
module.exports = { generateTokens, refreshAccessToken };
