export const help = `
heph <command>

Usage:

heph answer                                   responds to your messages
heph generate <description> [<count>]         generates image(s) from textual description and image count
heph about                                    show info about this CLI tool
heph configure                                configures the CLI for use
heph help                                     shows info about the commands
heph version                                  shows the currently installed version of Hephaestus`;

export const helpConfigure = `
Configures the Hephaestus CLI tool for use.

Usage:
heph configure

aliases: configure, -c`;

export const helpAbout = `
Shows info about the cli

Usage:
heph about

aliases: about, -ab`;

export const helpVersion = `
Shows the currently installed version of Hephaestus

Usage:
heph version

aliases: version, -v`;

export const helpAnswer = `
Responds to the questions asked by the user

Usage:
heph answer <question>

aliases: answer, -v`;

export const helpGenerate = `
Generates image(s) from textual description and image count

Usage:
heph generate <description> [<img count>]

aliases: generate, -g`;
