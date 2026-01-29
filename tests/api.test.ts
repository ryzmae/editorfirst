import { describe, it, expect } from "bun:test";
import type {
  JsonValue,
  JsonObject,
  JsonArray,
  ApiResponse,
  ApiError,
  HttpMethod,
  StatusCode,
} from "../src/api";

describe("API Types - JSON", () => {
  it("JsonValue - accepts various JSON types", () => {
    const str: JsonValue = "test";
    const num: JsonValue = 123;
    const bool: JsonValue = true;
    const nil: JsonValue = null;
    expect(typeof str).toBe("string");
    expect(typeof num).toBe("number");
    expect(typeof bool).toBe("boolean");
    expect(nil).toBeNull();
  });

  it("JsonObject - represents JSON object", () => {
    const obj: JsonObject = { name: "John", age: 30 };
    expect(obj.name).toBe("John");
  });

  it("JsonArray - represents JSON array", () => {
    const arr: JsonArray = ["test", 123, true, null];
    expect(arr[0]).toBe("test");
  });
});

describe("API Types - Responses", () => {
  it("ApiResponse - wraps successful data", () => {
    type UserData = { id: string; name: string };
    type Response = ApiResponse<UserData>;
    const response: Response = {
      success: true,
      data: { id: "123", name: "John" },
    };
    expect(response.success).toBe(true);
    expect(response.data.name).toBe("John");
  });

  it("ApiError - wraps error information", () => {
    type ErrorDetails = { field: string; message: string };
    type Error = ApiError<ErrorDetails>;
    const error: Error = {
      success: false,
      error: "Validation failed",
      details: { field: "email", message: "Invalid email" },
    };
    expect(error.success).toBe(false);
    expect(error.error).toBe("Validation failed");
  });
});

describe("API Types - HTTP", () => {
  it("HttpMethod - represents HTTP methods", () => {
    const methods: HttpMethod[] = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"];
    expect(methods[0]).toBe("GET");
  });

  it("StatusCode - represents HTTP status codes", () => {
    const codes: StatusCode[] = [200, 201, 204, 400, 401, 403, 404, 500];
    expect(codes[0]).toBe(200);
  });
});
