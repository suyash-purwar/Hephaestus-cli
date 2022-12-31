#!/usr/bin/env node

import { CommandValidator } from './CommandValidator.js';
import { ResponseHandler } from './ResponseHandler.js';

(async function () {
  try {
    const executable = CommandValidator.validateCommand();
    console.log(executable);
    await ResponseHandler.routeExecutable(executable);
  } catch (e: any) {
    // console.log(e.name);
    // console.log(e.message);
    // console.log(e.command);
    if (e.unknownCommand) console.log(e.unknownCommand);
  }
})();
