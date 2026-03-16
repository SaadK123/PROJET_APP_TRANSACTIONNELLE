@echo off
setlocal

echo Demarrage de PostgreSQL, MongoDB et du backend...
docker compose up --build

endlocal