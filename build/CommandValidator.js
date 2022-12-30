import { CommandError } from './errors/CommandError.js';
export class CommandValidator {
    constructor() { }
    static validateCommand() {
        switch (CommandValidator._executable.command) {
            case undefined:
            case 'help':
            case '-h':
                CommandValidator.validateHelpCommand();
                break;
            case 'about':
            case '-ab':
                CommandValidator.validateAboutCommand();
                break;
            case 'version':
            case '-v':
                CommandValidator.validateVersionCommand();
                break;
            case 'answer':
            case '-a':
                CommandValidator.validateAnswerCommand();
                break;
            case 'set-token':
            case '-st':
                CommandValidator.validateSetTokenCommand();
                break;
            case 'generate':
            case '-g':
                CommandValidator.validateGenerateCommand();
                break;
            case 'configure':
            case '-c':
                CommandValidator.validateConfigureCommand();
                break;
            default:
                throw new CommandError('UNKNOWN_COMMAND', undefined, CommandValidator._args[1]);
        }
        return CommandValidator._executable;
    }
    static validateHelpCommand() {
        const exec = CommandValidator._executable;
        const args = CommandValidator._args;
        if (args.length > 1) {
            throw new CommandError('ENCOUNTER_EXTRA_ARGS', 'help', args[1]);
        }
        exec.command = 'help';
    }
    static validateAboutCommand() {
        const exec = CommandValidator._executable;
        const args = CommandValidator._args;
        if (args.length > 2) {
            throw new CommandError('ENCOUNTER_EXTRA_ARGS', 'about', args[1]);
        }
        if (args.length != 1) {
            if (CommandValidator.HELP_COMMAND_TYPES.includes(args[1])) {
                exec.describe = true;
            }
            else {
                throw new CommandError('UNKNOWN_COMMAND', 'about', args[1]);
            }
        }
        exec.command = 'about';
    }
    static validateVersionCommand() {
        const exec = CommandValidator._executable;
        const args = CommandValidator._args;
        if (args.length > 2) {
            throw new CommandError('ENCOUNTER_EXTRA_ARGS', 'version', args[1]);
        }
        if (args.length != 1) {
            if (CommandValidator.HELP_COMMAND_TYPES.includes(args[1])) {
                exec.describe = true;
            }
            else {
                throw new CommandError('UNKNOWN_COMMAND', 'version', args[1]);
            }
        }
        exec.command = 'version';
    }
    static validateAnswerCommand() {
        var _a;
        const exec = CommandValidator._executable;
        const args = CommandValidator._args;
        if (args.length > 2) {
            throw new CommandError('ENCOUNTER_EXTRA_ARGS', 'about', args[2]);
        }
        if (!((_a = args[1]) === null || _a === void 0 ? void 0 : _a.trim())) {
            throw new CommandError('EMPTY_QUERY', 'answer');
        }
        if (CommandValidator.HELP_COMMAND_TYPES.includes(args[1])) {
            exec.describe = true;
        }
        else {
            exec.data = {
                query: args[1].trim(),
            };
        }
        exec.command = 'answer';
    }
    static validateSetTokenCommand() {
        var _a;
        const exec = CommandValidator._executable;
        const args = CommandValidator._args;
        if (args.length > 2) {
            throw new CommandError('ENCOUNTER_EXTRA_ARGS', 'set-token', args[2]);
        }
        if (!((_a = args[1]) === null || _a === void 0 ? void 0 : _a.trim())) {
            throw new CommandError('API_TOKEN_EMPTY', 'set-token');
        }
        if (CommandValidator.HELP_COMMAND_TYPES.includes(args[1])) {
            exec.describe = true;
        }
        else {
            exec.data = {
                query: args[1].trim(),
            };
        }
        exec.command = 'set-token';
    }
    static validateGenerateCommand() {
        var _a, _b;
        const exec = CommandValidator._executable;
        const args = CommandValidator._args;
        if (args.length > 3) {
            throw new CommandError('ENCOUNTER_EXTRA_ARGS', 'generate', args[3]);
        }
        if (!((_a = args[1]) === null || _a === void 0 ? void 0 : _a.trim())) {
            throw new CommandError('ENCOUNTER_LESSER_ARGS', 'generate');
        }
        if (CommandValidator.HELP_COMMAND_TYPES.includes(args[1])) {
            exec.describe = true;
        }
        else {
            exec.data = {
                query: args[1].trim(),
            };
            if (+((_b = args[2]) === null || _b === void 0 ? void 0 : _b.trim())) {
                if (+args[2] > 10 || +args[2] < 0) {
                    throw new CommandError('OUT_OF_IMG_GEN_LIMIT', 'generate');
                }
                exec.data.count = +args[2];
            }
            else {
                if (args[2] != undefined) {
                    throw new CommandError('ENCOUNTERED_NON_NUMERIC_VALUE', 'generate');
                }
            }
        }
        exec.command = 'generate';
    }
    static validateConfigureCommand() {
        const exec = CommandValidator._executable;
        const args = CommandValidator._args;
        if (args.length > 2) {
            throw new CommandError('ENCOUNTER_EXTRA_ARGS', 'configure', args[1]);
        }
        if (args.length != 1) {
            if (CommandValidator.HELP_COMMAND_TYPES.includes(args[1])) {
                exec.describe = true;
            }
            else {
                throw new CommandError('UNKNOWN_COMMAND', 'configure', args[1]);
            }
        }
        exec.command = 'configure';
    }
}
CommandValidator.HELP_COMMAND_TYPES = ['help', '--help', '-h'];
CommandValidator._args = process.argv.slice(2);
CommandValidator._executable = {
    command: CommandValidator._args[0],
};
