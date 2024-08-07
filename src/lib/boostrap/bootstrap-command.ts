import { Argv } from 'yargs';
import { isCommandBuilder } from '../hooks/build.js';
import { isExample } from '../type/example.js';
import { C } from '../reflection/reflect-command.js';

/**
 * Registers a command with `yargs`.
 * @param yargs The output of yargs()
 * @param version The application version
 * @param command An uninstantiated class that was decorated with `@Command`
 */
export function bootstrapCommand(yargs: Argv, version: string, command: C) {
    const instance = new command();

    if (isCommandBuilder(instance)) {
        return yargs.command(
            command.prototype.command,
            command.prototype.description,
            function (yargs) {
                yargs = instance.build(yargs);

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

                    yargs = yargs.example(
                        example.command ?? '',
                        example.example
                    );
                });

                command.prototype.epilogue?.forEach((epilogue) => {
                    yargs = yargs.epilogue(epilogue);
                });

                return yargs;
            },
            (args) => instance.handle(args)
        );
    } else {
        console.warn(
            'Registered command ' +
                command.prototype.constructor.name +
                ' does not implement `Register`.'
        );
        return;
    }
}
