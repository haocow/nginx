export type Nothing = null | undefined;
export type Maybe<T> = T | Nothing;

export function isSome<T>(arg: Maybe<T> | void): arg is NonNullable<T> {
    return arg !== undefined && arg !== null;
}
