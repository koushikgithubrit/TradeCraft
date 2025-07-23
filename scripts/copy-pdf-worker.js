import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '..', 'node_modules', 'pdfjs-dist', 'build');
const targetDir = path.join(__dirname, '..', 'public', 'pdfjs');
const sourceFile = path.join(sourceDir, 'pdf.worker.min.js');
const targetFile = path.join(targetDir, 'pdf.worker.min.js');

try {
  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    console.log('Creating pdfjs directory in public folder...');
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Check if source file exists
  if (!fs.existsSync(sourceFile)) {
    throw new Error(`Source file not found: ${sourceFile}`);
  }

  // Copy the file
  console.log('Copying PDF.js worker file...');
  fs.copyFileSync(sourceFile, targetFile);
  console.log('PDF.js worker file copied successfully!');
} catch (error) {
  console.error('Error copying PDF.js worker file:', error);
  process.exit(1);
} 