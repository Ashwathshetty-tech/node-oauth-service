const clients = require('../config/clients');

const authenticateClient = (req, res, next) => {
  const { client_id, client_secret } = req.body;

  const client = clients.find(c => c.client_id === client_id && c.client_secret === client_secret);
  
  if (!client) {
    return res.status(401).json({ message: 'Invalid client credentials' });
  }

  req.client = client; // Attach client info to request object
  next();
};

module.exports = authenticateClient;
