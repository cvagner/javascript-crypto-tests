import crypto from 'crypto';
import fs from 'fs';

/**
 * Génére la paire de clés et la sauvegarde sur disque.
 *
 * @param {publicKeyPath} chemin vers la clé publique au format pem
 * @param {privateKeyPath} chemin vers la clé privée au format pem
 * @param {passphrase} passphrase éventuelle
 */
function generateKeyFiles(passphrase = '', publicKeyPath = 'public_key.pem', privateKeyPath = 'private_key.pem') {
    // Génère la paire
    const keyPair = crypto.generateKeyPairSync('rsa', { 
        modulusLength: 2048, 
        publicKeyEncoding: { 
            type: 'spki', 
            format: 'pem'
        }, 
        privateKeyEncoding: { 
            type: 'pkcs8', 
            format: 'pem', 
            cipher: 'aes-256-cbc', 
            passphrase: passphrase
        }
    }); 
       
    // Sauvegarde des clés sur disque
    fs.writeFileSync(publicKeyPath, keyPair.publicKey); 
    fs.writeFileSync(privateKeyPath, keyPair.privateKey); 
}
 
/**
 * Chiffre les données avec la clé publique.
 *
 * @param {publicKeyPem} clé publique au format pem
 * @param {data} données à chiffrer
 **/
function encryptData(publicKeyPem, data) {
  const encrypted = crypto.publicEncrypt({
      key: publicKeyPem,
      oaepHash: 'SHA256'
  }, Buffer.from(data, 'utf8'));
  return encrypted.toString('base64');
}

/**
 * Déchiffre les données avec la clé privée.
 *
 * @param {privateKeyPem} clé privée au format pem
 * @param {passphrase} passphrase
 * @param {data} les données à chiffrer
 **/
function decryptData(privateKeyPem, passphrase = '', encryptedData) {
  const decrypted = crypto.privateDecrypt({
      key: privateKeyPem,
      passphrase,
      oaepHash: 'SHA256'
  }, Buffer.from(encryptedData, 'base64'));
  return decrypted.toString('utf8');
}



/**
 * Fonction principale de tests.
 **/
