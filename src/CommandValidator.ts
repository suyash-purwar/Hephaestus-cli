import { CommandError } from './errors/CommandError.js';
import { Executable } from './interfaces/Executable.js';

export class CommandValidator {
  private constructor() {}

  private static HELP_COMMAND_TYPES = ['help', '--help', '-h'];
  private static _args: string[] = process.argv.slice(2);

  private static command = this._args[0];

  static validateCommand(): Executable {
    let executable: Executable;
    switch (this.command) {
      case undefined:
      case 'help':
      case '-h':
        executable = this.validateHelpCommand();
        break;
      case 'about':
      case '-ab':
        executable = this.validateAboutCommand();
        break;
      case 'version':
      case '-v':
        executable = this.validateVersionCommand();
        break;
      case 'answer':
      case '-a':
        executable = this.validateAnswerCommand();
        break;
      case 'configure':
      case '-c':
        executable = this.validateConfigureCommand();
        break;
      case 'config-info':
      case '-ci':
        executable = this.validateConfigInfoCommand();
        break;
      default:
        throw new CommandError('UNKNOWN_COMMAND', undefined, this._args[0]);
    }
    return executable;
  }

  private static validateHelpCommand(): Executable {
    if (this._args.length > 1) {
      throw new CommandError('ENCOUNTER_EXTRA_ARGS', 'help', this._args[1]);
    }
    const executable: Executable = {
      command: 'help',
    };
    return executable;
  }

  private static validateAboutCommand(): Executable {
    if (this._args.length > 2) {
      throw new CommandError('ENCOUNTER_EXTRA_ARGS', 'about', this._args[2]);
    }
    const executable: Executable = {
      command: 'about',
    };
    if (this._args[1]) {
      if (this.HELP_COMMAND_TYPES.includes(this._args[1])) {
        executable.describe = true;
      } else {
        throw new CommandError('UNKNOWN_COMMAND', 'about', this._args[1]);
      }
    }
    return executable;
  }

  private static validateVersionCommand(): Executable {
    if (this._args.length > 2) {
      throw new CommandError('ENCOUNTER_EXTRA_ARGS', 'version', this._args[2]);
    }
    const executable: Executable = {
      command: 'version',
    };
    if (this._args[1]) {
      if (this.HELP_COMMAND_TYPES.includes(this._args[1])) {
        executable.describe = true;
      } else {
        throw new CommandError('UNKNOWN_COMMAND', 'version', this._args[1]);
      }
    }
    return executable;
  }

  private static validateAnswerCommand(): Executable {
    /**
     * Implement additional flag (--code/--text Aliases: -c/-t)
     */
    if (this._args.length > 3) {
      throw new CommandError('ENCOUNTER_EXTRA_ARGS', 'about', this._args[3]);
    }
    let executable: Executable = {
      command: 'answer',
    };
    const query = this._args[1]?.trim();
    const flag: string | undefined = this._args[2];
    const flagOptions = ['--text', '-t', '--code', '-c'];

    if (this.HELP_COMMAND_TYPES.includes(query)) {
      if (flag) {
        throw new CommandError('ENCOUNTER_EXTRA_ARGS', 'answer', flag);
      }
      executable.describe = true;
      return executable;
    }

    if (query) {
      if (
        query.slice(0, 3) !== '-q=' &&
        !this.HELP_COMMAND_TYPES.includes(query)
      ) {
        throw new CommandError('OPTION_NOT_RECOGNIZED', 'answer', query);
      }
      executable.data = {
        query: query.slice(3),
      };
    } else {
      throw new CommandError('EMPTY_QUERY', 'answer');
    }

    if (flag) {
      if (!flagOptions.includes(flag)) {
        throw new CommandError('INVALID_FLAG', 'answer', flag);
      }
      console.log(flag);
      executable.responseType = flag;
    }

    return executable;
  }

  private static validateConfigureCommand(): Executable {
    if (this._args.length > 2) {
      throw new CommandError(
        'ENCOUNTER_EXTRA_ARGS',
        'configure',
        this._args[2]
      );
    }
    const executable: Executable = {
      command: 'configure',
    };
    if (this._args[1]) {
      if (this.HELP_COMMAND_TYPES.includes(this._args[1])) {
        executable.describe = true;
      } else {
        throw new CommandError('UNKNOWN_COMMAND', 'configure', this._args[1]);
      }
    }
    return executable;
  }

  static validateConfigInfoCommand(): Executable {
    if (this._args.length > 2) {
      throw new CommandError(
        'ENCOUNTER_EXTRA_ARGS',
        'config-info',
        this._args[2]
      );
    }
    const executable: Executable = {
      command: 'config-info',
    };
    if (this._args[1]) {
      if (this.HELP_COMMAND_TYPES.includes(this._args[1])) {
        executable.describe = true;
      } else {
        throw new CommandError('UNKNOWN_COMMAND', 'config-info', this._args[1]);
      }
    }
    return executable;
  }
}
