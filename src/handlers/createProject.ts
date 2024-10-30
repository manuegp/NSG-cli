import path from 'path';
import { execSync } from 'child_process';
import { createDirectory, createFile } from '../utils/fileUtils';
import { getEnvContent, getIndexTsContent, getTsConfigContent, getRouteHandlerContent, getRoutesTsContent, getNotFoundMiddlewareContent } from '../files/fileContents';  // Añadimos la función para obtener el contenido de routes.ts
import fs from 'fs';

export function createProjectStructure(projectName: string): void {
  const basePath = path.join(process.cwd(), projectName);

  // Crear la estructura de directorios
  const directories = [
    path.join(basePath, 'src'),
    path.join(basePath, 'src', 'utils'),
    path.join(basePath, 'src', 'routes'),  // Nueva carpeta 'routes'
    path.join(basePath, 'src', 'middleware'),  // Nueva carpeta 'middleware'
  ];

  directories.forEach(dir => {
    createDirectory(dir);
  });

  // Crear los archivos en el directorio base del proyecto
  const files = [
    { name: 'src/index.ts', content: getIndexTsContent() }, // Generamos el contenido de 'index.ts'
    { name: 'src/routes/ping.ts', content: getRouteHandlerContent('ping') }, // Generamos el contenido de 'ping.ts' con la ruta /ping
    { name: 'src/middleware/notFoundRedirect.ts', content: getNotFoundMiddlewareContent() }, // Middleware para redirigir rutas no encontradas
    { name: 'src/routes.ts', content: getRoutesTsContent() }, // Generamos el contenido de 'routes.ts' que combina todas las rutas
    { name: '.env', content: getEnvContent() },             // Generamos el contenido de '.env'
    { name: 'tsconfig.json', content: getTsConfigContent() } // Generamos el contenido de 'tsconfig.json'
  ];

  files.forEach(file => {
    createFile(path.join(basePath, file.name), file.content);
  });

  console.log(`Estructura del proyecto ${projectName} generada correctamente.`);

  // Inicializar npm y agregar dependencias
  console.log(`Inicializando proyecto npm en ${basePath}...`);
  try {
    // Cambiar al directorio del proyecto
    process.chdir(basePath);

    // Inicializar el proyecto npm
    execSync('npm init -y', { stdio: 'inherit' });

    // Instalar dependencias
    console.log('Instalando dependencias...');
    execSync('npm install express dotenv nodemon socket.io typescript', { stdio: 'inherit' });

    // Instalar dependencias de desarrollo
    console.log('Instalando dependencias de desarrollo...');
    execSync('npm install --save-dev @types/express @types/node', { stdio: 'inherit' });

    // Modificar package.json para agregar scripts
    const packageJsonPath = path.join(basePath, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    // Agregar scripts
    packageJson.scripts = {
      ...packageJson.scripts,
      start: 'node dist/index.js',         // Script para ejecutar el archivo compilado
      build: 'tsc',                        // Script para compilar TypeScript
      dev: 'nodemon src/index.ts',         // Script para levantar el servidor con recarga reactiva
    };

    // Guardar los cambios en package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf-8');

    console.log('Scripts añadidos al package.json con éxito.');
    console.log('Proyecto npm inicializado con éxito.');
  } catch (error) {
    console.error('Error durante la inicialización de npm:', error);
  }
}
