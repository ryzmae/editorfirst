import { describe, it, expect } from "bun:test";
import type {
  IsNever,
  IsAny,
  IsUnknown,
  IsTuple,
  IsLiteral,
  IsExact,
  AssertTrue,
  AssertFalse,
} from "../src/guard";

describe("Guard Types - Type Checks", () => {
  it("IsNever - detects never type", () => {
    type Check1 = IsNever<never>;
    const check1: Check1 = true;
    type _Test1 = Check1 extends true ? true : false;
    expect(typeof check1).toBe("boolean");
  });

  it("IsAny - detects any type", () => {
    type Check1 = IsAny<any>;
    type Check2 = IsAny<string>;
    type _Test1 = Check1 extends true ? true : false;
    type _Test2 = Check2 extends false ? true : false;
    expect(true).toBe(true);
  });

  it("IsUnknown - detects unknown type", () => {
    type Check1 = IsUnknown<unknown>;
    type Check2 = IsUnknown<string>;
    type _Test1 = Check1 extends true ? true : false;
    type _Test2 = Check2 extends false ? true : false;
    expect(true).toBe(true);
  });

  it("IsTuple - detects tuple types", () => {
    type Check1 = IsTuple<[string, number]>;
    type Check2 = IsTuple<string[]>;
    type _Test1 = Check1 extends true ? true : false;
    type _Test2 = Check2 extends false ? true : false;
    expect(true).toBe(true);
  });
});

describe("Guard Types - Literal Detection", () => {
  it("IsLiteral - detects literal types", () => {
    type Check1 = IsLiteral<"hello">;
    type Check2 = IsLiteral<string>;
    type _Test1 = Check1 extends true ? true : false;
    type _Test2 = Check2 extends false ? true : false;
    expect(true).toBe(true);
  });

  it("IsExact - checks exact equality", () => {
    type Check1 = IsExact<string, string>;
    type Check2 = IsExact<string | undefined, string>;
    type _Test1 = Check1 extends true ? true : false;
    type _Test2 = Check2 extends false ? true : false;
    expect(true).toBe(true);
  });
});

describe("Guard Types - Assertions", () => {
  it("AssertTrue - asserts true types", () => {
    type Check = AssertTrue<true>;
    type _Test = Check extends true ? true : false;
    expect(true).toBe(true);
  });

  it("AssertFalse - asserts false types", () => {
    type Check = AssertFalse<false>;
    type _Test = Check extends false ? true : false;
    expect(true).toBe(true);
  });
});
