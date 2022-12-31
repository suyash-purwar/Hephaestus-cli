import inquirer from 'inquirer';
import { Executable } from './interfaces/Executable.js';
import { OpenAI } from './apis/OpenAI.js';
import { ConfigHandler } from './ConfigHandler.js';
import { AppConfiguration } from './interfaces/AppConfiguration.js';
import {
  help,
  helpConfigure,
  helpAbout,
  helpVersion,
  helpAnswer,
  helpGenerate,
} from './utils/helpResponses.js';

export class ResponseHandler {
  private constructor() {}

  static async routeExecutable(executable: Executable): Promise<void> {
    const { command, describe }: { command: string; describe?: boolean } =
      executable;
    switch (command) {
      case 'help':
        this.execHelpCommand();
        break;
      case 'about':
        describe ? this.describeCommand(command) : this.execAboutCommand();
        break;
      case 'version':
        describe ? this.describeCommand(command) : this.execVersionCommand();
        break;
      case 'answer':
        if (executable.data)
          describe
            ? this.describeCommand(command)
            : this.execAnswerCommand(executable.data.query);
        break;
      case 'generate':
        if (executable.data && executable.data.count)
          describe
            ? this.describeCommand(command)
            : this.execGenerateCommand(
                executable.data.query,
                executable.data.count
              );
        break;
      case 'configure':
        describe
          ? this.describeCommand(command)
          : await this.execConfigureCommand();
        break;
      default:
        throw new Error('COMMAND_NOT_RECOGNIZED');
    }
  }

  static execHelpCommand(): void {
    console.log(help);
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

  static execAboutCommand(): void {
    // Do some magic
  }

  static execVersionCommand(): void {
    console.log('0.1.0');
  }

  static execAnswerCommand(query: string): void {
    // Generate answer
  }

  static execGenerateCommand(query: string, count = 1): void {
    // Generate images
  }

  static describeCommand(command: string): void {
    switch (command) {
      case 'configure':
        console.log(helpConfigure);
        break;
      case 'about':
        console.log(helpAbout);
        break;
      case 'version':
        console.log(helpVersion);
        break;
      case 'answer':
        console.log(helpAnswer);
        break;
      case 'generate':
        console.log(helpGenerate);
        break;
    }
  }
}
