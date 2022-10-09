const crypto = require('crypto');

function serviceCrypto() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = serviceCrypto;