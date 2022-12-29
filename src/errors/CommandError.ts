export class CommandError extends Error {
  private _command?: string;
  private _name: string;
  private _unknownCommand?: string;

  constructor(msg: string, cmd?: string, unknownCommand?: string) {
    super(msg);
    this._command = cmd;
    this._name = 'CommandError';
    this._unknownCommand = unknownCommand;
  }

  get name(): string {
    return this._name;
  }

  get command(): string | undefined {
    return this._command;
  }

  get message(): string {
    return this.message;
  }

  get unknownCommand(): string | undefined {
    return this._unknownCommand;
  }
}
