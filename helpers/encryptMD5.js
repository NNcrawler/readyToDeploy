const crypto = require('crypto');

function encryptMD5(pass, salt){
  return crypto.createHmac('md5',salt).update(pass).digest("hex");
}

module.exports = encryptMD5;