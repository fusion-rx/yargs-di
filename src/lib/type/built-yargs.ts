import { Argv } from 'yargs';

/**
 * Used to share types between `build` and `handle` methods in classes
 * decorated with `@Command`.
 *
 * The inference required to determine the return type of `build` is
 * apparently a very complex task and is very slow.
 */
export declare type InferArgv<
    U extends (...args: any) => any,
    T = ReturnType<U>
> = T extends Argv<infer I> ? I : T;
