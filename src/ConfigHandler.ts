import * as fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import * as os from 'node:os';
import { AppConfiguration } from './interfaces/AppConfiguration';

export class ConfigHandler {
  private constructor() {}
  private static _path: string;

  static getPath(): string {
    const CONFIG_FOLDER = 'hephaestus';
    switch (os.type()) {
      case 'Darwin':
      case 'Linux':
        if (process.env.XDG_CONFIG_HOME) {
          ConfigHandler._path = process.env.XDG_CONFIG_HOME;
        } else {
          ConfigHandler._path = process.env.HOME as string;
          ConfigHandler._path += '/.config';
        }
        break;
      case 'Windows_NT':
        ConfigHandler._path = process.env.APPDATA as string;
        break;
      default:
        throw new Error('PLATFORM_NOT_SUPPORTED');
    }

    ConfigHandler._path += '/' + CONFIG_FOLDER;
    return ConfigHandler._path;
  }

  static async saveConfig(response: AppConfiguration): Promise<void> {
    // If OS is Darwin/Linux and process.env.XDG_CONFIG_HOME not set
    // Save the config in $HOME/.config
    // Create .config folder if doesn't exist already
    if (
      (os.type() === 'Darwin' || os.type() === 'Linux') &&
      !process.env.XDG_CONFIG_HOME
    ) {
      if (!existsSync(process.env.HOME + '/.config')) {
        await fs.mkdir('.config');
      }
    }
    let path = ConfigHandler.getPath();
    const content = `apt-token=${response['api-token']}
model=${response['model']}`;

    // Create hephaestus folder if doesn't exist already
    if (!existsSync(path)) {
      await fs.mkdir(path);
    }

    // Write/Overwrite the config file
    path += '/.hephaestusrc';
    await fs.writeFile(path, content);
  }

  static async fetchConfig(): Promise<AppConfiguration | undefined> {
    let path = ConfigHandler.getPath() + '/.hephaestusrc';
    try {
      const data = await fs.readFile(path, 'utf8');
      if (data.length === 0) return undefined;
      const propVals = data.split('\n').map((prop: string) => {
        return prop.split('=')[1];
      });
      let config: AppConfiguration = {
        'api-token': propVals[0],
        model: propVals[1],
      };
      return config;
    } catch (e: any) {
      switch (e.errno) {
        case -2:
          // Return undefined when file does not exist
          return undefined;
      }
    }
  }
}
