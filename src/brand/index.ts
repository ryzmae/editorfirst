/**
 * Create a nominal (branded) type to prevent implicit coercion.
 * @example
 * ```ts
 * type UserId = Brand<number, "UserId">;
 * type ProductId = Brand<number, "ProductId">;
 * // UserId and ProductId are incompatible even though both are numbers
 * ```
 */
export type Brand<T, Name extends string> = T & { readonly __brand: Name };

/**
 * Create an opaque type that hides the underlying type.
 * @example
 * ```ts
 * type Email = Opaque<string, "Email">;
 * // Only explicit casts or branded constructors can create Email values
 * ```
 */
export type Opaque<T, Token extends string> = T & { readonly __opaque: Token };

/**
 * Create a nominal type (alias for Brand).
 * @example
 * ```ts
 * type UserId = Nominal<number, "UserId">;
 * ```
 */
export type Nominal<T, Name extends string> = Brand<T, Name>;

/**
 * Create a branded ID type.
 * @example
 * ```ts
 * type UserId = Id<"user">;
 * type PostId = Id<"post">;
 * ```
 */
export type Id<T extends string = string> = Brand<string, `${T}:id`>;

/**
 * UUID type (branded string).
 * @example
 * ```ts
 * type Uuid = UUID;
 * // Represents a valid UUID string (use constructor for validation)
 * ```
 */
export type UUID = Brand<string, "UUID">;

/**
 * Email type (branded string).
 * @example
 * ```ts
 * type Email = Email;
 * // Represents a valid email string (use constructor for validation)
 * ```
 */
export type Email = Brand<string, "Email">;

/**
 * Non-empty string type.
 * @example
 * ```ts
 * type NonEmpty = NonEmptyString;
 * // Cannot be an empty string
 * ```
 */
export type NonEmptyString = Brand<string, "NonEmptyString">;

/**
 * Positive number type.
 * @example
 * ```ts
 * type Positive = PositiveNumber;
 * // Must be > 0
 * ```
 */
export type PositiveNumber = Brand<number, "PositiveNumber">;

/**
 * Negative number type.
 * @example
 * ```ts
 * type Negative = NegativeNumber;
 * // Must be < 0
 * ```
 */
export type NegativeNumber = Brand<number, "NegativeNumber">;

/**
 * Integer type (no decimal places).
 * @example
 * ```ts
 * type Integer = Int;
 * // Must be a whole number
 * ```
 */
export type Int = Brand<number, "Int">;
