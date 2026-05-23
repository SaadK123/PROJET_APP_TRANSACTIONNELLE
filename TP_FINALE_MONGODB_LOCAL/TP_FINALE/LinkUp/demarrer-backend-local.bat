@echo off
echo Demarrage du backend LinkUp avec Docker en utilisant les bases locales...
echo.

cd /d "%~dp0"

if not exist pom.xml (
    echo ERREUR: pom.xml introuvable.
    echo Mets ce fichier dans le dossier du backend.
    pause
    exit /b
)

if not exist Dockerfile (
    echo ERREUR: Dockerfile introuvable.
    echo Cree le Dockerfile dans le meme dossier que pom.xml.
    pause
    exit /b
)

echo Construction de l'image Docker...
docker build -t linkup-backend-local .

echo.
echo Arret de l'ancien conteneur si deja lance...
docker rm -f linkup-backend-local-container >nul 2>&1

echo.
echo Lancement du backend sur http://localhost:8080
echo.

docker run --name linkup-backend-local-container ^
    -p 8080:8080 ^
    linkup-backend-local

echo.
echo Backend arrete.
pause