import { CommandModule } from 'yargs';
import { modifyNotFoundMiddleware } from '../handlers/modifyHandlers';  // Importamos la lógica que manejará la modificación

export const modifyCommand: CommandModule = {
  command: 'modify <type> <value>',
  describe: 'Modifica el valor de una parte específica del proyecto',
  builder: (yargs) => {
    return yargs
      .positional('type', {
        describe: 'El tipo de modificación (e.g., notFound)',
        type: 'string' as const, 
        demandOption: true,
      })
      .positional('value', {
        describe: 'El nuevo valor que quieres asignar',
        type: 'string' as const,
        demandOption: true,
      });
  },
  handler: (argv) => {
    const { type, value } = argv;
    
    if (type === 'notFound') {
      modifyNotFoundMiddleware(value as string);  // Modificamos la ruta de redirección
    } else {
      console.log(`No se reconoce el tipo de modificación: ${type}`);
    }
  },
};
