/**
 * Ensure an object type matches exactly the shape of another type (no extra properties).
 * @example
 * ```ts
 * type Shape = { name: string; age: number };
 * type User = Exact<{ name: string; age: number }, Shape>; // OK
 * ```
 */
export type Exact<T, Shape> = T extends Shape ? (Shape extends T ? T : never) : never;

/**
 * Ensure no extra properties beyond the specified shape (strict typing).
 * @example
 * ```ts
 * type User = NoExtra<{ name: string; age: number }, { name: string; age: number }>;
 * ```
 */
export type NoExtra<T, Shape extends T = T> = T extends object
  ? {
      [K in keyof T]: K extends keyof Shape ? T[K] : never;
    }
  : T;

/**
 * Get all values from an object type.
 * @example
 * ```ts
 * type User = { name: string; age: number };
 * type Values = ValueOf<User>; // string | number
 * ```
 */
export type ValueOf<T> = T[keyof T];

/**
 * Get entries (key-value pairs) from an object type.
 * @example
 * ```ts
 * type User = { name: string; age: number };
 * type Entries = Entries<User>; // ["name" | "age", string | number][]
 * ```
 */
export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

/**
 * Invert keys and values of an object type.
 * @example
 * ```ts
 * type Status = { active: "1"; inactive: "0" };
 * type Inverted = Invert<Status>; // { "1": "active"; "0": "inactive" }
 * ```
 */
export type Invert<T extends Record<string | number | symbol, string | number | symbol>> = {
  [K in T[keyof T]]: {
    [P in keyof T]: T[P] extends K ? P : never;
  }[keyof T];
};

/**
 * Make all properties of an object non-nullable (remove null and undefined).
 * @example
 * ```ts
 * type User = { name: string | null; age: number | undefined };
 * type NonNullableUser = NonNullableProps<User>; // { name: string; age: number }
 * ```
 */
export type NonNullableProps<T> = {
  [K in keyof T]-?: Exclude<T[K], null | undefined>;
};

/**
 * Make all properties of an object nullable (allow null and undefined).
 * @example
 * ```ts
 * type User = { name: string; age: number };
 * type NullableUser = NullableProps<User>; // { name: string | null; age: number | null }
 * ```
 */
export type NullableProps<T> = {
  [K in keyof T]: T[K] | null;
};
