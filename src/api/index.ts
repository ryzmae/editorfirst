/**
 * JSON primitive values.
 * @example
 * ```ts
 * type Value = JsonValue; // string | number | boolean | null | JsonObject | JsonArray
 * ```
 */
export type JsonValue = string | number | boolean | null | JsonObject | JsonArray;

/**
 * JSON object type.
 * @example
 * ```ts
 * type Obj = JsonObject; // { [key: string]: JsonValue }
 * ```
 */
export type JsonObject = { [key: string]: JsonValue };

/**
 * JSON array type.
 * @example
 * ```ts
 * type Arr = JsonArray; // JsonValue[]
 * ```
 */
export type JsonArray = JsonValue[];

/**
 * Type that can be serialized to JSON.
 * @example
 * ```ts
 * type User = { name: string; age: number };
 * type Serializable = Serializable<User>; // { name: string; age: number }
 * ```
 */
export type Serializable<T> = T extends (...args: any[]) => any
  ? never
  : T extends object
    ? { [K in keyof T]: Serializable<T[K]> }
    : T;

/**
 * Generic API response wrapper.
 * @example
 * ```ts
 * type Response = ApiResponse<{ id: string; name: string }>;
 * // { success: boolean; data: { id: string; name: string }; error?: string }
 * ```
 */
export type ApiResponse<T> = {
  success: boolean;
  data: T;
  error?: string;
};

/**
 * Generic API error response.
 * @example
 * ```ts
 * type Error = ApiError<{ field: string; message: string }>;
 * // { success: false; error: string; details?: { field: string; message: string } }
 * ```
 */
export type ApiError<T = Record<string, any>> = {
  success: false;
  error: string;
  details?: T;
};

/**
 * HTTP methods.
 * @example
 * ```ts
 * type Method = HttpMethod; // "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS"
 * ```
 */
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";

/**
 * HTTP status codes.
 * @example
 * ```ts
 * type Code = StatusCode; // 200 | 201 | 204 | 400 | 401 | 403 | 404 | 500 | ...
 * ```
 */
export type StatusCode =
  | 200
  | 201
  | 202
  | 204
  | 206
  | 300
  | 301
  | 302
  | 303
  | 304
  | 307
  | 308
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 409
  | 410
  | 413
  | 414
  | 415
  | 422
  | 429
  | 500
  | 501
  | 502
  | 503
  | 504;

/**
 * Extract route parameters from a path string.
 * @example
 * ```ts
 * type Params = RouteParams<"/users/:id/posts/:postId">; // { id: string; postId: string }
 * ```
 */
export type RouteParams<Path extends string> =
  Path extends `${infer _}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof RouteParams<`/${Rest}`>]: string }
    : Path extends `${infer _}:${infer Param}`
      ? { [K in Param]: string }
      : Record<never, never>;

/**
 * Extract and type query parameters from an object.
 * @example
 * ```ts
 * type Params = QueryParams<{ page: string; limit: number; sort?: string }>;
 * // { page?: string; limit?: number; sort?: string }
 * ```
 */
export type QueryParams<T extends Record<string, any>> = {
  [K in keyof T]?: T[K] extends string ? string : string;
};
