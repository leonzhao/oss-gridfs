'use strict';

const crypto = require('crypto');

module.exports = {
  md5(data) {
    const md5Hash = crypto.createHash('sha256');
    md5Hash.update(data);
    return md5Hash.digest('hex');
  },

  genSecretKey: () => Buffer.from((Date.now() + Math.random()).toString()).toString('base64'),
};
