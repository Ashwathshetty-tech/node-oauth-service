const checkScopes = (requiredScopes) => {
    return (req, res, next) => {
      const clientScopes = req.client.scopes;
  
      const hasScopes = requiredScopes.every(scope => clientScopes.includes(scope));
  
      if (!hasScopes) {
        return res.status(403).json({ message: 'Forbidden: Insufficient scopes' });
      }
  
      next();
    };
  };
  
  module.exports = checkScopes;