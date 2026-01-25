# 🔧 Fix ChunkLoadError

## ❌ The Error
```
ChunkLoadError: Loading chunk app/layout failed.
(timeout: http://localhost:3000/_next/static/chunks/app/layout.js)
```

## ✅ Quick Fix (3 Steps)

### Step 1: Clear Cache
```bash
# Delete .next folder
rm -rf .next

# Or on Windows
rmdir /s /q .next
```

**Or use the script:**
```bash
# Double-click this file:
fix-chunk-error.bat
```

### Step 2: Restart Dev Server
```bash
# Stop current server (Ctrl+C)
# Then start fresh:
npm run dev
```

### Step 3: Hard Refresh Browser
- **Windows/Linux**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`

---

## 🎯 Why This Happens

**ChunkLoadError** occurs when:
1. Next.js build cache is stale
2. Hot reload fails during development
3. File changes aren't picked up properly
4. Browser cache conflicts with new chunks

---

## 🔍 Detailed Solutions

### Solution 1: Clear Everything (Recommended)

```bash
# 1. Stop dev server (Ctrl+C)

# 2. Clear all caches
rm -rf .next
rm -rf node_modules/.cache

# 3. Restart
npm run dev
```

### Solution 2: Full Reset (If Solution 1 Doesn't Work)

```bash
# 1. Stop dev server

# 2. Clear everything
rm -rf .next
rm -rf node_modules/.cache
rm -rf node_modules

# 3. Reinstall
npm install

# 4. Restart
npm run dev
```

### Solution 3: Check for Syntax Errors

Run diagnostics:
```bash
npm run lint
```

Fix any errors shown, then restart.

---

## 🚀 Prevention Tips

### 1. Always Restart After Major Changes
When you add new files or dependencies:
```bash
# Stop server (Ctrl+C)
npm run dev
```

### 2. Clear Cache Regularly
If you're making lots of changes:
```bash
rm -rf .next && npm run dev
```

### 3. Use Hard Refresh
After code changes, use:
- `Ctrl + Shift + R` (Windows/Linux)
- `Cmd + Shift + R` (Mac)

### 4. Check File Paths
Make sure imports are correct:
```javascript
// ✅ Correct
import ChatWidget from "./components/chat/ChatWidget";

// ❌ Wrong
import ChatWidget from "./components/ChatWidget"; // Wrong path
```

---

## 🐛 Still Not Working?

### Check 1: Verify Files Exist
```bash
# Check if ChatWidget exists
ls app/components/chat/ChatWidget.jsx

# Should show the file
```

### Check 2: Check for Syntax Errors
```bash
npm run lint
```

### Check 3: Check Console
Open browser DevTools (F12):
- Look for red errors
- Check Network tab for failed requests

### Check 4: Check Terminal
Look at the terminal where `npm run dev` is running:
- Any compilation errors?
- Any module not found errors?

---

## 📋 Troubleshooting Checklist

- [ ] Stopped dev server (Ctrl+C)
- [ ] Deleted `.next` folder
- [ ] Deleted `node_modules/.cache` folder
- [ ] Restarted dev server (`npm run dev`)
- [ ] Hard refreshed browser (Ctrl+Shift+R)
- [ ] Checked for syntax errors (`npm run lint`)
- [ ] Verified file paths are correct
- [ ] Checked browser console for errors
- [ ] Checked terminal for errors

---

## 🎯 Common Causes & Fixes

### Cause 1: Stale Cache
**Fix**: Delete `.next` folder and restart

### Cause 2: Import Path Wrong
**Fix**: Check import paths in `layout.js`
```javascript
// Make sure this path is correct:
import ChatWidget from "./components/chat/ChatWidget";
```

### Cause 3: File Not Saved
**Fix**: Save all files (Ctrl+S) and restart

### Cause 4: Port Conflict
**Fix**: Kill process on port 3000
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Cause 5: Node Modules Corrupted
**Fix**: Reinstall dependencies
```bash
rm -rf node_modules
npm install
```

---

## 🚀 Quick Commands

### Clear Cache & Restart
```bash
rm -rf .next && npm run dev
```

### Full Clean & Restart
```bash
rm -rf .next node_modules/.cache && npm run dev
```

### Nuclear Option (Full Reset)
```bash
rm -rf .next node_modules && npm install && npm run dev
```

---

## ✅ Success Indicators

After fixing, you should see:
1. ✅ No errors in terminal
2. ✅ Server running on http://localhost:3000
3. ✅ Page loads without errors
4. ✅ Chat button visible in bottom-right
5. ✅ No red errors in browser console

---

## 📞 Still Having Issues?

If none of these work:

1. **Check Node Version**
   ```bash
   node --version
   # Should be 18.x or higher
   ```

2. **Check Next.js Version**
   ```bash
   npm list next
   # Should be 14.x
   ```

3. **Try Different Port**
   ```bash
   PORT=3001 npm run dev
   ```

4. **Check File Permissions**
   Make sure you have write permissions in the project folder

---

## 🎉 Fixed!

Once it works:
1. ✅ Chat button appears in bottom-right
2. ✅ Click to open chat
3. ✅ Type a message
4. ✅ Get AI response

**Enjoy your AI-powered portfolio!** 🚀

---

**Quick Fix Script**: Run `fix-chunk-error.bat` (Windows) or delete `.next` folder manually
