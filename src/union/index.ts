/**
 * Convert a union type to an intersection type.
 * @example
 * ```ts
 * type Union = { name: string } | { age: number };
 * type Intersection = UnionToIntersection<Union>; // { name: string } & { age: number }
 * ```
 */
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

/**
 * Convert a union type to a tuple type.
 * @example
 * ```ts
 * type Union = "a" | "b" | "c";
 * type Tuple = UnionToTuple<Union>; // ["a", "b", "c"]
 * ```
 */
export type UnionToTuple<U> =
  UnionToIntersection<U extends any ? (t: U) => U : never> extends (_: any) => infer W
    ? [...UnionToTuple<Exclude<U, W>>, W]
    : [];

/**
 * Get all keys from a discriminated union.
 * @example
 * ```ts
 * type Union = { type: "a"; value: string } | { type: "b"; value: number };
 * type Keys = UnionKeys<Union>; // "type" | "value"
 * ```
 */
export type UnionKeys<U> = U extends any ? keyof U : never;

/**
 * Get all values from a union of object properties.
 * @example
 * ```ts
 * type Union = { name: string } | { age: number };
 * type Values = UnionValues<Union>; // string | number
 * ```
 */
export type UnionValues<U> = U extends any ? U[keyof U] : never;

/**
 * Get the difference between two unions (members in A but not in B).
 * @example
 * ```ts
 * type A = "a" | "b" | "c";
 * type B = "b" | "c";
 * type Result = UnionDiff<A, B>; // "a"
 * ```
 */
export type UnionDiff<A, B> = A extends any ? (B extends A ? never : A) : never;

/**
 * Get the overlap between two unions (common members).
 * @example
 * ```ts
 * type A = "a" | "b" | "c";
 * type B = "b" | "c" | "d";
 * type Result = UnionOverlap<A, B>; // "b" | "c"
 * ```
 */
export type UnionOverlap<A, B> = A extends any ? (B extends A ? A : never) : never;

/**
 * Get exclusive members between two unions (in A or B but not both).
 * @example
 * ```ts
 * type A = "a" | "b" | "c";
 * type B = "b" | "c" | "d";
 * type Result = UnionExclusive<A, B>; // "a" | "d"
 * ```
 */
export type UnionExclusive<A, B> = UnionDiff<A, B> | UnionDiff<B, A>;

/**
 * Check if a union has a specific member.
 * @example
 * ```ts
 * type Union = "a" | "b" | "c";
 * type Has = UnionHas<Union, "b">; // true
 * ```
 */
export type UnionHas<U, V> = V extends U ? true : false;

/**
 * Filter union members by a condition.
 * @example
 * ```ts
 * type Union = string | number | boolean;
 * type StringOnly = UnionFilter<Union, string>; // string
 * ```
 */
export type UnionFilter<U, Condition> = U extends Condition ? U : never;

/**
 * Reject union members by a condition.
 * @example
 * ```ts
 * type Union = string | number | boolean;
 * type NoString = UnionReject<Union, string>; // number | boolean
 * ```
 */
export type UnionReject<U, Condition> = U extends Condition ? never : U;

/**
 * Create a discriminated union from keys and values.
 * @example
 * ```ts
 * type Result = DiscriminatedUnion<"type", { a: { value: string }; b: { value: number } }>;
 * // { type: "a"; value: string } | { type: "b"; value: number }
 * ```
 */
export type DiscriminatedUnion<K extends PropertyKey, V extends Record<PropertyKey, any>> = {
  [P in keyof V]: V[P] & { [Q in K]: P };
}[keyof V];

/**
 * Distribute over a union (convert to distributive conditional).
 * @example
 * ```ts
 * type Result = Distribute<string | number>; // string | number
 * ```
 */
export type Distribute<T> = T extends any ? T : never;

/**
 * Prevent distribution over a union.
 * @example
 * ```ts
 * type Result = NoDistribute<string | number>; // string | number (no distribution)
 * ```
 */
export type NoDistribute<T> = [T] extends [any] ? T : never;

/**
 * Check if a type is a union.
 * @example
 * ```ts
 * type IsUnion1 = IsUnion<string | number>; // true
 * type IsUnion2 = IsUnion<string>; // false
 * ```
 */
export type IsUnion<T> = [T] extends [infer U]
  ? U extends any
    ? [U] extends [T]
      ? false
      : true
    : never
  : false;

/**
 * Get the count of members in a union.
 * @example
 * ```ts
 * type Length = UnionLength<"a" | "b" | "c">; // 3
 * ```
 */
export type UnionLength<U> = UnionToTuple<U>["length"];

/**
 * Map over union members.
 * @example
 * ```ts
 * type Union = "a" | "b";
 * type Mapped = UnionMap<Union, (x: infer T) => T extends "a" ? "x" : "y">; // "x" | "y"
 * ```
 */
export type UnionMap<U, F extends (x: any) => any> = U extends any
  ? F extends (x: U) => infer R
    ? R
    : never
  : never;

/**
 * Merge all union members into a single object.
 * @example
 * ```ts
 * type Union = { a: string } | { b: number };
 * type Merged = UnionMerge<Union>; // { a: string; b: number }
 * ```
 */
export type UnionMerge<U> =
  UnionToIntersection<U extends any ? () => U : never> extends () => infer R ? R : never;

/**
 * Create a strict union with exact matching.
 * @example
 * ```ts
 * type Strict = UnionStrict<{ a: string } | { b: number }>;
 * ```
 */
export type UnionStrict<U> = U extends any ? { [K in keyof U]: U[K] } : never;

/**
 * Ensure union members are exact types.
 * @example
 * ```ts
 * type Exact = UnionExact<"a" | "b" | "c">;
 * ```
 */
export type UnionExact<U> = [U] extends [infer I]
  ? I extends any
    ? { [K in keyof I]: I[K] }
    : never
  : never;

/**
 * Normalize a union by removing redundant types.
 * @example
 * ```ts
 * type Normalized = UnionNormalize<string | string | number>; // string | number
 * ```
 */
export type UnionNormalize<U> = U extends any ? U : never;
