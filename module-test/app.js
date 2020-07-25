'use strict';

// const crypto = require('crypto');
const fs = require('fs');

// function loadKey(file) {
//     return fs.readFileSync(file, 'utf8')
// }

// let prvKey = loadKey('./rsa-prv.pem');
// let pubKey = loadKey('./rsa-pub.pem');
// let message = 'Hello, world!';

// let enc_by_prv = crypto.privateEncrypt(prvKey, Buffer.from(message, 'utf8'));
// console.log('encrypted by private key: ' + enc_by_prv.toString('hex'));

// let dec_by_pub = crypto.publicDecrypt(pubKey, enc_by_prv);
// console.log('decrypted by public key: ' + dec_by_pub.toString('utf8'));


let data = '0000001063786964be7acfcb97a942e8'
let buf = new Buffer(data, 'hex')
fs.writeFileSync('./cxid', buf)