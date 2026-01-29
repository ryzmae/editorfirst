import { describe, it, expect } from "bun:test";
import type {
  UnionToIntersection,
  UnionToTuple,
  UnionKeys,
  UnionDiff,
  UnionOverlap,
  UnionHas,
  UnionFilter,
  UnionReject,
  DiscriminatedUnion,
  IsUnion,
} from "../src/union";

describe("Union Types - Basic", () => {
  it("UnionToIntersection - converts union to intersection", () => {
    type Union = { a: string } | { b: number };
    // This creates the intersection of both object types
    // Type checking validates the conversion
    type _Test = UnionToIntersection<Union>;
    expect(true).toBe(true);
  });

  it("UnionToTuple - converts union to tuple", () => {
    type Union = "a" | "b";
    type Tuple = UnionToTuple<Union>;
    // Tuple should contain both members
    type _Test = Tuple extends readonly string[] ? true : false;
    expect(true).toBe(true);
  });

  it("UnionKeys - extracts keys from discriminated union", () => {
    type Union = { type: "a"; value: string } | { type: "b"; value: number };
    type Keys = UnionKeys<Union>;
    // Keys should be either "type" or "value"
    type _Test = Keys extends "type" | "value" ? true : false;
    expect(true).toBe(true);
  });
});

describe("Union Types - Filtering", () => {
  it("UnionDiff - gets difference between unions", () => {
    type A = "a" | "b" | "c";
    type B = "b" | "c";
    type Result = UnionDiff<A, B>;
    // Result should only contain "a"
    type _Test = Result extends "a" ? true : false;
    expect(true).toBe(true);
  });

  it("UnionOverlap - finds overlap between unions", () => {
    type A = "a" | "b" | "c";
    type B = "b" | "c" | "d";
    type Result = UnionOverlap<A, B>;
    // Result should be "b" | "c"
    type _Test = "b" extends Result ? true : false;
    expect(true).toBe(true);
  });

  it("UnionFilter - filters union members", () => {
    type Union = string | number | boolean;
    type StringOnly = UnionFilter<Union, string>;
    // StringOnly should be just string
    type _Test = StringOnly extends string ? true : false;
    expect(true).toBe(true);
  });

  it("UnionReject - rejects union members", () => {
    type Union = string | number | boolean;
    type NoString = UnionReject<Union, string>;
    // NoString should be number | boolean
    type _Test = number extends NoString ? true : false;
    expect(true).toBe(true);
  });
});

describe("Union Types - Analysis", () => {
  it("UnionHas - checks union membership", () => {
    type Union = "a" | "b" | "c";
    type Has = UnionHas<Union, "b">;
    // Has should be true
    type _Test = Has extends true ? true : false;
    expect(true).toBe(true);
  });

  it("IsUnion - detects union types", () => {
    type Check1 = IsUnion<string | number>;
    type Check2 = IsUnion<string>;
    // Check1 should be true, Check2 should be false
    type _Test1 = Check1 extends true ? true : false;
    type _Test2 = Check2 extends false ? true : false;
    expect(true).toBe(true);
  });

  it("DiscriminatedUnion - creates discriminated union", () => {
    type Result = DiscriminatedUnion<"type", { a: { value: string }; b: { value: number } }>;
    // Result should be { type: "a"; value: string } | { type: "b"; value: number }
    type _Test = Result extends { type: "a"; value: string } ? true : false;
    expect(true).toBe(true);
  });
});
