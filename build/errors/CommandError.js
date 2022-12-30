export class CommandError extends Error {
    constructor(msg, cmd, unknownCommand) {
        super(msg);
        this._command = cmd;
        this._name = 'CommandError';
        this._unknownCommand = unknownCommand;
    }
    get name() {
        return this._name;
    }
    get command() {
        return this._command;
    }
    get message() {
        return this.message;
    }
    get unknownCommand() {
        return this._unknownCommand;
    }
}
