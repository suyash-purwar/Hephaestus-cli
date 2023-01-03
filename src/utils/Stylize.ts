import chalk from 'chalk';
import nodeEmoji from 'node-emoji';

export class Stylize {
  static success(...args: string[]) {
    return `${nodeEmoji.get('white_check_mark')} ${chalk.bold.greenBright(
      args.join(' ')
    )}`;
  }

  static info(...args: string[]) {
    return `${nodeEmoji.get('robot_face')} ${chalk.bold.cyanBright(
      args.join(' ')
    )}`;
  }

  static flatInfo(...args: string[]) {
    return chalk.cyanBright(args.join(' '));
  }

  static error(...args: string[]) {
    return `${nodeEmoji.get('x')} ${chalk.bold.red(args.join(' '))}`;
  }
}
