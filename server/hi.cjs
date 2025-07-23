const jwt = require('jsonwebtoken');

const payload = {
  id: 1,
  username: 'koushik',
  role: 'admin'
};

const secretKey = 'your_secret_key';

// Generate token with NO expiry
const token = jwt.sign(payload, secretKey);

console.log("Lifetime JWT Token:\n", token);
