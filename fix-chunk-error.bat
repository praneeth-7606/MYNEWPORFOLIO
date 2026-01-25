@echo off
echo.
echo ========================================
echo   Fixing ChunkLoadError...
echo ========================================
echo.

echo Step 1: Clearing .next cache...
if exist .next (
    rmdir /s /q .next
    echo ✓ Cache cleared
) else (
    echo ✓ No cache to clear
)

echo.
echo Step 2: Clearing node_modules/.cache...
if exist node_modules\.cache (
    rmdir /s /q node_modules\.cache
    echo ✓ Module cache cleared
) else (
    echo ✓ No module cache to clear
)

echo.
echo ========================================
echo   ✓ Done! Now run: npm run dev
echo ========================================
echo.
pause
