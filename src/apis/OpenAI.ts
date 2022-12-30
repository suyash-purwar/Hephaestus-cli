import { Spinner } from './../utils/Spinner.js';
import {
  OpenAIApi,
  Configuration,
} from '../../node_modules/openai/dist/index.js';

export class OpenAI {
  private _openai: OpenAIApi;

  constructor(apiToken: string, model: string) {
    const configuration = new Configuration({
      apiKey: apiToken,
    });
    this._openai = new OpenAIApi(configuration);
  }

  async checkValidity(): Promise<boolean> {
    const spinner = new Spinner('Authenticating');
    spinner.start();
    try {
      const response = await this._openai.listModels();
      spinner.stop();
      return response.status == 200;
    } catch (e: any) {
      spinner.stop();
      switch (e.response.status) {
        case 401:
          throw new Error('INVALID_TOKEN');
        default:
          console.log(e.response.status);
          throw new Error('OPENAI_SERVICE_DOWN');
      }
    }
  }
}
