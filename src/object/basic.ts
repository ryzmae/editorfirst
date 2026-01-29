/**
 * Strictly pick a subset of keys from an object.
 * Enforces that the keys must exist on the object type.
 * @example
 * ```ts
 * type User = { name: string; age: number };
 * type UserName = StrictPick<User, "name">; // { name: string }
 * ```
 */
export type StrictPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

/**
 * Strictly omit a subset of keys from an object.
 * Enforces that the keys must exist on the object type.
 * @example
 * ```ts
 * type User = { name: string; age: number };
 * type UserAge = StrictOmit<User, "name">; // { age: number }
 * ```
 */
export type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Pick elements from a tuple based on indices.
 * @example
 * ```ts
 * type Tuple = [string, number, boolean];
 * type Result = PickFromTuple<Tuple, [0, 2]>; // [string, boolean]
 * ```
 */
export type PickFromTuple<T extends readonly unknown[], Keys extends readonly (keyof T)[]> = {
  [K in Keys[number]]: T[K];
} & unknown[];

/**
 * Omit elements from a tuple based on indices.
 * @example
 * ```ts
 * type Tuple = [string, number, boolean];
 * type Result = OmitFromTuple<Tuple, [1]>; // [string, boolean]
 * ```
 */
export type OmitFromTuple<T extends readonly unknown[], Keys extends readonly unknown[]> = {
  [K in keyof T]: K extends Keys[number] ? never : T[K];
} & { length: unknown };

/**
 * Convert readonly properties to mutable properties.
 * @example
 * ```ts
 * type ReadonlyUser = { readonly name: string; readonly age: number };
 * type User = Mutable<ReadonlyUser>; // { name: string; age: number }
 * ```
 */
export type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

/**
 * Recursively convert all properties to readonly.
 * @example
 * ```ts
 * type User = { name: string; address: { city: string } };
 * type ReadonlyUser = ReadonlyDeep<User>; // { readonly name: string; readonly address: { readonly city: string } }
 * ```
 */
export type ReadonlyDeep<T> = T extends object
  ? {
      readonly [K in keyof T]: ReadonlyDeep<T[K]>;
    }
  : T;
