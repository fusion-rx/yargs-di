import { Type } from '../type/type.js';

export const SHOW_VERSION = 'show_version';

export function Version() {
    // @ts-ignore
    return function (target: Type<any>, arg1: any, parameterIndex: number) {};
}
