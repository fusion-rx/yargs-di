import { reflectCommand } from '../reflection/reflect-command.js';
import { Example } from '../type/example.js';
import { Type } from '../type/type.js';
import 'reflect-metadata';

export interface Command {
    command: string;
    description: string;
    epilogue?: string[];
    examples?: (Example | string)[];
    showAppVersion?: boolean;
    showHelp?: boolean;
}

/**
 * Command decorator and metadata.
 *
 * @publicApi
 */
export function Command(options: Command) {
    return function (reference: Type<any>) {
        reflectCommand(reference, options);
    };
}
