import { reflectHandle } from '../reflection/reflect-handle.js';
import { Ctor } from '../type/type.js';

/**
 * Registers a command's handler method.
 *
 * You may want to have your `arg` parameter share types with the method
 * decorated with `@Build`. We have created a utility type `ArgvGeneric`
 * that you can use to share the types. See the example for usage details.
 *
 *
 * ```ts
 * ＠Build()
 * public build (yargs: Argv) {
 *     return yargs.option('path', {
 *         alias: 'p',
 *         describe: 'A system path',
 *         ...
 *     })
 * }
 *
 * ＠Handle()
 * public handle(
 *    args: ArgvGeneric<ReturnType<this['build']>>
 * ): void {
 *
 * }
 * ```
 *
 * @publicApi
 */
export function Handle() {
    return function (routeCtor: Ctor<any>, propertyKey: string) {
        reflectHandle(routeCtor, propertyKey);
    };
}
