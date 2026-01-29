import { describe, it, expect } from "bun:test";
import type {
  StrictPick,
  StrictOmit,
  Mutable,
  ReadonlyDeep,
  Optional,
  RequiredOnly,
  Merge,
  Diff,
  Intersect,
  ValueOf,
  NonNullableProps,
  NullableProps,
  RenameKey,
  RenameKeys,
  ObjectPaths,
  ObjectPathValue,
} from "../src/object";

/* eslint-disable @oxlint/no-object-mutation */

describe("Object Types - Basic", () => {
  it("StrictPick - pick only specified keys", () => {
    type User = { name: string; age: number; email: string };
    type Picked = StrictPick<User, "name" | "email">;
    const user: Picked = { name: "John", email: "john@example.com" };
    expect(user.name).toBe("John");
  });

  it("StrictOmit - omit specified keys", () => {
    type User = { name: string; age: number; email: string };
    type Omitted = StrictOmit<User, "age">;
    const user: Omitted = { name: "John", email: "john@example.com" };
    expect(user.name).toBe("John");
  });

  it("Mutable - convert readonly to mutable", () => {
    type ReadonlyUser = { readonly name: string; readonly age: number };
    type User = Mutable<ReadonlyUser>;
    let user: User = { name: "Jane", age: 30 };
    user = { ...user, name: "Jane" };
    expect(user.name).toBe("Jane");
  });

  it("ReadonlyDeep - make all properties readonly recursively", () => {
    type User = { name: string; address: { city: string } };
    type ReadonlyUser = ReadonlyDeep<User>;
    const user: ReadonlyUser = { name: "John", address: { city: "NYC" } };
    expect(user.name).toBe("John");
  });
});

describe("Object Types - Modification", () => {
  it("Optional - make specific keys optional", () => {
    type User = { name: string; age: number; email: string };
    type OptionalUser = Optional<User, "age" | "email">;
    const user: OptionalUser = { name: "John" };
    expect(user.name).toBe("John");
  });

  it("RequiredOnly - make only specific keys required", () => {
    type User = { name?: string; age?: number; email?: string };
    type OnlyName = RequiredOnly<User, "name">;
    const user: OnlyName = { name: "John" };
    expect(user.name).toBe("John");
  });

  it("Merge - merge two object types", () => {
    type A = { name: string; age: number };
    type B = { age: number; email: string };
    type Merged = Merge<A, B>;
    const merged: Merged = { name: "John", age: 30, email: "john@example.com" };
    expect(merged.age).toBe(30);
  });

  it("Diff - get difference between two object types", () => {
    type A = { name: string; age: number; email: string };
    type B = { name: string };
    type Difference = Diff<A, B>;
    const diff: Difference = { age: 30, email: "john@example.com" };
    expect(diff.age).toBe(30);
  });
});

describe("Object Types - Analysis", () => {
  it("Intersect - get intersection of keys", () => {
    type A = { name: string; age: number };
    type B = { name: string; email: string };
    type Intersection = Intersect<A, B>;
    const inter: Intersection = { name: "John" };
    expect(inter.name).toBe("John");
  });

  it("ValueOf - get all values from object type", () => {
    type User = { name: string; age: number };
    type Values = ValueOf<User>;
    const value1: Values = "John";
    const value2: Values = 30;
    expect(typeof value1).toBe("string");
    expect(typeof value2).toBe("number");
  });

  it("NonNullableProps - remove null and undefined from properties", () => {
    type User = { name: string | null; age: number | undefined };
    type NonNullable = NonNullableProps<User>;
    const user: NonNullable = { name: "John", age: 30 };
    expect(user.name).toBe("John");
  });

  it("NullableProps - add nullable to all properties", () => {
    type User = { name: string; age: number };
    type Nullable = NullableProps<User>;
    const user1: Nullable = { name: "John", age: 30 };
    const user2: Nullable = { name: null, age: null };
    expect(user1.name).toBe("John");
    expect(user2.name).toBeNull();
  });
});

describe("Object Types - Transformation", () => {
  it("RenameKey - rename a single key", () => {
    type User = { firstName: string; age: number };
    type Renamed = RenameKey<User, "firstName", "name">;
    const user: Renamed = { name: "John", age: 30 };
    expect(user.name).toBe("John");
  });

  it("RenameKeys - rename multiple keys", () => {
    type User = { firstName: string; lastName: string };
    type Renamed = RenameKeys<User, { firstName: "first"; lastName: "last" }>;
    const user: Renamed = { first: "John", last: "Doe" };
    expect(user.first).toBe("John");
  });

  it("ObjectPaths - get all possible paths", () => {
    type User = { name: string; address: { city: string } };
    type Paths = ObjectPaths<User>;
    const path1: Paths = "name";
    const path2: Paths = "address";
    const path3: Paths = "address.city";
    expect(typeof path1).toBe("string");
    expect(typeof path2).toBe("string");
    expect(typeof path3).toBe("string");
  });

  it("ObjectPathValue - get value at path", () => {
    type User = { name: string; address: { city: string } };
    type CityType = ObjectPathValue<User, "address.city">;
    const city: CityType = "NYC";
    expect(typeof city).toBe("string");
  });
});
