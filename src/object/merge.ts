/**
 * Make specific properties optional.
 * @example
 * ```ts
 * type User = { name: string; age: number; email: string };
 * type PartialUser = Optional<User, "age" | "email">; // { name: string; age?: number; email?: string }
 * ```
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Make only specific properties required, all others optional.
 * @example
 * ```ts
 * type User = { name?: string; age?: number; email?: string };
 * type RequiredUser = RequiredOnly<User, "name">; // { name: string; age?: number; email?: string }
 * ```
 */
export type RequiredOnly<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>;

/**
 * Merge two object types, with B's properties overriding A's.
 * @example
 * ```ts
 * type A = { name: string; age: number };
 * type B = { age: number; email: string };
 * type Merged = Merge<A, B>; // { name: string; age: number; email: string }
 * ```
 */
export type Merge<A, B> = Omit<A, keyof B> & B;

/**
 * Overwrite properties of A with properties from B.
 * Alias for Merge.
 * @example
 * ```ts
 * type A = { name: string; age: number };
 * type B = { age: string };
 * type Result = Overwrite<A, B>; // { name: string; age: string }
 * ```
 */
export type Overwrite<A, B> = Merge<A, B>;

/**
 * Get the difference between two object types (keys in A but not in B).
 * @example
 * ```ts
 * type A = { name: string; age: number; email: string };
 * type B = { name: string };
 * type Result = Diff<A, B>; // { age: number; email: string }
 * ```
 */
export type Diff<A, B> = Omit<A, keyof B>;

/**
 * Get the intersection of keys between two object types.
 * @example
 * ```ts
 * type A = { name: string; age: number };
 * type B = { name: string; email: string };
 * type Result = Intersect<A, B>; // { name: string }
 * ```
 */
export type Intersect<A, B> = Pick<A, Extract<keyof A, keyof B>>;

/**
 * Get properties of A that are not in B.
 * Alias for Diff.
 * @example
 * ```ts
 * type A = { name: string; age: number };
 * type B = { age: number };
 * type Result = Without<A, B>; // { name: string }
 * ```
 */
export type Without<T, K> = Omit<T, keyof K>;
