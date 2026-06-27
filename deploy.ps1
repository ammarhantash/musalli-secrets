# Structura Webapp - PowerShell Deployment Script
# Run: .\deploy.ps1

Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host " STRUCTURA WEBAPP DEPLOYMENT" -ForegroundColor Cyan
Write-Host "============================================`n" -ForegroundColor Cyan

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

try {
    
    Write-Host "[1/5] Installing Dependencies..." -ForegroundColor Yellow
    npm install --no-fund --no-audit
    Write-Host "[DONE] Dependencies installed`n" -ForegroundColor Green
    
    Write-Host "[2/5] Generating Prisma Client..." -ForegroundColor Yellow
    npx prisma generate
    Write-Host "[DONE] Prisma client generated`n" -ForegroundColor Green
    
    Write-Host "[3/5] Running Database Migrations..." -ForegroundColor Yellow
    npx prisma migrate dev --name init
    Write-Host "[DONE] Database migrated`n" -ForegroundColor Green
    
    Write-Host "[4/5] Seeding Database..." -ForegroundColor Yellow
    npm run db:seed
    Write-Host "[DONE] Database seeded`n" -ForegroundColor Green
    
    Write-Host "[5/5] Starting Development Server..." -ForegroundColor Yellow
    Write-Host "`n============================================" -ForegroundColor Cyan
    Write-Host " SERVER RUNNING" -ForegroundColor Green
    Write-Host "============================================" -ForegroundColor Cyan
    Write-Host " URL: http://localhost:3000" -ForegroundColor White
    Write-Host " Press Ctrl+C to stop" -ForegroundColor White
    Write-Host "============================================`n" -ForegroundColor Cyan
    
    npm run dev
    
}
catch {
    Write-Host "`nERROR: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Check DEPLOYMENT.md for troubleshooting" -ForegroundColor Yellow
    exit 1
}
