/**
 * Rename a key in an object type.
 * @example
 * ```ts
 * type User = { firstName: string; age: number };
 * type Renamed = RenameKey<User, "firstName", "name">; // { name: string; age: number }
 * ```
 */
export type RenameKey<T, From extends keyof T, To extends string> = To extends keyof T
  ? T
  : Omit<T, From> & {
      [K in To]: T[From];
    };

/**
 * Rename multiple keys in an object type.
 * @example
 * ```ts
 * type User = { firstName: string; lastName: string };
 * type Renamed = RenameKeys<User, { firstName: "name"; lastName: "surname" }>; // { name: string; surname: string }
 * ```
 */
export type RenameKeys<T, Map extends Record<string, string>> = {
  [K in keyof T as K extends keyof Map ? Map[K & string] : K]: T[K];
};

/**
 * Flatten a nested object type into a single level.
 * @example
 * ```ts
 * type User = { name: string; address: { city: string; zip: string } };
 * type Flattened = FlattenObject<User>; // { name: string; city: string; zip: string }
 * ```
 */
export type FlattenObject<T> = T extends object
  ? {
      [K in keyof T]-?: T[K] extends object ? FlattenObject<T[K]> : T[K];
    }[keyof T]
  : T;

/**
 * Get all possible paths through an object type.
 * @example
 * ```ts
 * type User = { name: string; address: { city: string } };
 * type Paths = ObjectPaths<User>; // "name" | "address" | "address.city"
 * ```
 */
export type ObjectPaths<T, Prefix extends string = ""> = {
  [K in keyof T]-?: K extends string
    ? Prefix extends ""
      ? K | ObjectPaths<T[K], K>
      : `${Prefix}.${K}` | ObjectPaths<T[K], `${Prefix}.${K}`>
    : never;
}[keyof T];

/**
 * Get the value at a specific path in an object type.
 * @example
 * ```ts
 * type User = { name: string; address: { city: string } };
 * type CityValue = ObjectPathValue<User, "address.city">; // string
 * ```
 */
export type ObjectPathValue<T, Path extends string> = Path extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? ObjectPathValue<T[Key], Rest>
    : never
  : Path extends keyof T
    ? T[Path]
    : never;
