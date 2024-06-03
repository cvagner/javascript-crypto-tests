# Javascript crypto tests

L'objectif est de montrer comment réaliser des chiffrements asymétrique et symétrique en javascript avec deux exemples :
* `index-sym.js` 
  * Chiffrage symétrique en node
  * Exemple d'utilisation : le serveur chiffre et déchiffre lui-même mais on ne souhaite pas stocker l'information en clair.
* `index-asym.js` et `index-asym.html`
  * Chiffrage asymétrique avec une paire de clés : chiffrage en node ou dans le navigateur et déchiffrage en node
  * Exemple d'utilisation : le client transmet une information sensible (ex : un mot de passe) au serveur qui est le seul à pouvoir la déchiffrer.

Aucune librairie complémentaire n'est nécessaire, ni pour node, ni pour le navigateur.

## Chiffrement symétrique

Clé :
* On utilise une clé symétrique aléatoire ou on utilise une passphrase pour dériver une clé.

Chiffrement /  déchiffrement :
* Les données sont chiffrées ou déchiffrée avec la clé.

Exemple :
```sh
node index-sym.js
# ou bien
# yarn run symetrique

# Résultat (exemple)
# Clé AES-256 générée         : f24270c17f4fa831f5611304c2f653a8b806376946b7cf92b49212a72525c1bd
# Données à chiffrer           : Une donnée sensible
# Données chiffrées par node   : 661fe2cfce289fe8d513d211a46fc2c8:84cd5d7e614ba3d2b86122a02fff1f7fcdaaf638
# Données déchiffrées par node : Une donnée sensible
```

## Chiffrement asymétrique

Paire de clés :
* La clé publique est utilisée pour chiffrer les données : elle peut être distribuée librement.
* La clé privée est utilisée pour déchiffrer les données : elle ne doit pas être diffusée !
* Les clés sont liées.

Chiffrement :
* Les données sont chiffrées avec la clé publique. Une fois chiffrées, seules les personnes possédant la clé privée correspondante peuvent les déchiffrer.

Déchiffrement :
* Les données chiffrées avec la clé publique ne peuvent être déchiffrées qu'avec la clé privée correspondante.

Pour des raisons pratiques, la paire de clés est embarquée dans le code et la génération avec `generateKeyFiles` commentée. Ne pas utiliser la paire dans un autre cadre que cet exemple !

Exemple complet :
```sh
yarn run asymetrique
```

ou bien en deux temps, avec node :
```sh
node index-asym.js

# Résultat (exemple)
# Données chiffrées par node   : xquM8lZhPi0Etd19zRPfhVeM05La4WEr+TKQA4zuuJB1tKMMqPLstSDvuluKmSWn7QaNsIIoU4pIOcDax31xVCgCZT5VrhhbqZUB4XXJEI32O//hdq/9OU6arXePOzxx/5IhCVRlr7Vsb/jEtsyp+Bf9A4GxLlzLVYi5V37PSERGn2OkPz3VSP7VdQ6NSjSt5DQSoAfyY0RL1H/wE4A5GkUa7uCDVuDzeGSpqzKF3TjsNN62I1YCp5nHaZdr81H/ySJT4g+lbkf14FCZv1Ik4HPcfUY2QGP2ISeLqXAWa6BlBduHMPE8yywsUrU6r9CCCTIb+h0HG0saJa3ZKVBNng==
# Données déchiffrées par node : Hello, world depuis node !
# Données déchiffrées par node : Hello, world depuis navigateur !
```

et pour le navigateur, on ouvre `index-asym.html` :
```sh
open index-asym.html

# Résultat (exemple)
# Données chiffrées dans le navigateur :

# DXvxdBJiuM1lGTB8ujrFKuPq3lR7XQsYWStS9p0Z6S0nc/nD41yd3ouz2Sw+j7pA4HH2jVaueAu9z+ukV0iImg6DnN9lw73dp2RyrO43vuczVnA+2s4FkmN9tFkIx5dKPQrdVjaP/7QDxHYWG26exmN+MybWqkdXr7b6OW6KcDG8xw5zzwSRcOBNR1y5cWPBM24jQq4WdU6Eqrt2x2qm4vekCXYqhO14FXasemDyRwXbxfI1WM53mXEYTaU4JzQjQKJct0iqW1Rq58elMbiCNiBXis8Tof1QvsUV4cr/x0uLvVRC6wabt180IimwU71mH+CqYWV79N/Djn+tWFME5g==
```