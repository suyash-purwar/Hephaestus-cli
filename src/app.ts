#!/usr/bin/env node

import { CommandHandler } from './CommandHandler';

const args: string[] = [...process.argv.slice(2)];

try {
  const executable = CommandHandler.checkCommand(args);
  console.log(executable);
} catch (e: any) {
  console.log(e.name);
  console.log(e.message);
  console.log(e.command);
  if (e.unknownCommand) console.log(e.unknownCommand);
}

console.log(args);
