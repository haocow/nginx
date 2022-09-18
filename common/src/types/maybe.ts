export type Nothing = null | undefined;
export type Maybe<T> = T | Nothing;

export function isSome<T>(arg: Maybe<T> | void): arg is NonNullable<T> {
    return arg !== undefined && arg !== null;
}

export function getTransformedOrElse<T, U>(
    arg: Maybe<T>,
    transformer: (x: T) => U,
    defaultVal: U
) {
    return isSome(arg) ? transformer(arg) : defaultVal;
}
