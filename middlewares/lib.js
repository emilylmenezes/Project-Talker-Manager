const crypto = require('crypto');

function lib() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = lib;