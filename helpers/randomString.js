'use strict';
const crypto = require('crypto');

function randomString(length) {
  return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}
//var hash = crypto.createHash('sha256').update('pwd').digest('base64');
console.log(crypto.createHmac('md5','j39aln3Q').update('magnetowhy').digest("hex"));

module.exports = randomString;