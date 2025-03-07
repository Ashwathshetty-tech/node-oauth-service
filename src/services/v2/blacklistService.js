const redis = require('redis');
const client = redis.createClient({
  url: process.env.REDIS_URL,
});
client.connect();

const addToBlacklist = async (token) => {
  await client.set(token, 'blacklisted', { EX: 3600 }); // 1 hour expiry
};

const isBlacklisted = async (token) => {
  const result = await client.get(token);
  return result === 'blacklisted';
};

module.exports = { addToBlacklist, isBlacklisted };
