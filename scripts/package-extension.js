const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../out');
const publicDir = path.join(__dirname, '../public');
const extensionDir = path.join(__dirname, '../extension');

// Create extension directory
if (!fs.existsSync(extensionDir)) {
  fs.mkdirSync(extensionDir, { recursive: true });
}

// Copy built files
if (fs.existsSync(sourceDir)) {
  copyDir(sourceDir, extensionDir);
}

// Copy manifest and content script
const filesToCopy = ['manifest.json', 'content-script.js'];
filesToCopy.forEach(file => {
  const sourcePath = path.join(publicDir, file);
  const destPath = path.join(extensionDir, file);
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
  }
});

console.log('Extension packaged successfully in ./extension directory');
console.log('To install: Load unpacked extension from the ./extension folder in Chrome');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}