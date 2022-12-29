#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandValidator_1 = require("./CommandValidator");
try {
    const executable = CommandValidator_1.CommandValidator.validateCommand();
    console.log(executable);
}
catch (e) {
    console.log(e.name);
    console.log(e.message);
    console.log(e.command);
    if (e.unknownCommand)
        console.log(e.unknownCommand);
}
