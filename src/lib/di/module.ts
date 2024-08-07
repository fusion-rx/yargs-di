import { Type } from '../type/type.js';
import { bootstrapModule } from '../boostrap/bootstrap-module.js';

export interface YargsModule {
    scriptName: string;
    argv: string[];
    commands: Type<any>[];
    appVersion?: () => string;
    fail?: (msg: string, err: Error) => void;
}

/**
 * Yargs module decorator and metadata.
 *
 * @publicApi
 */
export function YargsModule(yargs: YargsModule) {
    // @ts-ignore
    return function (reference: Type<any>) {
        bootstrapModule(yargs);
    };
}
