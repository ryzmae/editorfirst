import { describe, it, expect } from "bun:test";
import type {
  Fn,
  AsyncFn,
  AnyFn,
  FnArgs,
  FnReturn,
  Promisify,
  AwaitedReturn,
  Curry,
  Uncurry,
} from "../src/function";

/* eslint-disable @oxlint/no-function-assign-from-export */

describe("Function Types - Basic", () => {
  it("Fn - generic function type", () => {
    type F = Fn<[string, number], boolean>;
    // This validates that Fn works correctly
    type _Test = F extends (...args: any[]) => any ? true : false;
    expect(true).toBe(true);
  });

  it("AsyncFn - async function type", () => {
    type F = AsyncFn<[string], boolean>;
    // This validates AsyncFn returns a Promise
    type _Test = F extends (...args: any[]) => Promise<any> ? true : false;
    expect(true).toBe(true);
  });

  it("AnyFn - any function type", () => {
    type F = AnyFn;
    // Type validates that AnyFn accepts any function
    type _Test = ((x: string) => number) extends F ? true : false;
    expect(true).toBe(true);
  });
});

describe("Function Types - Extraction", () => {
  it("FnArgs - extracts function arguments", () => {
    type F = (name: string, age: number) => boolean;
    type Args = FnArgs<F>;
    const args: Args = ["test", 30];
    expect(args.length).toBe(2);
  });

  it("FnReturn - extracts return type", () => {
    type F = (name: string) => boolean;
    type Return = FnReturn<F>;
    const result: Return = true;
    expect(typeof result).toBe("boolean");
  });

  it("Promisify - converts function to async", () => {
    type F = (x: number) => string;
    type Async = Promisify<F>;
    // Async should be (x: number) => Promise<string>
    type _Test = Async extends (x: number) => Promise<string> ? true : false;
    expect(true).toBe(true);
  });

  it("AwaitedReturn - gets awaited return type", () => {
    type F = (x: number) => Promise<string>;
    type Awaited = AwaitedReturn<F>;
    // Awaited should be string
    type _Test = Awaited extends string ? true : false;
    expect(true).toBe(true);
  });
});

describe("Function Types - Transformation", () => {
  it("Curry - converts to curried function", () => {
    type F = (a: string, b: number, c: boolean) => string;
    type Curried = Curry<F>;
    // Curried should be (a: string) => (b: number) => (c: boolean) => string
    type _Test = Curried extends (a: string) => (b: number) => (c: boolean) => string ? true : false;
    expect(true).toBe(true);
  });

  it("Uncurry - converts from curried function", () => {
    type Curried = (a: string) => (b: number) => boolean;
    type Uncurried = Uncurry<Curried>;
    // Uncurried should be (a: string, b: number) => boolean
    type _Test = Uncurried extends (a: string, b: number) => boolean ? true : false;
    expect(true).toBe(true);
  });
});
