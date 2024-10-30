import { CommandModule } from 'yargs';
import { createProjectStructure } from '../handlers/createProject';

// Definimos el comando 'create' con su estructura
export const createCommand: CommandModule = {
  command: 'create <nombre>',
  describe: 'Genera la estructura básica de un proyecto',
  builder: (yargs) => {
    return yargs.positional('nombre', {
      describe: 'Nombre del proyecto',
      type: 'string' as const,  // Declaramos el tipo como constante
      demandOption: true,
    });
  },
  handler: (argv) => {
    const projectName = argv.nombre as string;
    createProjectStructure(projectName);
  },
};
