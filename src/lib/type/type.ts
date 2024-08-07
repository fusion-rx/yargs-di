/**
 * Assert class constructor type for objects.
 */
export type Ctor<T extends object = {}> = T & {
    constructor: {
        name: string;
    };
    [classmember: string]: any;
};

/**
 * Represents a type that an Injectable or other object
 * is instances of.
 *
 * An example of a `Class` is `MyService`, which in JavaScript
 * is represented by the `MyService` constructor function.
 */
export const Type = Function;

/**
 * Represents a {@link Type}, providing typescript with
 * type safety for the class' prototype and constructor.
 */
export interface Type<T extends object = {}> extends Function {
    prototype: Ctor<T>;
    new (...args: any[]): any;
}

/** Safely assert that `val` is a `Type`. */
export function isType<T extends object = {}>(val: any): val is Type<T> {
    return val !== null && val !== undefined && typeof val === 'function';
}
