const jwt = require('jsonwebtoken');
const { readDb } = require('../config/jsonDb');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(' ')[1];

      // Decode and verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret_jsonwebtoken_key_change_me_in_production');

      // Fetch user from JSON database
      const db = readDb();
      const user = db.users.find(u => u._id === decoded.id);

      if (!user) {
        return res.status(401).json({ message: 'User not found, authorization denied' });
      }

      // Attach user to the request (exclude password)
      const { password, ...userWithoutPassword } = user;
      req.user = userWithoutPassword;

      next();
    } catch (error) {
      console.error('Authentication Error:', error.message);
      res.status(401).json({ message: 'Not authorized, token validation failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };
