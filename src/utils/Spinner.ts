import ora, { Ora } from 'ora';

export class Spinner {
  private _ora: Ora;

  constructor(spinner_postfix_text: string) {
    this._ora = ora(spinner_postfix_text);
  }

  start(): void {
    this._ora.start();
  }

  stop(): void {
    this._ora.stop();
  }
}
