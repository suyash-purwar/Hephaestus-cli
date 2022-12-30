import inquirer from 'inquirer';
import { Executable } from './interfaces/Executable.js';
import { OpenAI } from './apis/OpenAI.js';

export class ResponseHandler {
  private constructor() {}

  static async routeExecutable(executable: Executable): Promise<void> {
    switch (executable.command) {
      case 'help':
        ResponseHandler.execHelpCommand();
        break;
      // More commands here..
      case 'configure':
        await ResponseHandler.execConfigureCommand();
        break;
      default:
        throw new Error('COMMAND_NOT_RECOGNIZED');
    }
  }

  // Info: Text needs to be updated
  static execHelpCommand(): void {
    const res = `
heph <command>

Usage:

heph answer                                           responds to your messages
heph generate <image description> [<img count>]       generates images from your textual description
heph about                                            show info about this CLI tool
heph configure                                        configures the CLI for use
heph help                                             shows info about the commands
heph version                                          shows the currently installed version of the cli
    `;
    console.log(res);
  }

  static async execConfigureCommand(): Promise<void> {
    const questions = [
      {
        type: 'password',
        name: 'api-token',
        message: 'Enter the API token',
        mask: '*',
      },
      {
        type: 'list',
        name: 'model',
        message: 'Choose the default AI model',
        choices: ['code-davinci-002 (best for coders)', 'text-davinci-003'],
        filter(value: string): string {
          if (value.includes('(best for coders)')) return 'code-davinci-002';
          return value;
        },
      },
    ];
    const response = await inquirer.prompt(questions);
    const openapi = new OpenAI(response['api-token'], response.model);
    await openapi.checkValidity();
    console.log('Hephaestus is configured! Start hacking!');
  }
}
