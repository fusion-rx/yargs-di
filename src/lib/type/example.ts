/**
 * An example of a command.
 */
export declare interface Example {
    command?: string;
    example: string;
}

/**
 * Safely assert that `val` is an `Example`.
 */
export const isExample = (val: any): val is Example => {
    return (
        val !== null &&
        val !== undefined &&
        typeof val === 'object' &&
        'example' in val
    );
};
