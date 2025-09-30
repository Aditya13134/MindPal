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

// Copy built files with Chrome-compatible naming
if (fs.existsSync(sourceDir)) {
  copyDirWithRename(sourceDir, extensionDir);
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

// Fix HTML files to use renamed paths
fixHtmlFiles(extensionDir);

console.log(`\n🎉 Extension packaged successfully!`);
console.log(`📂 Location: ./extension directory`);
console.log(`📋 Files copied: ${copiedFiles}/${filesToCopy.length} extension files`);
console.log(`\n🔧 To install:`);
console.log(`   1. Open Chrome and go to chrome://extensions/`);
console.log(`   2. Enable "Developer mode" (top right toggle)`);
console.log(`   3. Click "Load unpacked"`);
console.log(`   4. Select the ./extension folder`);

function copyDirWithRename(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    let destName = entry.name;

    // Rename folders starting with underscore
    if (entry.name.startsWith('_')) {
      destName = entry.name.replace(/^_/, 'next-');
      console.log(`🔄 Renaming ${entry.name} to ${destName}`);
    }

    const destPath = path.join(dest, destName);

    if (entry.isDirectory()) {
      copyDirWithRename(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function fixHtmlFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      fixHtmlFiles(fullPath);
    } else if (entry.name.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');

      // Replace _next references with next-
      content = content.replace(/\/_next\//g, '/next-next/');
      content = content.replace(/"_next\//g, '"next-next/');

      fs.writeFileSync(fullPath, content);
      console.log(`🔧 Fixed paths in ${entry.name}`);
    }
  }
}