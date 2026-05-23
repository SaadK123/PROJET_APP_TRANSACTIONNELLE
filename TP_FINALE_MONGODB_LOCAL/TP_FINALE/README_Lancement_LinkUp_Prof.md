# Guide de lancement - LinkUp

## 1. Ouvrir Docker Desktop

Avant de démarrer le projet, ouvrir **Docker Desktop** et le laisser ouvert.

Attendre que Docker soit complètement démarré.

---

## 2. Démarrer le backend

Aller dans le dossier du backend.

Double-cliquer sur le fichier:

```txt
demarrer-backend-docker-local.bat
```
ou encore mieux mettre sa dans un terminal 
cd ..\..\LinkUp 
.\demarrer-backend-local.bat

Le backend démarre sur:

```txt
http://localhost:8080
```

Laisser la fenêtre du backend ouverte pendant l'utilisation du projet.

---

## 3. Démarrer le frontend

Aller dans le dossier du frontend avec VS Code.

Ouvrir un terminal dans le dossier du frontend.

Installer les dépendances:

```bash
npm install
```

Installer FullCalendar:

```bash
npm install fullcalendar
```

Démarrer le frontend:

```bash
npm run dev
```

Le frontend démarre sur:

```txt
http://localhost:3000
```

---

## 4. Ouvrir l'application

Dans le navigateur, ouvrir:

```txt
http://localhost:3000
```

---

## Ordre résumé

```txt
1. Ouvrir Docker Desktop
2. Double-cliquer sur demarrer-backend-docker-local.bat
3. Ouvrir le frontend dans VS Code
4. npm install
5. npm install fullcalendar
6. npm run dev
7. Aller sur http://localhost:3000
```
