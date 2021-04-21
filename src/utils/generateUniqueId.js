const crypto = require('crypto');

module.exports = function generateUniqueId(size){
    return crypto.randomBytes(size).toString('HEX');
}