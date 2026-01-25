@echo off
echo.
echo ========================================
echo   COMPLETE CLEAN REBUILD
echo ========================================
echo.

echo Step 1: Killing all Node processes...
taskkill /F /IM node.exe >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Node processes killed
) else (
    echo ✓ No Node processes running
)

echo.
echo Step 2: Deleting .next folder...
if exist .next (
    rmdir /s /q .next
    echo ✓ .next deleted
) else (
    echo ✓ .next doesn't exist
)

echo.
echo Step 3: Deleting node_modules\.cache...
if exist node_modules\.cache (
    rmdir /s /q node_modules\.cache
    echo ✓ node_modules\.cache deleted
) else (
    echo ✓ node_modules\.cache doesn't exist
)

echo.
echo Step 4: Deleting .next\cache...
if exist .next\cache (
    rmdir /s /q .next\cache
    echo ✓ .next\cache deleted
) else (
    echo ✓ .next\cache doesn't exist
)

echo.
echo ========================================
echo   ✓ CLEAN COMPLETE!
echo ========================================
echo.
echo Now run: npm run dev
echo.
pause
