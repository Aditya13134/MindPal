const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../out');
const publicDir = path.join(__dirname, '../public');
const extensionDir = path.join(__dirname, '../extension');

console.log('🚀 Starting extension packaging...');

// Create extension directory
if (!fs.existsSync(extensionDir)) {
  fs.mkdirSync(extensionDir, { recursive: true });
  console.log('📁 Created extension directory');
} else {
  // Clean existing directory
  fs.rmSync(extensionDir, { recursive: true, force: true });
  fs.mkdirSync(extensionDir, { recursive: true });
  console.log('🧹 Cleaned and recreated extension directory');
}

// Copy built files
if (fs.existsSync(sourceDir)) {
  copyDir(sourceDir, extensionDir);
  console.log('📦 Copied built files from /out');
} else {
  console.error('❌ Build output directory not found. Make sure to run build:extension first.');
  process.exit(1);
}

// Copy manifest and content script
const filesToCopy = ['manifest.json', 'content-script.js'];
let copiedFiles = 0;

filesToCopy.forEach(file => {
  const sourcePath = path.join(publicDir, file);
  const destPath = path.join(extensionDir, file);
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    copiedFiles++;
    console.log(`✅ Copied ${file}`);
  } else {
    console.warn(`⚠️  ${file} not found in public directory`);
  }
});

console.log(`\n🎉 Extension packaged successfully!`);
console.log(`📂 Location: ./extension directory`);
console.log(`📋 Files copied: ${copiedFiles}/${filesToCopy.length} extension files`);
console.log(`\n🔧 To install:`);
console.log(`   1. Open Chrome and go to chrome://extensions/`);
console.log(`   2. Enable "Developer mode" (top right toggle)`);
console.log(`   3. Click "Load unpacked"`);
console.log(`   4. Select the ./extension folder`);

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