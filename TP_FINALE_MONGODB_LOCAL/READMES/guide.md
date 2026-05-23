# Guide de lancement - LinkUp

## Petite note avant de commencer

On voulait juste prevenir quon est vraiment desole si le lancement du projet est un peu plus long que prevu

Pendant le push finale on a eu plusieurs problemes avec les anciennes bases de donnees. En gros on a du repartir plus proprement parce que les anciens services en ligne commencaient a poser probleme avec les limites gratuites et les comptes utilisees

Au debut on pensait que cetait juste une maintenance ou un petit probleme temporaire. Apres verification on a compris que le probleme venait plutot du service utilise pour la base MongoDB. Par exemple sur Back4App le plan gratuit donne seulement 250 MB de stockage de donnees donc environ 0.250 Go. Apres cette limite il faut passer a une offre payante pour avoir plus de ressources

Ce quon a fait cest quon a change la base utilise par le projet. Marat qui est dans notre equipe avait encore une base de donnees disponible de son cote avec une configuration valide. On a donc simplement fait pointer le projet vers cette nouvelle base MongoDB

Les informations sensibles ne sont pas ecrites directement dans le code. On utilise les GitHub Secrets pour garder les cles et les liens de connexion caches dans GitHub. Le principe reste le meme le projet utilise une cle secrete mais la valeur pointe maintenant vers la nouvelle base de donnees

On a aussi ajuste un petit bout du code au niveau des reponses d'invitations pour que ca fonctionne correctement avec la configuration MongoDB utilise maintenant

Le but cest vraiment que vous puissiez lancer le projet creer plusieurs comptes et tester l'application sans perdre l'acces aux donnees ou tomber sur une base qui ne repond plus

Si jamais vous voulez des preuves ou des captures d'ecran du probleme vous pouvez nous contacter sur Teams et on pourra vous les envoyer

---

## 1. Ouvrir Docker Desktop

Avant de demarrer le projet ouvrir **Docker Desktop** et le laisser ouvert

Attendre que Docker soit completement demarre

---

## 2. Demarrer le backend

Aller dans le dossier du backend

Double-cliquer sur le fichier:

```txt
demarrer-backend-docker-local.bat
```

Ou encore mieux ouvrir un terminal et faire:

```txt
cd ..\..\LinkUp
.\demarrer-backend-local.bat
```

Le backend demarre sur:

```txt
http://localhost:8080
```

Laisser la fenetre du backend ouverte pendant l'utilisation du projet

---

## 3. Demarrer le frontend

Aller dans le dossier du frontend avec VS Code

Ouvrir un terminal dans le dossier du frontend

Installer les dependances normal du projet:

```bash
npm install
```

Installer FullCalendar:

```bash
npm install fullcalendar
```

Demarrer le frontend:

```bash
npm run dev
```

Le frontend demarre sur:

```txt
http://localhost:3000
```

---

## 4. Ouvrir l'application

Dans le navigateur ouvrir:

```txt
http://localhost:3000
```

