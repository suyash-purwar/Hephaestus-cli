#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandValidator_1 = require("./CommandValidator");
const ResponseHandler_1 = require("./ResponseHandler");
try {
    const executable = CommandValidator_1.CommandValidator.validateCommand();
    // console.log(executable);
    const response = ResponseHandler_1.ResponseHandler.routeExecutable(executable);
    console.log(response);
}
catch (e) {
    console.log(e.name);
    console.log(e.message);
    console.log(e.command);
    if (e.unknownCommand)
        console.log(e.unknownCommand);
}
