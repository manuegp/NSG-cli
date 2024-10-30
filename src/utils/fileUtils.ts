import fs from 'fs';

export function createDirectory(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Directorio creado: ${dirPath}`);
  }
}

export function createFile(filePath: string, content: string): void {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Archivo creado: ${filePath}`);
}
