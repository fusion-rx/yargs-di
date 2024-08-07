import { Command } from '../di/command.js';
import { Type } from '../type/type.js';

export interface CommandMetadataFacade extends Command {}

/**
 * Reflects command metadata directly injected with `@Command()`
 * into the prototype of `type`.
 * @param type A class decorated with `@Command`
 * @param meta Command metadata passed through the `@Command()`
 */
export function reflectCommand(
    type: Type<CommandMetadataFacade>,
    meta: Command
) {
    type.prototype.command = meta.command;
    type.prototype.description = meta.description;
    type.prototype.epilogue = meta.epilogue;
    type.prototype.examples = meta.examples;
    type.prototype.showAppVersion = meta.showAppVersion;
    type.prototype.showHelp = meta.showHelp;
}

/** An alias for `Type<CommandMetadataFacade>` */
export declare type C = Type<CommandMetadataFacade>;