function main() {
    const passphrase = '';

    //generateKeyFiles(passphrase)

    // Paire de clés publique et privée générée avec generateKeyFiles

    const publicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1lyHU8vhYu85c9V672ko
B0sJkkA2pofd4Vp0svTnULqchd+qOsnTUmhMPQhNTy2bfniwnvAtaupO6xFWXqwQ
WAeMRtTtzxR/yA547c3zqTa7b/nBNZYvIsyg/B+PcpaJS4OPoRNFwMxX08tkzeMa
7FZuC0xjENW5zUz1dhl9v+TUtSEsWI8oekq1B7hQ1GhUOF/z/rXw/Pya/mXgpywI
Pi8vTedIRvvMaRL3cL4d5HiaOFtlaYv31nCgfybNXtkh/TZ+RHuqM0Xo204m18We
EcGnW5UbSoyHeRDTkA3BYzTzdj7G6mbECSIjEwnqRjCOdAYd8SGUcr4F/S6Mngqo
mwIDAQAB
-----END PUBLIC KEY-----`;

    const privateKeyPem = `-----BEGIN ENCRYPTED PRIVATE KEY-----
MIIFLTBXBgkqhkiG9w0BBQ0wSjApBgkqhkiG9w0BBQwwHAQIwUhKUg2DEm4CAggA
MAwGCCqGSIb3DQIJBQAwHQYJYIZIAWUDBAEqBBAmkUAPm7U6sir+4VtSYBjkBIIE
0IAh+mb2CP7B9fsWrY/yKPBGYu+Gtb65Of31p5nlXk/b/GD/FdVTBlcJ9IBXdC7z
b6alOrzhe6Ln+Z5A4AiGJiP3j+3CWUczWL6uqi314Hg1y7iq2Ul/q93sAysMxsCx
XrvRNqKrWfrF0Uuk5hZXX+3+REiGeJWhUxp4YX5CZQGqWf40R+RQSyaNPm6pPVuC
6ILXuy2vmB9TGS2/skrBfKJE1w1UamlY7S/LaE1ZhJ35KlK4/0zuI5nZs8288G1w
jTH5SVTqlMda6g8wEVOiHC8UIqAAEOvCsFHuc8991prS0K1PLH5t0y8JpRXFkZkS
IRuFUxyT2QrN75UOfd/mlArTPCGvJBDl+Fd2PCav41tcbWlmQnFKW7KUkZbBBOOY
8Vdifmn1oNrg57cym71G89WqCt7ezpTDLr6bKZLIRN220BhCsA7Nq7so1WMDuIkp
SGQsO3yHelY22vMu2zMO5CJBOzSU3CWmpu6Eds80PPpx2kZzXZWZUPfqEtzF6LcH
mSUJ3hS+H1opYKqT/AbJ1XHjUDPiC9nO+Yge9/Fg7seBYOnpPqF7YMPAduNFx7jr
z7ZMpIXZ98JBbR8Va5qQ9BzKKcWtyt5tHvehyBNNhXtS6JExDgZqRYK1w0uSoiwR
IsOKg/6beE0WLkY4RTNc2UBGb0/ESsob2E8Ts4aY7e7AmP4kh+wzx6sP2PQBLCyf
+oVXCU0/gr4vKKzClD99RVTJy9ygmamNes1HLMji/8gxAXZ4PuzzFquIbJEOGNJh
qsGGReukYgGaqZsuvhAfs4oPO6O3tqe+/7d1uq0oJJC3eG7GfSxXbaLUVfUGWuHN
coSXe/3PzdLk2vDsCd9EEgnZcAi97WeQadS+A46sYHwAEUH7w4kuv2QfgC/rRXon
G9+JojiKprfBXidRq7ETsDztmBwG06/jTtBTVKRxN/8ZY3N+3jDTDFHXYsUjZe+q
5MplPKbzaHJ7iR7GET9HHCOHZ2VYJvfUvhW6mr4ZMsO6er8FZFkqg9PA9tRvOMCr
7m17sYE7OSSVwG7HFpimX0dCPkt+G4AKNPlXN7lYzB9yhf4ICTsJpt8fCZcZrQ7D
u9uZ/wh1WAZ0ieuEttqp22m0ATTKXPM3zsAnfh/x85abKs4DwrFHbITIjIuidWbC
Fb7F6NGLE16U+fF9EHJWTgZ1HbSVeK9FDfrIsuvMmsbR1p05UXKvymUCp+NiiUVj
218s5UWPHogJ9zAHf+uwJGXMYHyM5Znvfq9VcwJrQPzeDPoR3ukC73r090NOb/EC
4nkqUk7P4MoZSOwSFoAoGWpEk6Us9W6NGu17TtkOPQlVMZ5FifbjwhGlb2vE8Au4
OZRskjICakCewPvymVpvltEq65XDcms+ML4FGoG19sKaJpgj8VAEtyZKtIZh2Q9i
2ebkutqKXP2ciSPqruubI4GEPxDJGtg4GS1/zW+fwmI5P2kihvB+mskjX2chw2XS
n6bYHBwfIsuO5ezFZuEFvByuDW9jvNCoez/uTVkzI+/fX3d3NKukkAF71Ul8Akyj
+kaPKYLnFkGucVMcmbQMOXM9XTsH2Hef1VvZXkinPFIQBqUgUpvLvrPDBf4b51OS
MfO3wIKqNMUhyBOSW86oif5ftlvPMNR5AGS8borytGlR
-----END ENCRYPTED PRIVATE KEY-----`;




    // Chiffre les données avec la clé publique
    //const publicKeyPem = fs.readFileSync('public_key.pem', 'utf8');
    const data = 'Hello, world depuis node !';
    const encryptedDataFromNode = encryptData(publicKeyPem, data);
    console.log('Données chiffrées par node   :', encryptedDataFromNode);


    // Déchiffre les données avec la clé privée
    //const privateKeyPem = fs.readFileSync('private_key.pem', 'utf8');
    const decryptedData = decryptData(privateKeyPem, passphrase, encryptedDataFromNode);
    console.log('Données déchiffrées par node :', decryptedData);


    // Déchiffre des données avec la clé privée, chiffrées avec la clé publique en externe
    const encryptedFromClient = 'EoU22Uf4ATdZ6t1M01s7wVYNzLNNp6kRvnQs5uTMe1QMBU7Es7mACT0GfDAbUOJ29J7/az43WfCLRbGHnz5ZqGi3obiiByyYfARhwKT/zMaTSUHqYAeMrVcsSwl0AsZf78ipr7o72a74az27rSL0TS/nWDDn6d+9aM2h2IGfCS9HtoJM9ixYMHqRu+2I07Bzmd7uB1/5s/as1n0KonnBgxJRSe1Y44KKg8z7L0amH9B9vh3yVpP2mFqMPlJaUrkoC9EvlL4Ypv3ypzEzH9vHZraAo5Z5qTiWh58G3vlW+1AUAQOUPz0y1Ad2itUjzx71S3F7rI75LGhSpoW5DNjWbg==';
    console.log('Données déchiffrées par node :', decryptData(privateKeyPem, passphrase, encryptedFromClient));
}

// Go !
main();

