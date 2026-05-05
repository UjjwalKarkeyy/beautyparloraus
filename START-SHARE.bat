@echo off
title Brow Beauty Hub - Share with Client
color 0A

echo =====================================
echo  BROW BEAUTY HUB - Starting...
echo =====================================
echo.

:: Kill anything already on port 3000
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000 " 2^>nul') do (
    taskkill /PID %%a /F >nul 2>&1
)

:: Start Node.js server in background
echo [1/2] Starting website server...
start "BBH Server" /min cmd /c "cd /d %~dp0 && node server.js"
timeout /t 3 /nobreak >nul

:: Start Cloudflare tunnel
echo [2/2] Creating public link...
echo.
echo =====================================
echo  Your public URL will appear below.
echo  Send this link to your client!
echo =====================================
echo.
"%~dp0cloudflared.exe" tunnel --url http://localhost:3000

pause
