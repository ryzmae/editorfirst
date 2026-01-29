import { describe, it, expect } from "bun:test";
import type {
  DeepPick,
  DeepOmit,
  DeepPartial,
  DeepRequired,
  DeepReadonly,
  DeepMutable,
  DeepNonNullable,
  DeepKeys,
  DeepValue,
} from "../src/deep";

describe("Deep Types - Picking & Omitting", () => {
  it("DeepPick - picks nested properties", () => {
    type User = { name: string; address: { city: string; zip: string } };
    type Result = DeepPick<User, "name">;
    const result: Result = { name: "John" };
    expect(result.name).toBe("John");
  });

  it("DeepOmit - omits nested properties", () => {
    type User = { name: string; address: { city: string; zip: string } };
    type Result = DeepOmit<User, "address.zip">;
    const result: Result = { name: "John", address: { city: "NYC" } };
    expect(result.name).toBe("John");
  });
});

describe("Deep Types - Modification", () => {
  it("DeepPartial - makes all properties optional recursively", () => {
    type User = { name: string; address: { city: string } };
    type Partial = DeepPartial<User>;
    const partial1: Partial = {};
    expect(partial1).toEqual({});
  });

  it("DeepRequired - makes all properties required recursively", () => {
    type User = { name?: string; address?: { city?: string } };
    type Required = DeepRequired<User>;
    const user: Required = { name: "John", address: { city: "NYC" } };
    expect(user.name).toBe("John");
  });

  it("DeepReadonly - makes all properties readonly recursively", () => {
    type User = { name: string; address: { city: string } };
    type Readonly = DeepReadonly<User>;
    const user: Readonly = { name: "John", address: { city: "NYC" } };
    expect(user.name).toBe("John");
  });

  it("DeepMutable - makes all properties mutable recursively", () => {
    type User = { readonly name: string; readonly address: { readonly city: string } };
    type Mutable = DeepMutable<User>;
    let user: Mutable = { name: "John", address: { city: "NYC" } };
    user = { ...user, name: "Jane" };
    expect(user.name).toBe("Jane");
  });

  it("DeepNonNullable - removes null/undefined recursively", () => {
    type User = { name: string | null; address: { city: string | undefined } };
    type NonNull = DeepNonNullable<User>;
    const user: NonNull = { name: "John", address: { city: "NYC" } };
    expect(user.name).toBe("John");
  });
});

describe("Deep Types - Analysis", () => {
  it("DeepKeys - gets all deep keys", () => {
    type User = { name: string; address: { city: string } };
    type Keys = DeepKeys<User>;
    const key1: Keys = "name";
    const key2: Keys = "address";
    const key3: Keys = "address.city";
    expect(typeof key1).toBe("string");
    expect(typeof key2).toBe("string");
    expect(typeof key3).toBe("string");
  });

  it("DeepValue - gets value at deep path", () => {
    type User = { name: string; address: { city: string } };
    type CityValue = DeepValue<User, "address.city">;
    const city: CityValue = "NYC";
    expect(typeof city).toBe("string");
  });
});
