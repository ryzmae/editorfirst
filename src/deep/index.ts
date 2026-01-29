/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Deep pick properties from a nested object using dot notation paths.
 * @example
 * ```ts
 * type User = { name: string; address: { city: string; zip: string } };
 * type Result = DeepPick<User, "name" | "address.city">; // { name: string; address: { city: string } }
 * ```
 */
export type DeepPick<T, K extends string> = K extends `${infer First}.${infer Rest}`
  ? First extends keyof T
    ? { [P in First]: DeepPick<T[First], Rest> }
    : Record<never, never>
  : K extends keyof T
    ? { [P in K]: T[P] }
    : Record<never, never>;

/**
 * Deep omit properties from a nested object using dot notation paths.
 * @example
 * ```ts
 * type User = { name: string; address: { city: string; zip: string } };
 * type Result = DeepOmit<User, "address.zip">; // { name: string; address: { city: string } }
 * ```
 */
export type DeepOmit<T, K extends string> = K extends `${infer First}.${infer Rest}`
  ? First extends keyof T
    ? { [P in Exclude<keyof T, First>]: T[P] } & { [P in First]: DeepOmit<T[First], Rest> }
    : T
  : Omit<T, K & keyof T>;

/**
 * Recursively make all properties optional.
 * @example
 * ```ts
 * type User = { name: string; address: { city: string } };
 * type Partial = DeepPartial<User>; // { name?: string; address?: { city?: string } }
 * ```
 */
export type DeepPartial<T> = T extends object
  ? {
      [K in keyof T]?: DeepPartial<T[K]>;
    }
  : T;

/**
 * Recursively make all properties required.
 * @example
 * ```ts
 * type User = { name?: string; address?: { city?: string } };
 * type Required = DeepRequired<User>; // { name: string; address: { city: string } }
 * ```
 */
export type DeepRequired<T> = T extends object
  ? {
      [K in keyof T]-?: DeepRequired<T[K]>;
    }
  : T;

/**
 * Recursively make all properties readonly.
 * @example
 * ```ts
 * type User = { name: string; address: { city: string } };
 * type Readonly = DeepReadonly<User>; // { readonly name: string; readonly address: { readonly city: string } }
 * ```
 */
export type DeepReadonly<T> = T extends object
  ? {
      readonly [K in keyof T]: DeepReadonly<T[K]>;
    }
  : T;

/**
 * Recursively make all properties mutable.
 * @example
 * ```ts
 * type User = { readonly name: string; readonly address: { readonly city: string } };
 * type Mutable = DeepMutable<User>; // { name: string; address: { city: string } }
 * ```
 */
export type DeepMutable<T> = T extends object
  ? {
      -readonly [K in keyof T]: DeepMutable<T[K]>;
    }
  : T;

/**
 * Recursively remove null and undefined from all properties.
 * @example
 * ```ts
 * type User = { name: string | null; address: { city: string | undefined } };
 * type NonNull = DeepNonNullable<User>; // { name: string; address: { city: string } }
 * ```
 */
export type DeepNonNullable<T> = T extends object
  ? {
      [K in keyof T]-?: Exclude<DeepNonNullable<T[K]>, null | undefined>;
    }
  : Exclude<T, null | undefined>;

/**
 * Get all possible paths through a nested object.
 * @example
 * ```ts
 * type User = { name: string; address: { city: string } };
 * type Keys = DeepKeys<User>; // "name" | "address" | "address.city"
 * ```
 */
export type DeepKeys<T, Prefix extends string = ""> = {
  [K in keyof T]-?: K extends string
    ? Prefix extends ""
      ? K | (T[K] extends object ? DeepKeys<T[K], K> : never)
      : `${Prefix}.${K}` | (T[K] extends object ? DeepKeys<T[K], `${Prefix}.${K}`> : never)
    : never;
}[keyof T];

/**
 * Get the type at a deep path in a nested object.
 * @example
 * ```ts
 * type User = { name: string; address: { city: string } };
 * type CityType = DeepValue<User, "address.city">; // string
 * ```
 */
export type DeepValue<T, Path extends string> = Path extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? DeepValue<T[Key], Rest>
    : never
  : Path extends keyof T
    ? T[Path]
    : never;

/**
 * Ensure exact shape match recursively (no extra properties at any depth).
 * @example
 * ```ts
 * type Shape = { name: string; address: { city: string } };
 * type Exact = DeepExact<{ name: string; address: { city: string } }, Shape>;
 * ```
 */
export type DeepExact<T, Shape> = T extends Shape
  ? Shape extends T
    ? {
        [K in keyof T]: T[K] extends object ? DeepExact<T[K], Shape[K & keyof Shape]> : T[K];
      }
    : never
  : never;
