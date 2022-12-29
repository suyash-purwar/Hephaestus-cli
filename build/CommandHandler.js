"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const CommandError_1 = require("./errors/CommandError");
class CommandHandler {
    static checkCommand(args) {
        var _a, _b, _c, _d;
        const executable = {
            command: args[0],
        };
        const HELP_COMMAND_TYPES = ['help', '--help', '-h'];
        switch (executable.command) {
            case undefined:
            case 'usage':
            case '-u':
            case 'help':
            case '-h':
                if (args.length > 1) {
                    throw new CommandError_1.CommandError('ENCOUNTER_EXTRA_ARGS', 'help', args[1]);
                }
                executable.command = 'help';
                break;
            case 'about':
            case '-ab':
                if (args.length > 2) {
                    throw new CommandError_1.CommandError('ENCOUNTER_EXTRA_ARGS', 'about', args[1]);
                }
                if (HELP_COMMAND_TYPES.includes(args[1])) {
                    executable.describe = true;
                }
                else {
                    throw new CommandError_1.CommandError('UNKNOWN_COMMAND', 'about', args[1]);
                }
                executable.command = 'about';
                break;
            case 'version':
            case '-v':
                if (args.length > 1) {
                    throw new CommandError_1.CommandError('ENCOUNTER_EXTRA_ARGS', 'version', args[1]);
                }
                if (HELP_COMMAND_TYPES.includes(args[1])) {
                    executable.describe = true;
                }
                else {
                    throw new CommandError_1.CommandError('UNKNOWN_COMMAND', 'version', args[1]);
                }
                executable.command = 'version';
            case 'answer':
            case '-a':
                if (args.length > 2) {
                    throw new CommandError_1.CommandError('ENCOUNTER_EXTRA_ARGS', 'about', args[2]);
                }
                if (!((_a = args[1]) === null || _a === void 0 ? void 0 : _a.trim())) {
                    throw new CommandError_1.CommandError('EMPTY_QUERY', 'answer');
                }
                if (HELP_COMMAND_TYPES.includes(args[1])) {
                    executable.describe = true;
                }
                else {
                    executable.data = {
                        query: args[1],
                    };
                }
                executable.command = 'answer';
                break;
            case 'set-token':
            case '-st':
                if (args.length > 2) {
                    throw new CommandError_1.CommandError('ENCOUNTER_EXTRA_ARGS', 'set-token', args[2]);
                }
                if (!((_b = args[1]) === null || _b === void 0 ? void 0 : _b.trim())) {
                    throw new CommandError_1.CommandError('API_TOKEN_EMPTY', 'set-token');
                }
                if (HELP_COMMAND_TYPES.includes(args[1])) {
                    executable.describe = true;
                }
                else {
                    executable.data = {
                        query: args[1],
                    };
                }
                executable.command = 'set-token';
                break;
            case 'generate':
            case '-g':
                if (args.length > 3)
                    throw new CommandError_1.CommandError('ENCOUNTER_EXTRA_ARGS', 'generate', args[2]);
                if (!((_c = args[1]) === null || _c === void 0 ? void 0 : _c.trim())) {
                    throw new CommandError_1.CommandError('ENCOUNTER_LESSER_ARGS', 'generate');
                }
                executable.data = {
                    query: args[1],
                };
                if (+((_d = args[2]) === null || _d === void 0 ? void 0 : _d.trim())) {
                    if (+args[2] > 10)
                        throw new CommandError_1.CommandError('EXCEED_IMG_GEN_LIMIT', 'generate');
                    executable.data.count = +args[2];
                }
                else {
                    if (args[2] != undefined)
                        throw new CommandError_1.CommandError('ENCOUNTERED_NON_NUMERIC_VALUE', 'generate');
                }
                executable.command = 'generate';
                break;
            default:
                throw new CommandError_1.CommandError('UNKNOWN_COMMAND', undefined, args[1]);
        }
        return executable;
    }
}
exports.CommandHandler = CommandHandler;
