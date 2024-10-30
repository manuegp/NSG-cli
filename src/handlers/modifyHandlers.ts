import fs from 'fs';
import path from 'path';

// Modifica solo la parte de la ruta en el archivo notFoundRedirect.ts
export const modifyNotFoundMiddleware = (newRoute: string): void => {
  const filePath = path.join(process.cwd(), 'src', 'middleware', 'notFoundRedirect.ts');

  // Leer el contenido del archivo
  let fileContent = fs.readFileSync(filePath, 'utf-8');

  // Expresión regular para encontrar y reemplazar la ruta en `res.redirect()`
  const routeRegex = /res\.redirect\(['"](.+)['"]\)/;

  // Reemplazar solo la ruta
  fileContent = fileContent.replace(routeRegex, `res.redirect('${newRoute}')`);

  // Escribir el contenido actualizado en el archivo
  fs.writeFileSync(filePath, fileContent, 'utf-8');
  console.log(`El middleware notFoundRedirect ha sido modificado para redirigir a: ${newRoute}`);
};
