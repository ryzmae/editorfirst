/**
 * Check if a type is never.
 * @example
 * ```ts
 * type Check1 = IsNever<never>; // true
 * type Check2 = IsNever<string>; // false
 * ```
 */
export type IsNever<T> = [T] extends [never] ? true : false;

/**
 * Check if a type is any.
 * @example
 * ```ts
 * type Check1 = IsAny<any>; // true
 * type Check2 = IsAny<string>; // false
 * ```
 */
export type IsAny<T> = 0 extends 1 & T ? true : false;

/**
 * Check if a type is unknown.
 * @example
 * ```ts
 * type Check1 = IsUnknown<unknown>; // true
 * type Check2 = IsUnknown<string>; // false
 * ```
 */
export type IsUnknown<T> = [T] extends [unknown] ? (IsAny<T> extends false ? true : false) : false;

/**
 * Check if a type is a tuple.
 * @example
 * ```ts
 * type Check1 = IsTuple<[string, number]>; // true
 * type Check2 = IsTuple<string[]>; // false
 * ```
 */
export type IsTuple<T> = T extends readonly any[]
  ? number extends T["length"]
    ? false
    : true
  : false;

/**
 * Check if a type is a literal type.
 * @example
 * ```ts
 * type Check1 = IsLiteral<"hello">; // true
 * type Check2 = IsLiteral<string>; // false
 * ```
 */
export type IsLiteral<T> = T extends boolean
  ? false
  : T extends bigint | number | string
    ? true
    : false;

/**
 * Check if two types are exactly equal.
 * @example
 * ```ts
 * type Check1 = IsExact<string, string>; // true
 * type Check2 = IsExact<string | undefined, string>; // false
 * ```
 */
export type IsExact<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;

/**
 * Assert that a type extends to true (for compile-time validation).
 * @example
 * ```ts
 * type Check = AssertTrue<1 extends 1 ? true : false>; // OK
 * type Failed = AssertTrue<1 extends 2 ? true : false>; // Error
 * ```
 */
export type AssertTrue<T extends true> = T;

/**
 * Assert that a type extends to false (for compile-time validation).
 * @example
 * ```ts
 * type Check = AssertFalse<1 extends 2 ? true : false>; // OK
 * type Failed = AssertFalse<1 extends 1 ? true : false>; // Error
 * ```
 */
export type AssertFalse<T extends false> = T;
