# projet-uf-b3

## Back

Suivre les instructions suivantes dans le dossier `back`:
+ `composer install`
+ copier le fichier `.env` dans un nouveau fichier `.env.local` puis :
    + modifier la ligne `DATABASE_URL` pour mettre le lien de votre base de données locale (la créer si elle n'existe pas)
    + créer un dossier `jwt` dans `/config`
    + lancer les commandes depuis le dossier `back` (ces commandes vous demanderons une 'passphrase') :
        + `openssl genrsa -out config/jwt/private.pem -aes256 4096`
        + `openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem`
    + dans `.env.local` ajouter votre passphrase dans la variable `JWT_PASSPHRASE`
+ lancer les migrations : `php bin/console d:m:m`
+ lancer les fixtures (données factices) : `php bin/console d:f:l`
+ lancer le serveur : `symfony server:start`

Votre API est disponible à l'url suivante : `localhost:8000/api` 

## App

Suivre les instructions suivantes dans le dossier `app`:
+ installer les dépendances : `npm install`
+ lancer l'application : `npm start`
