const { v4: uuidv4 } = require('uuid');
const redis = require('redis');

const client = redis.createClient({
    url: process.env.REDIS_URL,
});

client.connect();

const generateAuthCode = async (req, res) => {
  const { client_id, user_id, redirect_uri } = req.body;

  if (!client_id || !user_id || !redirect_uri) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const authCode = uuidv4(); // Random Authorization Code
  await client.set(authCode, JSON.stringify({ client_id, user_id }), {
    EX: 300, // Expire in 5 minutes
  });

  res.json({ auth_code: authCode });
};

module.exports = { generateAuthCode };
