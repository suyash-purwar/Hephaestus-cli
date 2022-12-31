import * as fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import * as os from 'node:os';
import { AppConfiguration } from './interfaces/AppConfiguration';

export class ConfigHandler {
  private constructor() {}
  private static _path: string;

  static async saveConfig(response: AppConfiguration): Promise<void> {
    const CONFIG_FOLDER = 'hephaestus';
    switch (os.type()) {
      case 'Darwin':
      case 'Linux':
        if (process.env.XDG_CONFIG_HOME) {
          ConfigHandler._path = process.env.XDG_CONFIG_HOME;
        } else {
          ConfigHandler._path = process.env.HOME as string;
          ConfigHandler._path += '.config';
          if (!existsSync(ConfigHandler._path)) {
            await fs.mkdir('.config');
          }
        }
        break;
      case 'Windows_NT':
        ConfigHandler._path = process.env.APPDATA as string;
        break;
      default:
        throw new Error('PLATFORM_NOT_SUPPORTED');
    }

    ConfigHandler._path += '/' + CONFIG_FOLDER;

    if (!existsSync(ConfigHandler._path)) {
      await fs.mkdir(ConfigHandler._path);
    }

    let content = `apt-token=${response['api-token']}
model=${response['model']}`;

    ConfigHandler._path += '/.hephaestusrc';
    await fs.writeFile(ConfigHandler._path, content);
  }

  static async fetchConfig(): Promise<AppConfiguration> {
    try {
      const data = await fs.readFile(ConfigHandler._path, 'utf8');
      const propVals = data.split('\n').map((prop: string) => {
        return prop.split('=')[1];
      });
      let config: AppConfiguration = {
        'api-token': propVals[0],
        model: propVals[1],
      };
      console.log(config);
      return config;
    } catch (e: any) {
      switch (e.errno) {
        case -2:
          throw new Error('CONFIGURATION_NOT_SET_YET');
        default:
          console.log(e);
          throw new Error('INTERNAL_UNKNOWN_ERR');
      }
    }
  }
}
