import inquirer from 'inquirer';
export class ResponseHandler {
    constructor() { }
    static routeExecutable(executable) {
        switch (executable.command) {
            case 'help':
                return ResponseHandler.execHelpCommand();
                break;
            // More commands here..
            case 'configure':
                return ResponseHandler.execConfigureCommand();
                break;
            default:
                throw new Error('COMMAND_NOT_RECOGNIZED');
        }
    }
    // Info: Text needs to be updated
    // Omitted set-token as I think it would be better to set it through inquirer package inside of the configure command
    static execHelpCommand() {
        return `
heph <command>

Usage:

heph answer                                           responds to your messages
heph generate <image description> [<img count>]       generates images from your textual description
heph about                                            show info about this CLI tool
heph configure                                        configures the CLI for use
heph help                                             shows info about the commands
heph version                                          shows the currently installed version of the cli
    `;
    }
    static execConfigureCommand() {
        // Inquirer.js processing
        inquirer
            .prompt(['Enter the API token'])
            .then((res) => {
            console.log(res);
        })
            .catch((err) => {
            console.log(err);
        });
        return 'Hephaestus is configured';
    }
}
