import { CommandError } from './errors/CommandError.js';
import { Executable } from './interfaces/Executable.js';

export class CommandValidator {
  private constructor() {}

  private static HELP_COMMAND_TYPES = ['help', '--help', '-h'];
  private static _args: string[] = process.argv.slice(2);

  private static _executable: Executable = {
    command: this._args[0],
  };

  static validateCommand(): Executable | never {
    switch (this._executable.command) {
      case undefined:
      case 'help':
      case '-h':
        this.validateHelpCommand();
        break;
      case 'about':
      case '-ab':
        this.validateAboutCommand();
        break;
      case 'version':
      case '-v':
        this.validateVersionCommand();
        break;
      case 'answer':
      case '-a':
        this.validateAnswerCommand();
        break;
      case 'configure':
      case '-c':
        this.validateConfigureCommand();
        break;
      case 'config-info':
      case '-ci':
        this.validateConfigInfoCommand();
        break;
      default:
        throw new CommandError('UNKNOWN_COMMAND', undefined, this._args[0]);
    }
    return this._executable;
  }

  private static validateHelpCommand(): void {
    if (this._args.length > 1) {
      throw new CommandError('ENCOUNTER_EXTRA_ARGS', 'help', this._args[1]);
    }
    this._executable.command = 'help';
  }

  private static validateAboutCommand(): void {
    if (this._args.length > 2) {
      throw new CommandError('ENCOUNTER_EXTRA_ARGS', 'about', this._args[1]);
    }
    if (this._args.length != 1) {
      if (this.HELP_COMMAND_TYPES.includes(this._args[1])) {
        this._executable.describe = true;
      } else {
        throw new CommandError('UNKNOWN_COMMAND', 'about', this._args[1]);
      }
    }
    this._executable.command = 'about';
  }

  private static validateVersionCommand(): void {
    if (this._args.length > 2) {
      throw new CommandError('ENCOUNTER_EXTRA_ARGS', 'version', this._args[1]);
    }
    if (this._args.length != 1) {
      if (this.HELP_COMMAND_TYPES.includes(this._args[1])) {
        this._executable.describe = true;
      } else {
        throw new CommandError('UNKNOWN_COMMAND', 'version', this._args[1]);
      }
    }
    this._executable.command = 'version';
  }

  private static validateAnswerCommand(): void {
    if (this._args.length > 2) {
      throw new CommandError('ENCOUNTER_EXTRA_ARGS', 'about', this._args[2]);
    }
    if (!this._args[1]?.trim()) {
      throw new CommandError('EMPTY_QUERY', 'answer');
    }
    if (this.HELP_COMMAND_TYPES.includes(this._args[1])) {
      this._executable.describe = true;
    } else {
      this._executable.data = {
        query: this._args[1].trim(),
      };
    }
    this._executable.command = 'answer';
  }

  private static validateConfigureCommand(): void {
    if (this._args.length > 2) {
      throw new CommandError(
        'ENCOUNTER_EXTRA_ARGS',
        'configure',
        this._args[1]
      );
    }
    /**
     * Review code at 111 and 105
     */
    if (this._args.length != 1) {
      if (this.HELP_COMMAND_TYPES.includes(this._args[1])) {
        this._executable.describe = true;
      } else {
        throw new CommandError('UNKNOWN_COMMAND', 'configure', this._args[1]);
      }
    }
    this._executable.command = 'configure';
  }

  static validateConfigInfoCommand(): void {
    if (this._args.length > 2) {
      throw new CommandError(
        'ENCOUNTER_EXTRA_ARGS',
        'config-info',
        this._args[2]
      );
    }
    if (this._args[1]) {
      if (this.HELP_COMMAND_TYPES.includes(this._args[1])) {
        this._executable.describe = true;
      } else {
        throw new CommandError('UNKNOWN_COMMAND', 'config-info', this._args[1]);
      }
    }
    this._executable.command = 'config-info';
  }
}
