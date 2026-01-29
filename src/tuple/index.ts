/**
 * Get the first element of a tuple.
 * @example
 * ```ts
 * type Tuple = [string, number, boolean];
 * type Head = TupleHead<Tuple>; // string
 * ```
 */
export type TupleHead<T extends readonly any[]> = T extends readonly [infer H, ...any[]]
  ? H
  : never;

/**
 * Get all elements except the first of a tuple.
 * @example
 * ```ts
 * type Tuple = [string, number, boolean];
 * type Tail = TupleTail<Tuple>; // [number, boolean]
 * ```
 */
export type TupleTail<T extends readonly any[]> = T extends readonly [any, ...infer R] ? R : [];

/**
 * Get the last element of a tuple.
 * @example
 * ```ts
 * type Tuple = [string, number, boolean];
 * type Last = TupleLast<Tuple>; // boolean
 * ```
 */
export type TupleLast<T extends readonly any[]> = T extends readonly [...any[], infer L]
  ? L
  : never;

/**
 * Get all elements except the last of a tuple.
 * @example
 * ```ts
 * type Tuple = [string, number, boolean];
 * type Init = TupleInit<Tuple>; // [string, number]
 * ```
 */
export type TupleInit<T extends readonly any[]> = T extends readonly [...infer I, any] ? I : [];

/**
 * Get the length of a tuple as a number type.
 * @example
 * ```ts
 * type Tuple = [string, number, boolean];
 * type Length = TupleLength<Tuple>; // 3
 * ```
 */
export type TupleLength<T extends readonly any[]> = T["length"];

/**
 * Add an element to the end of a tuple.
 * @example
 * ```ts
 * type Tuple = [string, number];
 * type Result = TuplePush<Tuple, boolean>; // [string, number, boolean]
 * ```
 */
export type TuplePush<T extends readonly any[], V> = [...T, V];

/**
 * Remove the last element from a tuple.
 * @example
 * ```ts
 * type Tuple = [string, number, boolean];
 * type Result = TuplePop<Tuple>; // [string, number]
 * ```
 */
export type TuplePop<T extends readonly any[]> = T extends readonly [...infer R, any] ? R : [];

/**
 * Remove the first element from a tuple.
 * @example
 * ```ts
 * type Tuple = [string, number, boolean];
 * type Result = TupleShift<Tuple>; // [number, boolean]
 * ```
 */
export type TupleShift<T extends readonly any[]> = T extends readonly [any, ...infer R] ? R : [];

/**
 * Add an element to the beginning of a tuple.
 * @example
 * ```ts
 * type Tuple = [string, number];
 * type Result = TupleUnshift<Tuple, boolean>; // [boolean, string, number]
 * ```
 */
export type TupleUnshift<T extends readonly any[], V> = [V, ...T];

/**
 * Concatenate two tuples.
 * @example
 * ```ts
 * type A = [string, number];
 * type B = [boolean, symbol];
 * type Result = TupleConcat<A, B>; // [string, number, boolean, symbol]
 * ```
 */
export type TupleConcat<A extends readonly any[], B extends readonly any[]> = [...A, ...B];

/**
 * Reverse the order of elements in a tuple.
 * @example
 * ```ts
 * type Tuple = [string, number, boolean];
 * type Result = TupleReverse<Tuple>; // [boolean, number, string]
 * ```
 */
export type TupleReverse<T extends readonly any[], R extends any[] = []> = T extends readonly [
  infer H,
  ...infer Tail,
]
  ? TupleReverse<Tail, [H, ...R]>
  : R;

/**
 * Check if a tuple includes a specific type.
 * @example
 * ```ts
 * type Tuple = [string, number, boolean];
 * type Includes = TupleIncludes<Tuple, string>; // true
 * ```
 */
export type TupleIncludes<T extends readonly any[], V> = V extends T[number] ? true : false;

/**
 * Find the index of a type in a tuple.
 * @example
 * ```ts
 * type Tuple = [string, number, boolean];
 * type Index = TupleIndex<Tuple, number>; // 1
 * ```
 */
export type TupleIndex<T extends readonly any[], V, I extends any[] = []> = T extends readonly [
  infer H,
  ...infer Tail,
]
  ? H extends V
    ? I["length"]
    : TupleIndex<Tail, V, [...I, 1]>
  : -1;

/**
 * Convert a tuple to a union of its elements.
 * @example
 * ```ts
 * type Tuple = [string, number, boolean];
 * type Union = TupleToUnion<Tuple>; // string | number | boolean
 * ```
 */
export type TupleToUnion<T extends readonly any[]> = T[number];

/**
 * Map over tuple elements with a conditional type.
 * @example
 * ```ts
 * type Tuple = [string, number];
 * type Result = TupleMap<Tuple, (x: infer T) => T extends string ? "str" : "num">; // ["str", "num"]
 * ```
 */
export type TupleMap<T extends readonly any[], F extends (x: any) => any> = {
  [K in keyof T]: F extends (x: infer I) => any
    ? T[K] extends I
      ? F extends (x: T[K]) => infer R
        ? R
        : never
      : never
    : never;
};

/**
 * Filter tuple elements based on a condition.
 * @example
 * ```ts
 * type Tuple = [string, number, boolean];
 * type Result = TupleFilter<Tuple, string>; // [string]
 * ```
 */
export type TupleFilter<T extends readonly any[], Condition> = T extends readonly [
  infer H,
  ...infer Tail,
]
  ? H extends Condition
    ? [H, ...TupleFilter<Tail, Condition>]
    : TupleFilter<Tail, Condition>
  : [];

/**
 * Create a strict tuple with exact types.
 * @example
 * ```ts
 * type Tuple = [string, number];
 * type Strict = TupleStrict<Tuple>; // readonly [string, number]
 * ```
 */
export type TupleStrict<T extends readonly any[]> = readonly [...T];

/**
 * Convert a tuple to a readonly tuple.
 * @example
 * ```ts
 * type Tuple = [string, number];
 * type Readonly = ReadonlyTuple<Tuple>; // readonly [string, number]
 * ```
 */
export type ReadonlyTuple<T extends readonly any[]> = readonly [...T];

/**
 * Convert a readonly tuple to a mutable tuple.
 * @example
 * ```ts
 * type Tuple = readonly [string, number];
 * type Mutable = MutableTuple<Tuple>; // [string, number]
 * ```
 */
export type MutableTuple<T extends readonly any[]> = [...T];
