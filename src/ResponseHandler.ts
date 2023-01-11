import inquirer from 'inquirer';
import gradient from 'gradient-string';
import { Executable } from './interfaces/Executable.js';
import { OpenAI } from './apis/OpenAI.js';
import { ConfigHandler } from './ConfigHandler.js';
import { AppConfiguration } from './interfaces/AppConfiguration.js';
import { Help } from './utils/Help.js';
import { Stylize } from './utils/Stylize.js';

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
        describe
          ? this.describeCommand(command)
          : await this.execAboutCommand();
        break;
      case 'version':
        describe ? this.describeCommand(command) : this.execVersionCommand();
        break;
      case 'answer':
        if (describe) {
          this.describeCommand(command);
        } else if (executable.data) {
          await this.execAnswerCommand(
            executable.data.query,
            executable.responseType
          );
        }
        break;
      case 'configure':
        describe
          ? this.describeCommand(command)
          : await this.execConfigureCommand();
        break;
      case 'config-info':
        describe
          ? this.describeCommand(command)
          : await this.execConfigInfoCommand();
        break;
      default:
        throw new Error('COMMAND_NOT_RECOGNIZED');
    }
  }

  private static execHelpCommand(): void {
    console.log(Stylize.flatInfo(Help.help));
  }

  private static async execConfigureCommand(): Promise<void> {
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
      if (confirmationResult.decision) {
        await ConfigHandler.saveConfig(config);
        console.log(Stylize.info('Settings are updated. Continue hacking!'));
      } else {
        console.log(Stylize.info('Settings not updated.'));
      }
    } else {
      const openapi = new OpenAI(config);
      await openapi.checkValidity();
      await ConfigHandler.saveConfig(config);
      console.log(Stylize.success('Hephaestus is configured! Start hacking!'));
    }
  }

  private static async execAboutCommand(): Promise<void> {
    const config = await ConfigHandler.fetchConfig();
    const headline = `

    | |  | |          | |                   | |             
    | |__| | ___ _ __ | |__   __ _  ___  ___| |_ _   _ ___  
    |  __  |/ _ \\ '_ \\| '_ \\ / _\` |/ _ \\/ __| __| | | / __| 
    | |  | |  __/ |_) | | | | (_| |  __/\\__ \\ |_| |_| \\__ \\ 
    |_|  |_|\\___| .__/|_| |_|\\__,_|\\___||___/\\__|\\__,_|___/ 
                | |                                         
                |_|                                         
    `;

    console.log(gradient.fruit(headline));
    console.log(
      gradient.fruit(
        `Hephaestus is a cli-based tool which allows you to easily find answers to any questions which could range from your next React.js project to the nature of this universe.\nIt interanally uses OpenAI's text-davinci-003/code-davinci-002 model for generating textual responses.`
      )
    );
    if (!config) {
      console.log(
        gradient.fruit(
          `\nTo use this tool, firstly you'll have to configure it on your system. Run 'heph configure' to start the configuration process.`
        )
      );
    }
    console.log(
      gradient.fruit(`\nRun 'heph help' to see the full set of commands.`)
    );
    console.log(
      gradient.cristal(
        `\nIf you like this project, please consider giving a star on github at www.github.com/suyash-purwar/Hephaestus-cli\n`
      )
    );
    console.log(Stylize.success(`Let's start hacking`));
  }

  private static execVersionCommand(): void {
    console.log(Stylize.flatInfo('Version: 0.1.0'));
  }

  private static async execAnswerCommand(
    query: string,
    responseType?: string
  ): Promise<void> {
    const config = await ConfigHandler.fetchConfig();
    if (!config) throw new Error('CONFIGURATION_NOT_SET');
    if (responseType) {
      responseType === 'code'
        ? (config.model = 'code-davinci-002')
        : (config.model = 'text-davinci-003');
    }
    const openai = new OpenAI(config);
    const response = await openai.getTextualResponse(query);
    console.log(Stylize.info(response));
  }

  private static async execConfigInfoCommand(): Promise<void> {
    const config = await ConfigHandler.fetchConfig();
    if (config) {
      console.log(Stylize.flatInfo('Configuraton Status: Configured'));
      console.log(Stylize.flatInfo(`Default AI Model: ${config.model}`));
    } else {
      console.log(Stylize.flatInfo('Configuraton Status: Not configured'));
      console.log(
        Stylize.flatInfo(`\nRun 'heph configure' to configure the app.`)
      );
    }
  }

  private static describeCommand(command: string): void {
    switch (command) {
      case 'configure':
        console.log(Stylize.flatInfo(Help.helpConfigure));
        break;
      case 'about':
        console.log(Stylize.flatInfo(Help.helpAbout));
        break;
      case 'version':
        console.log(Stylize.flatInfo(Help.helpVersion));
        break;
      case 'answer':
        console.log(Stylize.flatInfo(Help.helpAnswer));
        break;
      case 'config-info':
        console.log(Stylize.flatInfo(Help.helpConfigInfo));
        break;
    }
  }
}
