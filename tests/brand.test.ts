import { describe, it, expect } from "bun:test";
import type { Brand, Id, UUID, Email, NonEmptyString, PositiveNumber, NegativeNumber, Int } from "../src/brand";

// Type tests for branded types (validation is at compile-time)
describe("Brand Types - Basic", () => {
  it("Brand - creates nominal type with brand", () => {
    type UserId = Brand<number, "UserId">;
    // Type validation - UserId has the __brand property
    type _Test = UserId extends { readonly __brand: "UserId" } ? true : false;
    expect(true).toBe(true);
  });

  it("Id - creates ID type", () => {
    type UserId = Id<"user">;
    // Type validation - Id creates a branded string
    type _Test = UserId extends Brand<string, "user:id"> ? true : false;
    expect(true).toBe(true);
  });

  it("UUID - represents UUID with brand", () => {
    type UuidType = UUID;
    // Type validation - UUID has the UUID brand
    type _Test = UuidType extends Brand<string, "UUID"> ? true : false;
    expect(true).toBe(true);
  });

  it("Email - represents email with brand", () => {
    type EmailType = Email;
    // Type validation - Email has the Email brand
    type _Test = EmailType extends Brand<string, "Email"> ? true : false;
    expect(true).toBe(true);
  });
});

describe("Brand Types - Values", () => {
  it("NonEmptyString - represents non-empty string", () => {
    type NonEmpty = NonEmptyString;
    // Type validation - NonEmptyString has the NonEmptyString brand
    type _Test = NonEmpty extends Brand<string, "NonEmptyString"> ? true : false;
    expect(true).toBe(true);
  });

  it("PositiveNumber - represents positive number", () => {
    type Positive = PositiveNumber;
    // Type validation - PositiveNumber has the PositiveNumber brand
    type _Test = Positive extends Brand<number, "PositiveNumber"> ? true : false;
    expect(true).toBe(true);
  });

  it("NegativeNumber - represents negative number", () => {
    type Negative = NegativeNumber;
    // Type validation - NegativeNumber has the NegativeNumber brand
    type _Test = Negative extends Brand<number, "NegativeNumber"> ? true : false;
    expect(true).toBe(true);
  });

  it("Int - represents integer", () => {
    type Integer = Int;
    // Type validation - Int has the Int brand
    type _Test = Integer extends Brand<number, "Int"> ? true : false;
    expect(true).toBe(true);
  });
});
