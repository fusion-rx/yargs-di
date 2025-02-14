import { Argv } from 'yargs';
import { isExample } from '../type/example.js';
import { C } from '../reflection/reflect-command.js';

function build(yargs: Argv, command: C, instance: any, version: string) {
    if (command.prototype.buildMethod) {
        yargs = instance[command.prototype.buildMethod](yargs);
    }

    if (command.prototype.showAppVersion) {
        yargs = yargs.version(version);
    }

    if (command.prototype.showHelp) {
        yargs = yargs.help();
    }

    command.prototype.examples?.forEach((example) => {
        if (!isExample(example)) {
            yargs = yargs.example('', example);
            return;
        }

        yargs = yargs.example(example.command ?? '', example.example);
    });

    command.prototype.epilogue?.forEach((epilogue) => {
        yargs = yargs.epilogue(epilogue);
    });

    return yargs;
}

/**
 * Registers a command with `yargs`.
 * @param yargs The output of yargs()
 * @param version The application version
 * @param command An uninstantiated class that was decorated with `@Command`
 */
export function bootstrapCommand(yargs: Argv, version: string, command: C) {
    const instance = new command();

    let name = command.prototype.command;
    let description = command.prototype.description;

    console.log(command.prototype);

    if (command.prototype.handleMethod) {
        return yargs.command(
            name,
            description,
            (yargs) => build(yargs, command, instance, version),
            (yargs) => {
                console.log(yargs);
                instance[command.prototype.handleMethod](yargs);
            }
        );
    } else {
        return yargs.command(name, description, (yargs) =>
            build(yargs, command, instance, version)
        );
    }
}
