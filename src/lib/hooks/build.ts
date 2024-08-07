import { Argv } from 'yargs';

declare type ArgvGeneric<A> = A extends Argv<infer I> ? I : never;

/**
 * Allows for sharing of types between `build` and `handle` when
 * `CommandBuilder` is implemented.
 *
 * @example
 *
 * export class MyCommand extends CommandBuilder {
 *     public build(yargs: Argv) { ... }
 *
 *     // `yargs` will be typed as the output of `build`
 *     public handle(yargs: Handler<this>) { ... }
 * }
 */
export declare type Handler<T extends CommandBuilder> = ArgvGeneric<
    ReturnType<T['build']>
>;

/**
 * Implement `CommandBuilder` in a class decorated with `@Cli()` to
 * register a command with `yargs`.
 *
 * @example
 *
 * ＠Command({
 *     command: 'read [path]',
 *     description: 'Read a file and print its contents to the console.',
 *     showAppVersion: true,
 *     showHelp: true
 * })
 * export class MyCommand extends CommandBuilder {
 *     public build(yargs: Argv) {
 *         return yargs.positional('path', {
 *             describe: 'A filesystem path.',
 *             type: 'string',
 *             coerce: (path) => {
 *                 path = resolve(path);
 *                 if (existsSync(path)) return path;
 *                 console.error(`File at ${path} does not exist.`);
 *                 exit();
 *             }
 *         });
 *     }
 *
 *     public handle(yargs: Handler<this>) {
 *         const fileContents = readFileSync(yargs.path, 'utf-8');
 *         console.log(fileContents);
 *     }
 * }
 *
 * @publicApi
 */
export abstract class CommandBuilder {
    /**
     * The `handle` callback of a yargs command.
     *
     * **NOTE:** When VSCode auto-implements this as a stub, it sets the
     * type of `yargs` to `ReturnType<this['register']> extends Argv<infer I> ? I : never`.
     * In order to get accurate type definitions, replace `ReturnType...never` with
     * `Handler<this>`.
     */
    public abstract handle(yargs: Handler<this>): void;

    /**
     * The `build` callback of a yargs command.
     */
    public abstract build(yargs: Argv): Argv;
}

/**
 * Safely assert that `val` is a `CommandBuilder`.
 */
export const isCommandBuilder = (val: any): val is CommandBuilder => {
    return (
        val !== null &&
        val !== undefined &&
        typeof val === 'object' &&
        'build' in val &&
        'handle' in val
    );
};
