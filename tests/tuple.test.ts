import { describe, it, expect } from "bun:test";
import type {
  TupleHead,
  TupleTail,
  TupleLast,
  TupleInit,
  TupleLength,
  TuplePush,
  TuplePop,
  TupleShift,
  TupleUnshift,
  TupleConcat,
  TupleReverse,
  TupleIncludes,
  TupleIndex,
  TupleToUnion,
  ReadonlyTuple,
  MutableTuple,
} from "../src/tuple";

describe("Tuple Types - Accessors", () => {
  it("TupleHead - gets first element", () => {
    type Tuple = [string, number, boolean];
    type Head = TupleHead<Tuple>;
    const head: Head = "test";
    expect(typeof head).toBe("string");
  });

  it("TupleTail - gets all elements except first", () => {
    type Tuple = [string, number, boolean];
    type Tail = TupleTail<Tuple>;
    const tail: Tail = [1, true];
    expect(tail.length).toBe(2);
  });

  it("TupleLast - gets last element", () => {
    type Tuple = [string, number, boolean];
    type Last = TupleLast<Tuple>;
    const last: Last = true;
    expect(typeof last).toBe("boolean");
  });

  it("TupleInit - gets all elements except last", () => {
    type Tuple = [string, number, boolean];
    type Init = TupleInit<Tuple>;
    const init: Init = ["test", 1];
    expect(init.length).toBe(2);
  });

  it("TupleLength - gets tuple length", () => {
    type Tuple = [string, number, boolean];
    type Length = TupleLength<Tuple>;
    const len: Length = 3;
    expect(len).toBe(3);
  });
});

describe("Tuple Types - Mutation", () => {
  it("TuplePush - adds element to end", () => {
    type Tuple = [string, number];
    type Result = TuplePush<Tuple, boolean>;
    const result: Result = ["test", 1, true];
    expect(result.length).toBe(3);
  });

  it("TuplePop - removes last element", () => {
    type Tuple = [string, number, boolean];
    type Result = TuplePop<Tuple>;
    const result: Result = ["test", 1];
    expect(result.length).toBe(2);
  });

  it("TupleShift - removes first element", () => {
    type Tuple = [string, number, boolean];
    type Result = TupleShift<Tuple>;
    const result: Result = [1, true];
    expect(result.length).toBe(2);
  });

  it("TupleUnshift - adds element to beginning", () => {
    type Tuple = [string, number];
    type Result = TupleUnshift<Tuple, boolean>;
    const result: Result = [true, "test", 1];
    expect(result.length).toBe(3);
  });

  it("TupleConcat - concatenates tuples", () => {
    type A = [string, number];
    type B = [boolean, symbol];
    type Result = TupleConcat<A, B>;
    const result: Result = ["test", 1, true, Symbol("test")];
    expect(result.length).toBe(4);
  });
});

describe("Tuple Types - Analysis", () => {
  it("TupleReverse - reverses tuple order", () => {
    type Tuple = [string, number, boolean];
    type Result = TupleReverse<Tuple>;
    const result: Result = [true, 1, "test"];
    expect(result.length).toBe(3);
  });

  it("TupleIncludes - checks if tuple includes type", () => {
    type Tuple = [string, number, boolean];
    type Includes = TupleIncludes<Tuple, string>;
    const includes: Includes = true;
    expect(includes).toBe(true);
  });

  it("TupleIndex - finds index of type", () => {
    type Tuple = [string, number, boolean];
    type Index = TupleIndex<Tuple, number>;
    const index: Index = 1;
    expect(index).toBe(1);
  });

  it("TupleToUnion - converts tuple to union", () => {
    type Tuple = [string, number, boolean];
    type Union = TupleToUnion<Tuple>;
    const value1: Union = "test";
    const value2: Union = 1;
    const value3: Union = true;
    expect(typeof value1).toBe("string");
    expect(typeof value2).toBe("number");
    expect(typeof value3).toBe("boolean");
  });
});

describe("Tuple Types - Mutability", () => {
  it("ReadonlyTuple - makes tuple readonly", () => {
    type Tuple = [string, number];
    type Readonly = ReadonlyTuple<Tuple>;
    const tuple: Readonly = ["test", 1];
    expect(tuple[0]).toBe("test");
  });

  it("MutableTuple - makes readonly tuple mutable", () => {
    type Tuple = readonly [string, number];
    type Mutable = MutableTuple<Tuple>;
    const tuple: Mutable = ["test", 1];
    expect(tuple[0]).toBe("test");
  });
});
