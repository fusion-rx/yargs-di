import { Ctor } from '../type/type.js';
import { CommandMetadataFacade } from './reflect-command.js';

export function reflectHandle(
    routeCtor: Ctor<CommandMetadataFacade>,
    propertyKey: string
) {
    routeCtor.handleMethod = propertyKey;
}
