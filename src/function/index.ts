/**
 * Generic function type.
 * @example
 * ```ts
 * type F = Fn<[string, number], boolean>; // (args: string, number) => boolean
 * ```
 */
export type Fn<Args extends readonly any[] = any[], Return = any> = (...args: Args) => Return;

/**
 * Async function type.
 * @example
 * ```ts
 * type AsyncF = AsyncFn<[string], boolean>; // (args: string) => Promise<boolean>
 * ```
 */
export type AsyncFn<Args extends readonly any[] = any[], Return = any> = (...args: Args) => Promise<Return>;

/**
 * Any function type (accepts any arguments and returns any value).
 * @example
 * ```ts
 * type F = AnyFn; // (...args: any[]) => any
 * ```
 */
export type AnyFn = (...args: any[]) => any;

/**
 * Extract the arguments from a function type.
 * @example
 * ```ts
 * type F = (name: string, age: number) => boolean;
 * type Args = FnArgs<F>; // [string, number]
 * ```
 */
export type FnArgs<T extends Fn> = T extends Fn<infer Args> ? Args : [];

/**
 * Extract the return type from a function type.
 * @example
 * ```ts
 * type F = (name: string) => boolean;
 * type Return = FnReturn<F>; // boolean
 * ```
 */
export type FnReturn<T extends Fn> = T extends Fn<any, infer Return> ? Return : any;

/**
 * Extract the 'this' context from a function type.
 * @example
 * ```ts
 * type F = function(this: { name: string }, x: number): boolean;
 * type This = FnThis<F>; // { name: string }
 * ```
 */
export type FnThis<T extends Fn> = T extends (this: infer This, ...args: any[]) => any ? This : unknown;

/**
 * Get all overloads from a function type.
 * @example
 * ```ts
 * type F = {
 *   (x: string): string;
 *   (x: number): number;
 * };
 * type Overloads = FnOverloads<F>; // ((x: string) => string) & ((x: number) => number)
 * ```
 */
export type FnOverloads<T> = T extends { (...args: any[]): any } ? T : never;

/**
 * Get the last overload from a function type.
 * @example
 * ```ts
 * type F = {
 *   (x: string): string;
 *   (x: number): number;
 * };
 * type Last = LastOverload<F>; // (x: number) => number
 * ```
 */
export type LastOverload<T> = T extends AnyFn ? T : never;

/**
 * Get the first overload from a function type.
 * @example
 * ```ts
 * type F = {
 *   (x: string): string;
 *   (x: number): number;
 * };
 * type First = FirstOverload<F>; // (x: string) => string
 * ```
 */
export type FirstOverload<T> = T extends AnyFn ? T : never;

/**
 * Convert a function that returns a value to one that returns a Promise.
 * @example
 * ```ts
 * type F = (x: number) => string;
 * type Async = Promisify<F>; // (x: number) => Promise<string>
 * ```
 */
export type Promisify<T extends Fn> = (...args: FnArgs<T>) => Promise<FnReturn<T>>;

/**
 * Get the awaited return type from an async function.
 * @example
 * ```ts
 * type F = (x: number) => Promise<string>;
 * type Awaited = AwaitedReturn<F>; // string
 * ```
 */
export type AwaitedReturn<T extends Fn> = Awaited<FnReturn<T>>;

/**
 * Curry a function type (convert multi-arg function to series of single-arg functions).
 * @example
 * ```ts
 * type F = (a: string, b: number, c: boolean) => string;
 * type Curried = Curry<F>; // (a: string) => (b: number) => (c: boolean) => string
 * ```
 */
export type Curry<T extends Fn> = T extends (...args: infer Args) => infer Return
  ? Args extends [infer First, ...infer Rest]
    ? (arg: First) => Curry<(...args: Rest) => Return>
    : () => Return
  : never;

/**
 * Uncurry a curried function type (convert to multi-arg function).
 * @example
 * ```ts
 * type Curried = (a: string) => (b: number) => boolean;
 * type Uncurried = Uncurry<Curried>; // (a: string, b: number) => boolean
 * ```
 */
export type Uncurry<T> = T extends (arg: infer A) => infer R
  ? R extends (...args: infer Args) => infer RReturn
    ? (arg: A, ...args: Args) => RReturn
    : (arg: A) => R
  : T;

/**
 * Pipe a series of functions together.
 * @example
 * ```ts
 * type P = Pipe<[(x: number) => string, (x: string) => boolean]>; // (x: number) => boolean
 * ```
 */
export type Pipe<T extends readonly Fn[]> = T extends readonly [infer F extends Fn, ...infer Rest extends Fn[]]
  ? Rest extends []
    ? F
    : (arg: Parameters<F>[0]) => ReturnType<Pipe<Rest>>
  : Fn;

/**
 * Compose a series of functions together (right-to-left).
 * @example
 * ```ts
 * type C = Compose<[(x: string) => boolean, (x: number) => string]>; // (x: number) => boolean
 * ```
 */
export type Compose<T extends readonly Fn[]> = T extends readonly [...infer Rest extends Fn[], infer F extends Fn]
  ? Rest extends []
    ? F
    : (arg: Parameters<Compose<Rest>>[0]) => ReturnType<F>
  : Fn;
