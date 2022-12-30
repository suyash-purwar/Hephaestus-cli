#!/usr/bin/env node
import { CommandValidator } from './CommandValidator.js';
import { ResponseHandler } from './ResponseHandler.js';
try {
    const executable = CommandValidator.validateCommand();
    // console.log(executable);
    const response = ResponseHandler.routeExecutable(executable);
    console.log(response);
}
catch (e) {
    console.log(e.name);
    console.log(e.message);
    console.log(e.command);
    if (e.unknownCommand)
        console.log(e.unknownCommand);
}
