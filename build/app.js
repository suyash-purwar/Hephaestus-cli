#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandHandler_1 = require("./CommandHandler");
const args = [...process.argv.slice(2)];
try {
    const executable = CommandHandler_1.CommandHandler.checkCommand(args);
    console.log(executable);
}
catch (e) {
    console.log(e.name);
    console.log(e.message);
    console.log(e.command);
    if (e.unknownCommand)
        console.log(e.unknownCommand);
}
console.log(args);
