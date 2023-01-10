const help = `
heph <command>

Usage:

heph answer                                   responds to your messages
heph about                                    show info about this CLI tool
heph configure                                configures the CLI for use
heph configure-info                           shows configuration status and settings
heph help                                     shows info about the commands
heph version                                  shows the currently installed version of Hephaestus`;

const helpConfigure = `
Configures the Hephaestus CLI tool for use.

Usage:
heph configure

aliases: configure, -c`;

const helpConfigInfo = `
Shows configuration status and settings

Usgae:
heph config-info

aliases: config-info, -ci`;

const helpAbout = `
Shows info about the cli

Usage:
heph about

aliases: about, -ab`;

const helpVersion = `
Shows the currently installed version of Hephaestus

Usage:
heph version

aliases: version, -v`;

const helpAnswer = `
Responds to the questions asked by the user

Usage:
heph answer <question>

aliases: answer, -v`;

export const Help = {
  help,
  helpAbout,
  helpVersion,
  helpAnswer,
  helpConfigure,
  helpConfigInfo,
};
