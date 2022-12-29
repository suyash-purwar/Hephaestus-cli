#!/usr/bin/env node

import { CommandValidator } from './CommandValidator';

try {
  const executable = CommandValidator.validateCommand();
  console.log(executable);
} catch (e: any) {
  console.log(e.name);
  console.log(e.message);
  console.log(e.command);
  if (e.unknownCommand) console.log(e.unknownCommand);
}
