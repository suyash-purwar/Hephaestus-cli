import inquirer from 'inquirer';
import { Executable } from './interfaces/Executable.js';
import { OpenAI } from './apis/OpenAI.js';
import { ConfigHandler } from './ConfigHandler.js';
import { AppConfiguration } from './interfaces/AppConfiguration';

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
    let hasConfiguredBefore = false;
    const setTokenQuestion = {
      type: 'password',
      name: 'api-token',
      message: 'Enter the API token:',
      mask: '*',
    };
    const currentConfig = await ConfigHandler.fetchConfig();
    if (currentConfig) {
      hasConfiguredBefore = true;
      setTokenQuestion.message =
        "Enter the API token (leave empty if you don't want to change):";
    }
    const questions = [
      setTokenQuestion,
      {
        type: 'list',
        name: 'model',
        message: 'Choose the default AI model:',
        choices: ['code-davinci-002 (best for coders)', 'text-davinci-003'],
        filter(value: string): string {
          if (value.includes('(best for coders)')) return 'code-davinci-002';
          return value;
        },
      },
    ];
    const config: AppConfiguration = await inquirer.prompt(questions);
    if (hasConfiguredBefore) {
      if (config['api-token'].length != 0) {
        const openapi = new OpenAI(config);
        await openapi.checkValidity();
      } else {
        if (currentConfig) config['api-token'] = currentConfig['api-token'];
      }
      // If configuration already exists, take permission for overwrite
      const confirmation = [
        {
          type: 'confirm',
          name: 'decision',
          message: 'Are you sure you want to update previous setting?',
          default: false,
        },
      ];
      const confirmationResult = await inquirer.prompt(confirmation);
      console.log(confirmationResult);
      if (confirmationResult.decision) {
        await ConfigHandler.saveConfig(config);
        console.log('Settings are updated. Continue hacking!');
      } else {
        console.log('Settings not updated.');
      }
    } else {
      const openapi = new OpenAI(config);
      await openapi.checkValidity();
      await ConfigHandler.saveConfig(config);
      console.log('Hephaestus is configured! Start hacking!');
    }
  }
}
