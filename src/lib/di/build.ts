import { reflectBuild } from '../reflection/reflect-build.js';
import { Ctor } from '../type/type.js';

/**
 * Register's a command's build method.
 *
 * @publicApi
 */
export function Build() {
    return function (routeCtor: Ctor<any>, propertyKey: string) {
        reflectBuild(routeCtor, propertyKey);
    };
}
