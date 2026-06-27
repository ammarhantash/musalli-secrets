@echo off
REM Structura Webapp - Deployment Script for Windows

echo.
echo ============================================
echo  STRUCTURA WEBAPP DEPLOYMENT
echo ============================================
echo.

cd /d "%~dp0"

echo [1/5] Installing Dependencies...
call npm install --no-fund --no-audit
if errorlevel 1 (
    echo ERROR: npm install failed
    exit /b 1
)
echo [DONE] Dependencies installed
echo.

echo [2/5] Generating Prisma Client...
call npx prisma generate
if errorlevel 1 (
    echo ERROR: Prisma generate failed
    exit /b 1
)
echo [DONE] Prisma client generated
echo.

echo [3/5] Running Database Migrations...
call npx prisma migrate dev --name init
if errorlevel 1 (
    echo ERROR: Database migration failed
    exit /b 1
)
echo [DONE] Database migrated
echo.

echo [4/5] Seeding Database...
call npm run db:seed
if errorlevel 1 (
    echo WARNING: Database seed may have failed, but continuing...
)
echo [DONE] Database seeded
echo.

echo [5/5] Starting Development Server...
echo.
echo ============================================
echo  SERVER RUNNING
echo ============================================
echo  URL: http://localhost:3000
echo  Press Ctrl+C to stop
echo ============================================
echo.

call npm run dev

pause
