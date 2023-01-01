import chalk from 'chalk';
import nodeEmoji from 'node-emoji';

export class Stylize {
  static success(...args: string[]) {
    return `${nodeEmoji.get('white_check_mark')} ${chalk.bold.green(
      args.join(' ')
    )}`;
  }

  static info(...args: string[]) {
    return `${nodeEmoji.get('point_right')} ${chalk.bold.cyan(args.join(' '))}`;
  }

  static flatInfo(...args: string[]) {
    return chalk.cyan(args.join(' '));
  }

  static error(...args: string[]) {
    return `${nodeEmoji.get('x')} ${chalk.bold.red(args.join(' '))}`;
  }
}
