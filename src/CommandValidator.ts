import { CommandError } from './errors/CommandError.js';
import { Executable } from './interfaces/Executable.js';

export class CommandValidator {
  private constructor() {}

  private static HELP_COMMAND_TYPES = ['help', '--help', '-h'];
  private static _args: string[] = process.argv.slice(2);
  private static _executable: Executable = {
    command: CommandValidator._args[0],
  };

  static validateCommand(): Executable | never {
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
      case 'generate':
      case '-g':
        CommandValidator.validateGenerateCommand();
        break;
      case 'configure':
      case '-c':
        CommandValidator.validateConfigureCommand();
        break;
      default:
        throw new CommandError(
          'UNKNOWN_COMMAND',
          undefined,
          CommandValidator._args[1]
        );
    }
    return CommandValidator._executable;
  }

  static validateHelpCommand(): void | never {
    const exec = CommandValidator._executable;
    const args = CommandValidator._args;
    if (args.length > 1) {
      throw new CommandError('ENCOUNTER_EXTRA_ARGS', 'help', args[1]);
    }
    exec.command = 'help';
  }

  static validateAboutCommand(): void | never {
    const exec = CommandValidator._executable;
    const args = CommandValidator._args;
    if (args.length > 2) {
      throw new CommandError('ENCOUNTER_EXTRA_ARGS', 'about', args[1]);
    }
    if (args.length != 1) {
      if (CommandValidator.HELP_COMMAND_TYPES.includes(args[1])) {
        exec.describe = true;
      } else {
        throw new CommandError('UNKNOWN_COMMAND', 'about', args[1]);
      }
    }
    exec.command = 'about';
  }

  static validateVersionCommand(): void | never {
    const exec = CommandValidator._executable;
    const args = CommandValidator._args;
    if (args.length > 2) {
      throw new CommandError('ENCOUNTER_EXTRA_ARGS', 'version', args[1]);
    }
    if (args.length != 1) {
      if (CommandValidator.HELP_COMMAND_TYPES.includes(args[1])) {
        exec.describe = true;
      } else {
        throw new CommandError('UNKNOWN_COMMAND', 'version', args[1]);
      }
    }
    exec.command = 'version';
  }

  static validateAnswerCommand(): void | never {
    const exec = CommandValidator._executable;
    const args = CommandValidator._args;
    if (args.length > 2) {
      throw new CommandError('ENCOUNTER_EXTRA_ARGS', 'about', args[2]);
    }
    if (!args[1]?.trim()) {
      throw new CommandError('EMPTY_QUERY', 'answer');
    }
    if (CommandValidator.HELP_COMMAND_TYPES.includes(args[1])) {
      exec.describe = true;
    } else {
      exec.data = {
        query: args[1].trim(),
      };
    }
    exec.command = 'answer';
  }

  static validateGenerateCommand(): void | never {
    const exec = CommandValidator._executable;
    const args = CommandValidator._args;
    if (args.length > 3) {
      throw new CommandError('ENCOUNTER_EXTRA_ARGS', 'generate', args[3]);
    }
    if (!args[1]?.trim()) {
      throw new CommandError('ENCOUNTER_LESSER_ARGS', 'generate');
    }
    if (CommandValidator.HELP_COMMAND_TYPES.includes(args[1])) {
      exec.describe = true;
    } else {
      exec.data = {
        query: args[1].trim(),
      };
      if (+args[2]?.trim()) {
        if (+args[2] > 10 || +args[2] < 0) {
          throw new CommandError('OUT_OF_IMG_GEN_LIMIT', 'generate');
        }
        exec.data.count = +args[2];
      } else {
        if (args[2] != undefined) {
          throw new CommandError('ENCOUNTERED_NON_NUMERIC_VALUE', 'generate');
        }
      }
    }
    exec.command = 'generate';
  }

  static validateConfigureCommand(): void | never {
    const exec = CommandValidator._executable;
    const args = CommandValidator._args;
    if (args.length > 2) {
      throw new CommandError('ENCOUNTER_EXTRA_ARGS', 'configure', args[1]);
    }
    if (args.length != 1) {
      if (CommandValidator.HELP_COMMAND_TYPES.includes(args[1])) {
        exec.describe = true;
      } else {
        throw new CommandError('UNKNOWN_COMMAND', 'configure', args[1]);
      }
    }
    exec.command = 'configure';
  }
}
