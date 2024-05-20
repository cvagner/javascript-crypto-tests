import crypto from 'crypto';

// Générer une clé
function generateRandomKey(length) {
  return crypto.randomBytes(length).toString('hex');
}
function generateRandomKey256b(length) {
  // 32 bytes = 256 bits
  return generateRandomKey(32);
}

console.log('Clé AES-256 générée         :', generateRandomKey256b());




// Chiffrement AES-256-CBC est un algorithme de chiffrement symétrique (la même clé est utilisée pour chiffrer et déchiffrer).
const algorithm = 'aes-256-ctr';

function encryptText(text, key) {
    let iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decryptText(text, key) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

const cle = 'a877a54ef5dbd29ca1bad228b0eaa41679c3f5cce2dc91055a570b3a9b02323e';
const texte = 'Une donnée sensible';

console.log('Donnés à chiffrer           :', texte);

const texteEncrypte = encryptText(texte, cle);
console.log('Donnés chiffrées par node   :', texteEncrypte);

const decryptedText = decryptText(texteEncrypte, cle);
console.log('Donnés déchiffrées par node :', decryptedText);

