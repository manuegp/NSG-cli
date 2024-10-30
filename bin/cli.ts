#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { createCommand } from '../src/commands/createCommand';  // Importa el objeto 'createCommand'
import { modifyCommand } from '../src/commands/modifyCommand';

// Configuración del CLI
yargs(hideBin(process.argv))
  .command(createCommand) // Registramos el comando 'create' correctamente
  .command(modifyCommand)  // Registramos el comando 'modify'
  .demandCommand(1, 'Debes proporcionar al menos un comando.')
  .help() // Agregamos el comando 'help'
  .alias('h', 'help') // Alias para 'help'
  .parse();
