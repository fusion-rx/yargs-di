import { Argv } from 'yargs';

export declare type ArgvGeneric<A> = A extends Argv<infer I> ? I : never;
