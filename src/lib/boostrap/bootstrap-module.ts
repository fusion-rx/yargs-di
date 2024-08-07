import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { YargsModule } from '../di/module.js';
import { bootstrapCommand } from './bootstrap-command.js';
import { C } from '../reflection/reflect-command.js';

/**
 * Initializes a yargs module.
 * @param yargsModule An uninstantiated class decorated with `@YargsModule`.
 */
export function bootstrapModule(yargsModule: YargsModule) {
    let cli = yargs(hideBin(yargsModule.argv)).scriptName(
        yargsModule.scriptName
    );

    const version = initVersion(yargsModule.appVersion);

    (<C[]>yargsModule.commands).forEach((command) => {
        const cmd = bootstrapCommand(cli, version, command);
        if (cmd) cli = cmd;
    });

    cli = cli.version(version);

    if (yargsModule.fail) {
        cli = cli.fail(yargsModule.fail);
    }

    cli.parse();
}

function initVersion(appVersion?: () => string) {
    try {
        if (appVersion) return appVersion();
    } catch {
        console.warn('Unable to get version number.');
    }

    return '0.0.0';
}
