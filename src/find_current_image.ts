import fs from "fs";
import path from "path";

function scanForRecentFiles(dir: string, depth = 0) {
  if (depth > 6) return;
  if (dir.startsWith("/proc") || dir.startsWith("/sys") || dir.startsWith("/dev") || dir.indexOf("node_modules") !== -1 || dir.indexOf(".git") !== -1) {
    return;
  }
  try {
    const list = fs.readdirSync(dir);
    for (const item of list) {
      const fullPath = path.join(dir, item);
      let stat;
      try {
        stat = fs.statSync(fullPath);
      } catch (e) {
        continue;
      }
      if (stat.isDirectory()) {
        scanForRecentFiles(fullPath, depth + 1);
      } else {
        const diffMin = (Date.now() - stat.mtimeMs) / 1000 / 60;
        if (diffMin < 20) {
          console.log(`Recent File: ${fullPath} | Size: ${stat.size} | Age: ${diffMin.toFixed(2)} min | Mtime: ${stat.mtime.toISOString()}`);
        }
      }
    }
  } catch (e) {}
}

console.log("Scanning /app and /tmp for very recent files...");
scanForRecentFiles("/app");
scanForRecentFiles("/tmp");
