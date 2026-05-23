# Guide de lancement de LinkUp

Ce document explique comment démarrer le projet **LinkUp** en mode **cloud** ou en mode **local**.  
Les deux méthodes sont regroupées dans **ce même fichier**.

---

## Choisir la bonne version

Le projet peut être lancé de deux façons :

| Mode  | Branche à utiliser | Description                                     |
| ----- | ------------------ | ----------------------------------------------- |
| Cloud | `develop`          | Utilise la version déjà configurée en ligne     |
| Local | `PROTOTYPE_LOCAL`  | Utilise le backend en local avec Docker Desktop |

---

## Version cloud

Utilisez cette version si vous voulez lancer rapidement le projet avec la configuration distante déjà prévue.

### Étapes à suivre

1. Ouvrez le projet.
2. Placez-vous sur la branche `develop`.
3. Faites un `git pull` pour récupérer la version la plus récente.
4. Ouvrez le dossier **WebApp** dans VS Code.
5. Ouvrez un terminal dans le dossier du frontend.
6. Installez les dépendances nécessaires :

```bash
npm install
npm install fullcalendar
```

7. Lancez ensuite le frontend :

```bash
npm run dev
```

### Remarque

Cette version utilise déjà la configuration distante du projet.  
Elle est pratique pour tester rapidement, mais elle peut parfois être plus lente.

---

## Version locale

Utilisez cette version si vous voulez exécuter le projet localement avec votre propre environnement.

### Étapes à suivre

1. Ouvrez le projet.
2. Placez-vous sur la branche `PROTOTYPE_LOCAL`.
3. Faites un `git pull` de la branche `PROTOTYPE_LOCAL`.
4. Ouvrez le projet dans VS Code.
5. Assurez-vous que **Docker Desktop est ouvert**.

> **Important :** le backend local ne pourra pas démarrer si Docker Desktop n’est pas lancé.

6. Placez-vous à la racine du dossier **LinkUp**.
7. Ouvrez un terminal à cet endroit.
8. Lancez le fichier `start-local.bat` avec la commande suivante :

```bash
.\start-local.bat
```

9. Attendez que le backend démarre correctement.
10. Ouvrez ensuite le dossier **WebApp** dans VS Code si ce n’est pas déjà fait.
11. Ouvrez un terminal dans le dossier du frontend.
12. Installez les dépendances nécessaires :

```bash
npm install
npm install fullcalendar
```

13. Lancez le frontend :

```bash
npm run dev
```

---

## Résumé rapide des commandes

### Mode cloud

```bash
git checkout develop
git pull
npm install
npm install fullcalendar
npm run dev
```

### Mode local

```bash
git checkout PROTOTYPE_LOCAL
git pull
.\start-local.bat
npm install
npm install fullcalendar
npm run dev
```

---

## Conseils importants

- Utilisez la **version cloud** si vous voulez simplement tester le projet rapidement , mais cela peut etre long a demarrer le serveur.
- Utilisez la **version locale** si vous voulez travailler avec le backend sur votre machine.
- Pour la version locale, **Docker Desktop doit être ouvert avant de lancer** `start-local.bat`.
- Vérifiez toujours que vous êtes dans le bon dossier avant d’exécuter une commande.

---

## Ordre recommandé pour la version locale

1. Ouvrir Docker Desktop
2. Ouvrir le projet dans VS Code
3. Se placer sur la branche `PROTOTYPE_LOCAL`
4. Faire le `git pull`
5. Lancer `start-local.bat`
6. Ouvrir le frontend
7. Faire `npm install`
8. Faire `npm install fullcalendar`
9. Faire `npm run dev`

---

## Conclusion

Le projet **LinkUp** peut être lancé en **cloud** ou en **local** selon les besoins.  
Les deux procédures sont maintenant regroupées dans **ce même fichier README**.
