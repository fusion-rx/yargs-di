import { Ctor } from '../type/type.js';
import { CommandMetadataFacade } from './reflect-command.js';

export function reflectBuild(
    routeCtor: Ctor<CommandMetadataFacade>,
    propertyKey: string
) {
    routeCtor.buildMethod = propertyKey;
}
