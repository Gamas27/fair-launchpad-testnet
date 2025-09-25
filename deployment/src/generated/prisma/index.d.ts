
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Token
 * 
 */
export type Token = $Result.DefaultSelection<Prisma.$TokenPayload>
/**
 * Model Trade
 * 
 */
export type Trade = $Result.DefaultSelection<Prisma.$TradePayload>
/**
 * Model ReputationQuest
 * 
 */
export type ReputationQuest = $Result.DefaultSelection<Prisma.$ReputationQuestPayload>
/**
 * Model UserReputationQuest
 * 
 */
export type UserReputationQuest = $Result.DefaultSelection<Prisma.$UserReputationQuestPayload>
/**
 * Model Achievement
 * 
 */
export type Achievement = $Result.DefaultSelection<Prisma.$AchievementPayload>
/**
 * Model UserAchievement
 * 
 */
export type UserAchievement = $Result.DefaultSelection<Prisma.$UserAchievementPayload>
/**
 * Model AntiManipulationLog
 * 
 */
export type AntiManipulationLog = $Result.DefaultSelection<Prisma.$AntiManipulationLogPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.token`: Exposes CRUD operations for the **Token** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tokens
    * const tokens = await prisma.token.findMany()
    * ```
    */
  get token(): Prisma.TokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trade`: Exposes CRUD operations for the **Trade** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Trades
    * const trades = await prisma.trade.findMany()
    * ```
    */
  get trade(): Prisma.TradeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reputationQuest`: Exposes CRUD operations for the **ReputationQuest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReputationQuests
    * const reputationQuests = await prisma.reputationQuest.findMany()
    * ```
    */
  get reputationQuest(): Prisma.ReputationQuestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userReputationQuest`: Exposes CRUD operations for the **UserReputationQuest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserReputationQuests
    * const userReputationQuests = await prisma.userReputationQuest.findMany()
    * ```
    */
  get userReputationQuest(): Prisma.UserReputationQuestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.achievement`: Exposes CRUD operations for the **Achievement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Achievements
    * const achievements = await prisma.achievement.findMany()
    * ```
    */
  get achievement(): Prisma.AchievementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userAchievement`: Exposes CRUD operations for the **UserAchievement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserAchievements
    * const userAchievements = await prisma.userAchievement.findMany()
    * ```
    */
  get userAchievement(): Prisma.UserAchievementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.antiManipulationLog`: Exposes CRUD operations for the **AntiManipulationLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AntiManipulationLogs
    * const antiManipulationLogs = await prisma.antiManipulationLog.findMany()
    * ```
    */
  get antiManipulationLog(): Prisma.AntiManipulationLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.2
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Token: 'Token',
    Trade: 'Trade',
    ReputationQuest: 'ReputationQuest',
    UserReputationQuest: 'UserReputationQuest',
    Achievement: 'Achievement',
    UserAchievement: 'UserAchievement',
    AntiManipulationLog: 'AntiManipulationLog',
    Session: 'Session'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "token" | "trade" | "reputationQuest" | "userReputationQuest" | "achievement" | "userAchievement" | "antiManipulationLog" | "session"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Token: {
        payload: Prisma.$TokenPayload<ExtArgs>
        fields: Prisma.TokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          findFirst: {
            args: Prisma.TokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          findMany: {
            args: Prisma.TokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          create: {
            args: Prisma.TokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          createMany: {
            args: Prisma.TokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          delete: {
            args: Prisma.TokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          update: {
            args: Prisma.TokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          deleteMany: {
            args: Prisma.TokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          upsert: {
            args: Prisma.TokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          aggregate: {
            args: Prisma.TokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateToken>
          }
          groupBy: {
            args: Prisma.TokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<TokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.TokenCountArgs<ExtArgs>
            result: $Utils.Optional<TokenCountAggregateOutputType> | number
          }
        }
      }
      Trade: {
        payload: Prisma.$TradePayload<ExtArgs>
        fields: Prisma.TradeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TradeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TradeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          findFirst: {
            args: Prisma.TradeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TradeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          findMany: {
            args: Prisma.TradeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>[]
          }
          create: {
            args: Prisma.TradeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          createMany: {
            args: Prisma.TradeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TradeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>[]
          }
          delete: {
            args: Prisma.TradeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          update: {
            args: Prisma.TradeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          deleteMany: {
            args: Prisma.TradeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TradeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TradeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>[]
          }
          upsert: {
            args: Prisma.TradeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          aggregate: {
            args: Prisma.TradeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrade>
          }
          groupBy: {
            args: Prisma.TradeGroupByArgs<ExtArgs>
            result: $Utils.Optional<TradeGroupByOutputType>[]
          }
          count: {
            args: Prisma.TradeCountArgs<ExtArgs>
            result: $Utils.Optional<TradeCountAggregateOutputType> | number
          }
        }
      }
      ReputationQuest: {
        payload: Prisma.$ReputationQuestPayload<ExtArgs>
        fields: Prisma.ReputationQuestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReputationQuestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReputationQuestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReputationQuestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReputationQuestPayload>
          }
          findFirst: {
            args: Prisma.ReputationQuestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReputationQuestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReputationQuestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReputationQuestPayload>
          }
          findMany: {
            args: Prisma.ReputationQuestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReputationQuestPayload>[]
          }
          create: {
            args: Prisma.ReputationQuestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReputationQuestPayload>
          }
          createMany: {
            args: Prisma.ReputationQuestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReputationQuestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReputationQuestPayload>[]
          }
          delete: {
            args: Prisma.ReputationQuestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReputationQuestPayload>
          }
          update: {
            args: Prisma.ReputationQuestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReputationQuestPayload>
          }
          deleteMany: {
            args: Prisma.ReputationQuestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReputationQuestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReputationQuestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReputationQuestPayload>[]
          }
          upsert: {
            args: Prisma.ReputationQuestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReputationQuestPayload>
          }
          aggregate: {
            args: Prisma.ReputationQuestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReputationQuest>
          }
          groupBy: {
            args: Prisma.ReputationQuestGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReputationQuestGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReputationQuestCountArgs<ExtArgs>
            result: $Utils.Optional<ReputationQuestCountAggregateOutputType> | number
          }
        }
      }
      UserReputationQuest: {
        payload: Prisma.$UserReputationQuestPayload<ExtArgs>
        fields: Prisma.UserReputationQuestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserReputationQuestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserReputationQuestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserReputationQuestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserReputationQuestPayload>
          }
          findFirst: {
            args: Prisma.UserReputationQuestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserReputationQuestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserReputationQuestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserReputationQuestPayload>
          }
          findMany: {
            args: Prisma.UserReputationQuestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserReputationQuestPayload>[]
          }
          create: {
            args: Prisma.UserReputationQuestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserReputationQuestPayload>
          }
          createMany: {
            args: Prisma.UserReputationQuestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserReputationQuestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserReputationQuestPayload>[]
          }
          delete: {
            args: Prisma.UserReputationQuestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserReputationQuestPayload>
          }
          update: {
            args: Prisma.UserReputationQuestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserReputationQuestPayload>
          }
          deleteMany: {
            args: Prisma.UserReputationQuestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserReputationQuestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserReputationQuestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserReputationQuestPayload>[]
          }
          upsert: {
            args: Prisma.UserReputationQuestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserReputationQuestPayload>
          }
          aggregate: {
            args: Prisma.UserReputationQuestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserReputationQuest>
          }
          groupBy: {
            args: Prisma.UserReputationQuestGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserReputationQuestGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserReputationQuestCountArgs<ExtArgs>
            result: $Utils.Optional<UserReputationQuestCountAggregateOutputType> | number
          }
        }
      }
      Achievement: {
        payload: Prisma.$AchievementPayload<ExtArgs>
        fields: Prisma.AchievementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AchievementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AchievementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          findFirst: {
            args: Prisma.AchievementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AchievementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          findMany: {
            args: Prisma.AchievementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>[]
          }
          create: {
            args: Prisma.AchievementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          createMany: {
            args: Prisma.AchievementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AchievementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>[]
          }
          delete: {
            args: Prisma.AchievementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          update: {
            args: Prisma.AchievementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          deleteMany: {
            args: Prisma.AchievementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AchievementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AchievementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>[]
          }
          upsert: {
            args: Prisma.AchievementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          aggregate: {
            args: Prisma.AchievementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAchievement>
          }
          groupBy: {
            args: Prisma.AchievementGroupByArgs<ExtArgs>
            result: $Utils.Optional<AchievementGroupByOutputType>[]
          }
          count: {
            args: Prisma.AchievementCountArgs<ExtArgs>
            result: $Utils.Optional<AchievementCountAggregateOutputType> | number
          }
        }
      }
      UserAchievement: {
        payload: Prisma.$UserAchievementPayload<ExtArgs>
        fields: Prisma.UserAchievementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserAchievementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserAchievementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>
          }
          findFirst: {
            args: Prisma.UserAchievementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserAchievementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>
          }
          findMany: {
            args: Prisma.UserAchievementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>[]
          }
          create: {
            args: Prisma.UserAchievementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>
          }
          createMany: {
            args: Prisma.UserAchievementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserAchievementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>[]
          }
          delete: {
            args: Prisma.UserAchievementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>
          }
          update: {
            args: Prisma.UserAchievementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>
          }
          deleteMany: {
            args: Prisma.UserAchievementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserAchievementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserAchievementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>[]
          }
          upsert: {
            args: Prisma.UserAchievementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>
          }
          aggregate: {
            args: Prisma.UserAchievementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserAchievement>
          }
          groupBy: {
            args: Prisma.UserAchievementGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserAchievementGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserAchievementCountArgs<ExtArgs>
            result: $Utils.Optional<UserAchievementCountAggregateOutputType> | number
          }
        }
      }
      AntiManipulationLog: {
        payload: Prisma.$AntiManipulationLogPayload<ExtArgs>
        fields: Prisma.AntiManipulationLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AntiManipulationLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AntiManipulationLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AntiManipulationLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AntiManipulationLogPayload>
          }
          findFirst: {
            args: Prisma.AntiManipulationLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AntiManipulationLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AntiManipulationLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AntiManipulationLogPayload>
          }
          findMany: {
            args: Prisma.AntiManipulationLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AntiManipulationLogPayload>[]
          }
          create: {
            args: Prisma.AntiManipulationLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AntiManipulationLogPayload>
          }
          createMany: {
            args: Prisma.AntiManipulationLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AntiManipulationLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AntiManipulationLogPayload>[]
          }
          delete: {
            args: Prisma.AntiManipulationLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AntiManipulationLogPayload>
          }
          update: {
            args: Prisma.AntiManipulationLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AntiManipulationLogPayload>
          }
          deleteMany: {
            args: Prisma.AntiManipulationLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AntiManipulationLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AntiManipulationLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AntiManipulationLogPayload>[]
          }
          upsert: {
            args: Prisma.AntiManipulationLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AntiManipulationLogPayload>
          }
          aggregate: {
            args: Prisma.AntiManipulationLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAntiManipulationLog>
          }
          groupBy: {
            args: Prisma.AntiManipulationLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AntiManipulationLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AntiManipulationLogCountArgs<ExtArgs>
            result: $Utils.Optional<AntiManipulationLogCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    token?: TokenOmit
    trade?: TradeOmit
    reputationQuest?: ReputationQuestOmit
    userReputationQuest?: UserReputationQuestOmit
    achievement?: AchievementOmit
    userAchievement?: UserAchievementOmit
    antiManipulationLog?: AntiManipulationLogOmit
    session?: SessionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    trades: number
    createdTokens: number
    reputationQuests: number
    achievements: number
    antiManipulationLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trades?: boolean | UserCountOutputTypeCountTradesArgs
    createdTokens?: boolean | UserCountOutputTypeCountCreatedTokensArgs
    reputationQuests?: boolean | UserCountOutputTypeCountReputationQuestsArgs
    achievements?: boolean | UserCountOutputTypeCountAchievementsArgs
    antiManipulationLogs?: boolean | UserCountOutputTypeCountAntiManipulationLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReputationQuestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserReputationQuestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAchievementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAchievementWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAntiManipulationLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AntiManipulationLogWhereInput
  }


  /**
   * Count Type TokenCountOutputType
   */

  export type TokenCountOutputType = {
    trades: number
  }

  export type TokenCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trades?: boolean | TokenCountOutputTypeCountTradesArgs
  }

  // Custom InputTypes
  /**
   * TokenCountOutputType without action
   */
  export type TokenCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenCountOutputType
     */
    select?: TokenCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TokenCountOutputType without action
   */
  export type TokenCountOutputTypeCountTradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeWhereInput
  }


  /**
   * Count Type ReputationQuestCountOutputType
   */

  export type ReputationQuestCountOutputType = {
    userProgress: number
  }

  export type ReputationQuestCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userProgress?: boolean | ReputationQuestCountOutputTypeCountUserProgressArgs
  }

  // Custom InputTypes
  /**
   * ReputationQuestCountOutputType without action
   */
  export type ReputationQuestCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReputationQuestCountOutputType
     */
    select?: ReputationQuestCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ReputationQuestCountOutputType without action
   */
  export type ReputationQuestCountOutputTypeCountUserProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserReputationQuestWhereInput
  }


  /**
   * Count Type AchievementCountOutputType
   */

  export type AchievementCountOutputType = {
    userAchievements: number
  }

  export type AchievementCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userAchievements?: boolean | AchievementCountOutputTypeCountUserAchievementsArgs
  }

  // Custom InputTypes
  /**
   * AchievementCountOutputType without action
   */
  export type AchievementCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AchievementCountOutputType
     */
    select?: AchievementCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AchievementCountOutputType without action
   */
  export type AchievementCountOutputTypeCountUserAchievementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAchievementWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    reputationScore: number | null
    totalTrades: number | null
    totalVolume: number | null
    riskScore: number | null
    allocationCap: number | null
    usedAllocation: number | null
    marketCap: number | null
  }

  export type UserSumAggregateOutputType = {
    reputationScore: number | null
    totalTrades: number | null
    totalVolume: number | null
    riskScore: number | null
    allocationCap: number | null
    usedAllocation: number | null
    marketCap: number | null
  }

  export type UserMinAggregateOutputType = {
    walletAddress: string | null
    worldIdHash: string | null
    verificationLevel: string | null
    reputationScore: number | null
    reputationLevel: string | null
    totalTrades: number | null
    totalVolume: number | null
    lastActivity: Date | null
    isBanned: boolean | null
    riskScore: number | null
    allocationCap: number | null
    usedAllocation: number | null
    marketCap: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    walletAddress: string | null
    worldIdHash: string | null
    verificationLevel: string | null
    reputationScore: number | null
    reputationLevel: string | null
    totalTrades: number | null
    totalVolume: number | null
    lastActivity: Date | null
    isBanned: boolean | null
    riskScore: number | null
    allocationCap: number | null
    usedAllocation: number | null
    marketCap: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    walletAddress: number
    worldIdHash: number
    verificationLevel: number
    reputationScore: number
    reputationLevel: number
    totalTrades: number
    totalVolume: number
    lastActivity: number
    isBanned: number
    riskScore: number
    allocationCap: number
    usedAllocation: number
    marketCap: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    reputationScore?: true
    totalTrades?: true
    totalVolume?: true
    riskScore?: true
    allocationCap?: true
    usedAllocation?: true
    marketCap?: true
  }

  export type UserSumAggregateInputType = {
    reputationScore?: true
    totalTrades?: true
    totalVolume?: true
    riskScore?: true
    allocationCap?: true
    usedAllocation?: true
    marketCap?: true
  }

  export type UserMinAggregateInputType = {
    walletAddress?: true
    worldIdHash?: true
    verificationLevel?: true
    reputationScore?: true
    reputationLevel?: true
    totalTrades?: true
    totalVolume?: true
    lastActivity?: true
    isBanned?: true
    riskScore?: true
    allocationCap?: true
    usedAllocation?: true
    marketCap?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    walletAddress?: true
    worldIdHash?: true
    verificationLevel?: true
    reputationScore?: true
    reputationLevel?: true
    totalTrades?: true
    totalVolume?: true
    lastActivity?: true
    isBanned?: true
    riskScore?: true
    allocationCap?: true
    usedAllocation?: true
    marketCap?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    walletAddress?: true
    worldIdHash?: true
    verificationLevel?: true
    reputationScore?: true
    reputationLevel?: true
    totalTrades?: true
    totalVolume?: true
    lastActivity?: true
    isBanned?: true
    riskScore?: true
    allocationCap?: true
    usedAllocation?: true
    marketCap?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    walletAddress: string
    worldIdHash: string | null
    verificationLevel: string
    reputationScore: number
    reputationLevel: string
    totalTrades: number
    totalVolume: number
    lastActivity: Date
    isBanned: boolean
    riskScore: number
    allocationCap: number
    usedAllocation: number
    marketCap: number | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    walletAddress?: boolean
    worldIdHash?: boolean
    verificationLevel?: boolean
    reputationScore?: boolean
    reputationLevel?: boolean
    totalTrades?: boolean
    totalVolume?: boolean
    lastActivity?: boolean
    isBanned?: boolean
    riskScore?: boolean
    allocationCap?: boolean
    usedAllocation?: boolean
    marketCap?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trades?: boolean | User$tradesArgs<ExtArgs>
    createdTokens?: boolean | User$createdTokensArgs<ExtArgs>
    reputationQuests?: boolean | User$reputationQuestsArgs<ExtArgs>
    achievements?: boolean | User$achievementsArgs<ExtArgs>
    antiManipulationLogs?: boolean | User$antiManipulationLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    walletAddress?: boolean
    worldIdHash?: boolean
    verificationLevel?: boolean
    reputationScore?: boolean
    reputationLevel?: boolean
    totalTrades?: boolean
    totalVolume?: boolean
    lastActivity?: boolean
    isBanned?: boolean
    riskScore?: boolean
    allocationCap?: boolean
    usedAllocation?: boolean
    marketCap?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    walletAddress?: boolean
    worldIdHash?: boolean
    verificationLevel?: boolean
    reputationScore?: boolean
    reputationLevel?: boolean
    totalTrades?: boolean
    totalVolume?: boolean
    lastActivity?: boolean
    isBanned?: boolean
    riskScore?: boolean
    allocationCap?: boolean
    usedAllocation?: boolean
    marketCap?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    walletAddress?: boolean
    worldIdHash?: boolean
    verificationLevel?: boolean
    reputationScore?: boolean
    reputationLevel?: boolean
    totalTrades?: boolean
    totalVolume?: boolean
    lastActivity?: boolean
    isBanned?: boolean
    riskScore?: boolean
    allocationCap?: boolean
    usedAllocation?: boolean
    marketCap?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"walletAddress" | "worldIdHash" | "verificationLevel" | "reputationScore" | "reputationLevel" | "totalTrades" | "totalVolume" | "lastActivity" | "isBanned" | "riskScore" | "allocationCap" | "usedAllocation" | "marketCap" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trades?: boolean | User$tradesArgs<ExtArgs>
    createdTokens?: boolean | User$createdTokensArgs<ExtArgs>
    reputationQuests?: boolean | User$reputationQuestsArgs<ExtArgs>
    achievements?: boolean | User$achievementsArgs<ExtArgs>
    antiManipulationLogs?: boolean | User$antiManipulationLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      trades: Prisma.$TradePayload<ExtArgs>[]
      createdTokens: Prisma.$TokenPayload<ExtArgs>[]
      reputationQuests: Prisma.$UserReputationQuestPayload<ExtArgs>[]
      achievements: Prisma.$UserAchievementPayload<ExtArgs>[]
      antiManipulationLogs: Prisma.$AntiManipulationLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      walletAddress: string
      worldIdHash: string | null
      verificationLevel: string
      reputationScore: number
      reputationLevel: string
      totalTrades: number
      totalVolume: number
      lastActivity: Date
      isBanned: boolean
      riskScore: number
      allocationCap: number
      usedAllocation: number
      marketCap: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `walletAddress`
     * const userWithWalletAddressOnly = await prisma.user.findMany({ select: { walletAddress: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `walletAddress`
     * const userWithWalletAddressOnly = await prisma.user.createManyAndReturn({
     *   select: { walletAddress: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `walletAddress`
     * const userWithWalletAddressOnly = await prisma.user.updateManyAndReturn({
     *   select: { walletAddress: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trades<T extends User$tradesArgs<ExtArgs> = {}>(args?: Subset<T, User$tradesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdTokens<T extends User$createdTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$createdTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reputationQuests<T extends User$reputationQuestsArgs<ExtArgs> = {}>(args?: Subset<T, User$reputationQuestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserReputationQuestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    achievements<T extends User$achievementsArgs<ExtArgs> = {}>(args?: Subset<T, User$achievementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    antiManipulationLogs<T extends User$antiManipulationLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$antiManipulationLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AntiManipulationLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly walletAddress: FieldRef<"User", 'String'>
    readonly worldIdHash: FieldRef<"User", 'String'>
    readonly verificationLevel: FieldRef<"User", 'String'>
    readonly reputationScore: FieldRef<"User", 'Int'>
    readonly reputationLevel: FieldRef<"User", 'String'>
    readonly totalTrades: FieldRef<"User", 'Int'>
    readonly totalVolume: FieldRef<"User", 'Float'>
    readonly lastActivity: FieldRef<"User", 'DateTime'>
    readonly isBanned: FieldRef<"User", 'Boolean'>
    readonly riskScore: FieldRef<"User", 'Float'>
    readonly allocationCap: FieldRef<"User", 'Float'>
    readonly usedAllocation: FieldRef<"User", 'Float'>
    readonly marketCap: FieldRef<"User", 'Float'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.trades
   */
  export type User$tradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    where?: TradeWhereInput
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    cursor?: TradeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * User.createdTokens
   */
  export type User$createdTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    where?: TokenWhereInput
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    cursor?: TokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * User.reputationQuests
   */
  export type User$reputationQuestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserReputationQuest
     */
    select?: UserReputationQuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserReputationQuest
     */
    omit?: UserReputationQuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserReputationQuestInclude<ExtArgs> | null
    where?: UserReputationQuestWhereInput
    orderBy?: UserReputationQuestOrderByWithRelationInput | UserReputationQuestOrderByWithRelationInput[]
    cursor?: UserReputationQuestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserReputationQuestScalarFieldEnum | UserReputationQuestScalarFieldEnum[]
  }

  /**
   * User.achievements
   */
  export type User$achievementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    where?: UserAchievementWhereInput
    orderBy?: UserAchievementOrderByWithRelationInput | UserAchievementOrderByWithRelationInput[]
    cursor?: UserAchievementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserAchievementScalarFieldEnum | UserAchievementScalarFieldEnum[]
  }

  /**
   * User.antiManipulationLogs
   */
  export type User$antiManipulationLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AntiManipulationLog
     */
    select?: AntiManipulationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AntiManipulationLog
     */
    omit?: AntiManipulationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AntiManipulationLogInclude<ExtArgs> | null
    where?: AntiManipulationLogWhereInput
    orderBy?: AntiManipulationLogOrderByWithRelationInput | AntiManipulationLogOrderByWithRelationInput[]
    cursor?: AntiManipulationLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AntiManipulationLogScalarFieldEnum | AntiManipulationLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Token
   */

  export type AggregateToken = {
    _count: TokenCountAggregateOutputType | null
    _avg: TokenAvgAggregateOutputType | null
    _sum: TokenSumAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
  }

  export type TokenAvgAggregateOutputType = {
    initialPrice: number | null
    priceIncrement: number | null
    maxSupply: number | null
    currentSupply: number | null
    currentPrice: number | null
    totalVolume: number | null
    totalTrades: number | null
    marketCap: number | null
  }

  export type TokenSumAggregateOutputType = {
    initialPrice: number | null
    priceIncrement: number | null
    maxSupply: bigint | null
    currentSupply: bigint | null
    currentPrice: number | null
    totalVolume: number | null
    totalTrades: number | null
    marketCap: number | null
  }

  export type TokenMinAggregateOutputType = {
    address: string | null
    name: string | null
    symbol: string | null
    description: string | null
    imageUrl: string | null
    creatorAddress: string | null
    initialPrice: number | null
    priceIncrement: number | null
    maxSupply: bigint | null
    currentSupply: bigint | null
    currentPrice: number | null
    totalVolume: number | null
    totalTrades: number | null
    marketCap: number | null
    status: string | null
    launchDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TokenMaxAggregateOutputType = {
    address: string | null
    name: string | null
    symbol: string | null
    description: string | null
    imageUrl: string | null
    creatorAddress: string | null
    initialPrice: number | null
    priceIncrement: number | null
    maxSupply: bigint | null
    currentSupply: bigint | null
    currentPrice: number | null
    totalVolume: number | null
    totalTrades: number | null
    marketCap: number | null
    status: string | null
    launchDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TokenCountAggregateOutputType = {
    address: number
    name: number
    symbol: number
    description: number
    imageUrl: number
    creatorAddress: number
    initialPrice: number
    priceIncrement: number
    maxSupply: number
    currentSupply: number
    currentPrice: number
    totalVolume: number
    totalTrades: number
    marketCap: number
    status: number
    launchDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TokenAvgAggregateInputType = {
    initialPrice?: true
    priceIncrement?: true
    maxSupply?: true
    currentSupply?: true
    currentPrice?: true
    totalVolume?: true
    totalTrades?: true
    marketCap?: true
  }

  export type TokenSumAggregateInputType = {
    initialPrice?: true
    priceIncrement?: true
    maxSupply?: true
    currentSupply?: true
    currentPrice?: true
    totalVolume?: true
    totalTrades?: true
    marketCap?: true
  }

  export type TokenMinAggregateInputType = {
    address?: true
    name?: true
    symbol?: true
    description?: true
    imageUrl?: true
    creatorAddress?: true
    initialPrice?: true
    priceIncrement?: true
    maxSupply?: true
    currentSupply?: true
    currentPrice?: true
    totalVolume?: true
    totalTrades?: true
    marketCap?: true
    status?: true
    launchDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TokenMaxAggregateInputType = {
    address?: true
    name?: true
    symbol?: true
    description?: true
    imageUrl?: true
    creatorAddress?: true
    initialPrice?: true
    priceIncrement?: true
    maxSupply?: true
    currentSupply?: true
    currentPrice?: true
    totalVolume?: true
    totalTrades?: true
    marketCap?: true
    status?: true
    launchDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TokenCountAggregateInputType = {
    address?: true
    name?: true
    symbol?: true
    description?: true
    imageUrl?: true
    creatorAddress?: true
    initialPrice?: true
    priceIncrement?: true
    maxSupply?: true
    currentSupply?: true
    currentPrice?: true
    totalVolume?: true
    totalTrades?: true
    marketCap?: true
    status?: true
    launchDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Token to aggregate.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tokens
    **/
    _count?: true | TokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TokenMaxAggregateInputType
  }

  export type GetTokenAggregateType<T extends TokenAggregateArgs> = {
        [P in keyof T & keyof AggregateToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateToken[P]>
      : GetScalarType<T[P], AggregateToken[P]>
  }




  export type TokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenWhereInput
    orderBy?: TokenOrderByWithAggregationInput | TokenOrderByWithAggregationInput[]
    by: TokenScalarFieldEnum[] | TokenScalarFieldEnum
    having?: TokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TokenCountAggregateInputType | true
    _avg?: TokenAvgAggregateInputType
    _sum?: TokenSumAggregateInputType
    _min?: TokenMinAggregateInputType
    _max?: TokenMaxAggregateInputType
  }

  export type TokenGroupByOutputType = {
    address: string
    name: string
    symbol: string
    description: string
    imageUrl: string | null
    creatorAddress: string
    initialPrice: number
    priceIncrement: number
    maxSupply: bigint
    currentSupply: bigint
    currentPrice: number
    totalVolume: number
    totalTrades: number
    marketCap: number
    status: string
    launchDate: Date
    createdAt: Date
    updatedAt: Date
    _count: TokenCountAggregateOutputType | null
    _avg: TokenAvgAggregateOutputType | null
    _sum: TokenSumAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
  }

  type GetTokenGroupByPayload<T extends TokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TokenGroupByOutputType[P]>
            : GetScalarType<T[P], TokenGroupByOutputType[P]>
        }
      >
    >


  export type TokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    address?: boolean
    name?: boolean
    symbol?: boolean
    description?: boolean
    imageUrl?: boolean
    creatorAddress?: boolean
    initialPrice?: boolean
    priceIncrement?: boolean
    maxSupply?: boolean
    currentSupply?: boolean
    currentPrice?: boolean
    totalVolume?: boolean
    totalTrades?: boolean
    marketCap?: boolean
    status?: boolean
    launchDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
    trades?: boolean | Token$tradesArgs<ExtArgs>
    _count?: boolean | TokenCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["token"]>

  export type TokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    address?: boolean
    name?: boolean
    symbol?: boolean
    description?: boolean
    imageUrl?: boolean
    creatorAddress?: boolean
    initialPrice?: boolean
    priceIncrement?: boolean
    maxSupply?: boolean
    currentSupply?: boolean
    currentPrice?: boolean
    totalVolume?: boolean
    totalTrades?: boolean
    marketCap?: boolean
    status?: boolean
    launchDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["token"]>

  export type TokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    address?: boolean
    name?: boolean
    symbol?: boolean
    description?: boolean
    imageUrl?: boolean
    creatorAddress?: boolean
    initialPrice?: boolean
    priceIncrement?: boolean
    maxSupply?: boolean
    currentSupply?: boolean
    currentPrice?: boolean
    totalVolume?: boolean
    totalTrades?: boolean
    marketCap?: boolean
    status?: boolean
    launchDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["token"]>

  export type TokenSelectScalar = {
    address?: boolean
    name?: boolean
    symbol?: boolean
    description?: boolean
    imageUrl?: boolean
    creatorAddress?: boolean
    initialPrice?: boolean
    priceIncrement?: boolean
    maxSupply?: boolean
    currentSupply?: boolean
    currentPrice?: boolean
    totalVolume?: boolean
    totalTrades?: boolean
    marketCap?: boolean
    status?: boolean
    launchDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"address" | "name" | "symbol" | "description" | "imageUrl" | "creatorAddress" | "initialPrice" | "priceIncrement" | "maxSupply" | "currentSupply" | "currentPrice" | "totalVolume" | "totalTrades" | "marketCap" | "status" | "launchDate" | "createdAt" | "updatedAt", ExtArgs["result"]["token"]>
  export type TokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
    trades?: boolean | Token$tradesArgs<ExtArgs>
    _count?: boolean | TokenCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Token"
    objects: {
      creator: Prisma.$UserPayload<ExtArgs>
      trades: Prisma.$TradePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      address: string
      name: string
      symbol: string
      description: string
      imageUrl: string | null
      creatorAddress: string
      initialPrice: number
      priceIncrement: number
      maxSupply: bigint
      currentSupply: bigint
      currentPrice: number
      totalVolume: number
      totalTrades: number
      marketCap: number
      status: string
      launchDate: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["token"]>
    composites: {}
  }

  type TokenGetPayload<S extends boolean | null | undefined | TokenDefaultArgs> = $Result.GetResult<Prisma.$TokenPayload, S>

  type TokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TokenCountAggregateInputType | true
    }

  export interface TokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Token'], meta: { name: 'Token' } }
    /**
     * Find zero or one Token that matches the filter.
     * @param {TokenFindUniqueArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TokenFindUniqueArgs>(args: SelectSubset<T, TokenFindUniqueArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Token that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TokenFindUniqueOrThrowArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TokenFindUniqueOrThrowArgs>(args: SelectSubset<T, TokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Token that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindFirstArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TokenFindFirstArgs>(args?: SelectSubset<T, TokenFindFirstArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Token that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindFirstOrThrowArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TokenFindFirstOrThrowArgs>(args?: SelectSubset<T, TokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tokens
     * const tokens = await prisma.token.findMany()
     * 
     * // Get first 10 Tokens
     * const tokens = await prisma.token.findMany({ take: 10 })
     * 
     * // Only select the `address`
     * const tokenWithAddressOnly = await prisma.token.findMany({ select: { address: true } })
     * 
     */
    findMany<T extends TokenFindManyArgs>(args?: SelectSubset<T, TokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Token.
     * @param {TokenCreateArgs} args - Arguments to create a Token.
     * @example
     * // Create one Token
     * const Token = await prisma.token.create({
     *   data: {
     *     // ... data to create a Token
     *   }
     * })
     * 
     */
    create<T extends TokenCreateArgs>(args: SelectSubset<T, TokenCreateArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tokens.
     * @param {TokenCreateManyArgs} args - Arguments to create many Tokens.
     * @example
     * // Create many Tokens
     * const token = await prisma.token.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TokenCreateManyArgs>(args?: SelectSubset<T, TokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tokens and returns the data saved in the database.
     * @param {TokenCreateManyAndReturnArgs} args - Arguments to create many Tokens.
     * @example
     * // Create many Tokens
     * const token = await prisma.token.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tokens and only return the `address`
     * const tokenWithAddressOnly = await prisma.token.createManyAndReturn({
     *   select: { address: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TokenCreateManyAndReturnArgs>(args?: SelectSubset<T, TokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Token.
     * @param {TokenDeleteArgs} args - Arguments to delete one Token.
     * @example
     * // Delete one Token
     * const Token = await prisma.token.delete({
     *   where: {
     *     // ... filter to delete one Token
     *   }
     * })
     * 
     */
    delete<T extends TokenDeleteArgs>(args: SelectSubset<T, TokenDeleteArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Token.
     * @param {TokenUpdateArgs} args - Arguments to update one Token.
     * @example
     * // Update one Token
     * const token = await prisma.token.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TokenUpdateArgs>(args: SelectSubset<T, TokenUpdateArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tokens.
     * @param {TokenDeleteManyArgs} args - Arguments to filter Tokens to delete.
     * @example
     * // Delete a few Tokens
     * const { count } = await prisma.token.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TokenDeleteManyArgs>(args?: SelectSubset<T, TokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tokens
     * const token = await prisma.token.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TokenUpdateManyArgs>(args: SelectSubset<T, TokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tokens and returns the data updated in the database.
     * @param {TokenUpdateManyAndReturnArgs} args - Arguments to update many Tokens.
     * @example
     * // Update many Tokens
     * const token = await prisma.token.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tokens and only return the `address`
     * const tokenWithAddressOnly = await prisma.token.updateManyAndReturn({
     *   select: { address: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TokenUpdateManyAndReturnArgs>(args: SelectSubset<T, TokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Token.
     * @param {TokenUpsertArgs} args - Arguments to update or create a Token.
     * @example
     * // Update or create a Token
     * const token = await prisma.token.upsert({
     *   create: {
     *     // ... data to create a Token
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Token we want to update
     *   }
     * })
     */
    upsert<T extends TokenUpsertArgs>(args: SelectSubset<T, TokenUpsertArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenCountArgs} args - Arguments to filter Tokens to count.
     * @example
     * // Count the number of Tokens
     * const count = await prisma.token.count({
     *   where: {
     *     // ... the filter for the Tokens we want to count
     *   }
     * })
    **/
    count<T extends TokenCountArgs>(
      args?: Subset<T, TokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TokenAggregateArgs>(args: Subset<T, TokenAggregateArgs>): Prisma.PrismaPromise<GetTokenAggregateType<T>>

    /**
     * Group by Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TokenGroupByArgs['orderBy'] }
        : { orderBy?: TokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Token model
   */
  readonly fields: TokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Token.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    trades<T extends Token$tradesArgs<ExtArgs> = {}>(args?: Subset<T, Token$tradesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Token model
   */
  interface TokenFieldRefs {
    readonly address: FieldRef<"Token", 'String'>
    readonly name: FieldRef<"Token", 'String'>
    readonly symbol: FieldRef<"Token", 'String'>
    readonly description: FieldRef<"Token", 'String'>
    readonly imageUrl: FieldRef<"Token", 'String'>
    readonly creatorAddress: FieldRef<"Token", 'String'>
    readonly initialPrice: FieldRef<"Token", 'Float'>
    readonly priceIncrement: FieldRef<"Token", 'Float'>
    readonly maxSupply: FieldRef<"Token", 'BigInt'>
    readonly currentSupply: FieldRef<"Token", 'BigInt'>
    readonly currentPrice: FieldRef<"Token", 'Float'>
    readonly totalVolume: FieldRef<"Token", 'Float'>
    readonly totalTrades: FieldRef<"Token", 'Int'>
    readonly marketCap: FieldRef<"Token", 'Float'>
    readonly status: FieldRef<"Token", 'String'>
    readonly launchDate: FieldRef<"Token", 'DateTime'>
    readonly createdAt: FieldRef<"Token", 'DateTime'>
    readonly updatedAt: FieldRef<"Token", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Token findUnique
   */
  export type TokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token findUniqueOrThrow
   */
  export type TokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token findFirst
   */
  export type TokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     */
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token findFirstOrThrow
   */
  export type TokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     */
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token findMany
   */
  export type TokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Tokens to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token create
   */
  export type TokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * The data needed to create a Token.
     */
    data: XOR<TokenCreateInput, TokenUncheckedCreateInput>
  }

  /**
   * Token createMany
   */
  export type TokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tokens.
     */
    data: TokenCreateManyInput | TokenCreateManyInput[]
  }

  /**
   * Token createManyAndReturn
   */
  export type TokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * The data used to create many Tokens.
     */
    data: TokenCreateManyInput | TokenCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Token update
   */
  export type TokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * The data needed to update a Token.
     */
    data: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
    /**
     * Choose, which Token to update.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token updateMany
   */
  export type TokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tokens.
     */
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyInput>
    /**
     * Filter which Tokens to update
     */
    where?: TokenWhereInput
    /**
     * Limit how many Tokens to update.
     */
    limit?: number
  }

  /**
   * Token updateManyAndReturn
   */
  export type TokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * The data used to update Tokens.
     */
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyInput>
    /**
     * Filter which Tokens to update
     */
    where?: TokenWhereInput
    /**
     * Limit how many Tokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Token upsert
   */
  export type TokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * The filter to search for the Token to update in case it exists.
     */
    where: TokenWhereUniqueInput
    /**
     * In case the Token found by the `where` argument doesn't exist, create a new Token with this data.
     */
    create: XOR<TokenCreateInput, TokenUncheckedCreateInput>
    /**
     * In case the Token was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
  }

  /**
   * Token delete
   */
  export type TokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter which Token to delete.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token deleteMany
   */
  export type TokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tokens to delete
     */
    where?: TokenWhereInput
    /**
     * Limit how many Tokens to delete.
     */
    limit?: number
  }

  /**
   * Token.trades
   */
  export type Token$tradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    where?: TradeWhereInput
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    cursor?: TradeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Token without action
   */
  export type TokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
  }


  /**
   * Model Trade
   */

  export type AggregateTrade = {
    _count: TradeCountAggregateOutputType | null
    _avg: TradeAvgAggregateOutputType | null
    _sum: TradeSumAggregateOutputType | null
    _min: TradeMinAggregateOutputType | null
    _max: TradeMaxAggregateOutputType | null
  }

  export type TradeAvgAggregateOutputType = {
    amount: number | null
    price: number | null
    totalValue: number | null
    blockNumber: number | null
    riskScore: number | null
  }

  export type TradeSumAggregateOutputType = {
    amount: number | null
    price: number | null
    totalValue: number | null
    blockNumber: bigint | null
    riskScore: number | null
  }

  export type TradeMinAggregateOutputType = {
    id: string | null
    userAddress: string | null
    tokenAddress: string | null
    type: string | null
    amount: number | null
    price: number | null
    totalValue: number | null
    blockNumber: bigint | null
    transactionHash: string | null
    riskScore: number | null
    isSuspicious: boolean | null
    manipulationFlags: string | null
    createdAt: Date | null
  }

  export type TradeMaxAggregateOutputType = {
    id: string | null
    userAddress: string | null
    tokenAddress: string | null
    type: string | null
    amount: number | null
    price: number | null
    totalValue: number | null
    blockNumber: bigint | null
    transactionHash: string | null
    riskScore: number | null
    isSuspicious: boolean | null
    manipulationFlags: string | null
    createdAt: Date | null
  }

  export type TradeCountAggregateOutputType = {
    id: number
    userAddress: number
    tokenAddress: number
    type: number
    amount: number
    price: number
    totalValue: number
    blockNumber: number
    transactionHash: number
    riskScore: number
    isSuspicious: number
    manipulationFlags: number
    createdAt: number
    _all: number
  }


  export type TradeAvgAggregateInputType = {
    amount?: true
    price?: true
    totalValue?: true
    blockNumber?: true
    riskScore?: true
  }

  export type TradeSumAggregateInputType = {
    amount?: true
    price?: true
    totalValue?: true
    blockNumber?: true
    riskScore?: true
  }

  export type TradeMinAggregateInputType = {
    id?: true
    userAddress?: true
    tokenAddress?: true
    type?: true
    amount?: true
    price?: true
    totalValue?: true
    blockNumber?: true
    transactionHash?: true
    riskScore?: true
    isSuspicious?: true
    manipulationFlags?: true
    createdAt?: true
  }

  export type TradeMaxAggregateInputType = {
    id?: true
    userAddress?: true
    tokenAddress?: true
    type?: true
    amount?: true
    price?: true
    totalValue?: true
    blockNumber?: true
    transactionHash?: true
    riskScore?: true
    isSuspicious?: true
    manipulationFlags?: true
    createdAt?: true
  }

  export type TradeCountAggregateInputType = {
    id?: true
    userAddress?: true
    tokenAddress?: true
    type?: true
    amount?: true
    price?: true
    totalValue?: true
    blockNumber?: true
    transactionHash?: true
    riskScore?: true
    isSuspicious?: true
    manipulationFlags?: true
    createdAt?: true
    _all?: true
  }

  export type TradeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trade to aggregate.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Trades
    **/
    _count?: true | TradeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TradeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TradeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TradeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TradeMaxAggregateInputType
  }

  export type GetTradeAggregateType<T extends TradeAggregateArgs> = {
        [P in keyof T & keyof AggregateTrade]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrade[P]>
      : GetScalarType<T[P], AggregateTrade[P]>
  }




  export type TradeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeWhereInput
    orderBy?: TradeOrderByWithAggregationInput | TradeOrderByWithAggregationInput[]
    by: TradeScalarFieldEnum[] | TradeScalarFieldEnum
    having?: TradeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TradeCountAggregateInputType | true
    _avg?: TradeAvgAggregateInputType
    _sum?: TradeSumAggregateInputType
    _min?: TradeMinAggregateInputType
    _max?: TradeMaxAggregateInputType
  }

  export type TradeGroupByOutputType = {
    id: string
    userAddress: string
    tokenAddress: string
    type: string
    amount: number
    price: number
    totalValue: number
    blockNumber: bigint | null
    transactionHash: string | null
    riskScore: number
    isSuspicious: boolean
    manipulationFlags: string | null
    createdAt: Date
    _count: TradeCountAggregateOutputType | null
    _avg: TradeAvgAggregateOutputType | null
    _sum: TradeSumAggregateOutputType | null
    _min: TradeMinAggregateOutputType | null
    _max: TradeMaxAggregateOutputType | null
  }

  type GetTradeGroupByPayload<T extends TradeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TradeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TradeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TradeGroupByOutputType[P]>
            : GetScalarType<T[P], TradeGroupByOutputType[P]>
        }
      >
    >


  export type TradeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userAddress?: boolean
    tokenAddress?: boolean
    type?: boolean
    amount?: boolean
    price?: boolean
    totalValue?: boolean
    blockNumber?: boolean
    transactionHash?: boolean
    riskScore?: boolean
    isSuspicious?: boolean
    manipulationFlags?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    token?: boolean | TokenDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trade"]>

  export type TradeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userAddress?: boolean
    tokenAddress?: boolean
    type?: boolean
    amount?: boolean
    price?: boolean
    totalValue?: boolean
    blockNumber?: boolean
    transactionHash?: boolean
    riskScore?: boolean
    isSuspicious?: boolean
    manipulationFlags?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    token?: boolean | TokenDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trade"]>

  export type TradeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userAddress?: boolean
    tokenAddress?: boolean
    type?: boolean
    amount?: boolean
    price?: boolean
    totalValue?: boolean
    blockNumber?: boolean
    transactionHash?: boolean
    riskScore?: boolean
    isSuspicious?: boolean
    manipulationFlags?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    token?: boolean | TokenDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trade"]>

  export type TradeSelectScalar = {
    id?: boolean
    userAddress?: boolean
    tokenAddress?: boolean
    type?: boolean
    amount?: boolean
    price?: boolean
    totalValue?: boolean
    blockNumber?: boolean
    transactionHash?: boolean
    riskScore?: boolean
    isSuspicious?: boolean
    manipulationFlags?: boolean
    createdAt?: boolean
  }

  export type TradeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userAddress" | "tokenAddress" | "type" | "amount" | "price" | "totalValue" | "blockNumber" | "transactionHash" | "riskScore" | "isSuspicious" | "manipulationFlags" | "createdAt", ExtArgs["result"]["trade"]>
  export type TradeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    token?: boolean | TokenDefaultArgs<ExtArgs>
  }
  export type TradeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    token?: boolean | TokenDefaultArgs<ExtArgs>
  }
  export type TradeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    token?: boolean | TokenDefaultArgs<ExtArgs>
  }

  export type $TradePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Trade"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      token: Prisma.$TokenPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userAddress: string
      tokenAddress: string
      type: string
      amount: number
      price: number
      totalValue: number
      blockNumber: bigint | null
      transactionHash: string | null
      riskScore: number
      isSuspicious: boolean
      manipulationFlags: string | null
      createdAt: Date
    }, ExtArgs["result"]["trade"]>
    composites: {}
  }

  type TradeGetPayload<S extends boolean | null | undefined | TradeDefaultArgs> = $Result.GetResult<Prisma.$TradePayload, S>

  type TradeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TradeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TradeCountAggregateInputType | true
    }

  export interface TradeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Trade'], meta: { name: 'Trade' } }
    /**
     * Find zero or one Trade that matches the filter.
     * @param {TradeFindUniqueArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TradeFindUniqueArgs>(args: SelectSubset<T, TradeFindUniqueArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Trade that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TradeFindUniqueOrThrowArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TradeFindUniqueOrThrowArgs>(args: SelectSubset<T, TradeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trade that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFindFirstArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TradeFindFirstArgs>(args?: SelectSubset<T, TradeFindFirstArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trade that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFindFirstOrThrowArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TradeFindFirstOrThrowArgs>(args?: SelectSubset<T, TradeFindFirstOrThrowArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Trades that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Trades
     * const trades = await prisma.trade.findMany()
     * 
     * // Get first 10 Trades
     * const trades = await prisma.trade.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tradeWithIdOnly = await prisma.trade.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TradeFindManyArgs>(args?: SelectSubset<T, TradeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Trade.
     * @param {TradeCreateArgs} args - Arguments to create a Trade.
     * @example
     * // Create one Trade
     * const Trade = await prisma.trade.create({
     *   data: {
     *     // ... data to create a Trade
     *   }
     * })
     * 
     */
    create<T extends TradeCreateArgs>(args: SelectSubset<T, TradeCreateArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Trades.
     * @param {TradeCreateManyArgs} args - Arguments to create many Trades.
     * @example
     * // Create many Trades
     * const trade = await prisma.trade.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TradeCreateManyArgs>(args?: SelectSubset<T, TradeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Trades and returns the data saved in the database.
     * @param {TradeCreateManyAndReturnArgs} args - Arguments to create many Trades.
     * @example
     * // Create many Trades
     * const trade = await prisma.trade.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Trades and only return the `id`
     * const tradeWithIdOnly = await prisma.trade.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TradeCreateManyAndReturnArgs>(args?: SelectSubset<T, TradeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Trade.
     * @param {TradeDeleteArgs} args - Arguments to delete one Trade.
     * @example
     * // Delete one Trade
     * const Trade = await prisma.trade.delete({
     *   where: {
     *     // ... filter to delete one Trade
     *   }
     * })
     * 
     */
    delete<T extends TradeDeleteArgs>(args: SelectSubset<T, TradeDeleteArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Trade.
     * @param {TradeUpdateArgs} args - Arguments to update one Trade.
     * @example
     * // Update one Trade
     * const trade = await prisma.trade.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TradeUpdateArgs>(args: SelectSubset<T, TradeUpdateArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Trades.
     * @param {TradeDeleteManyArgs} args - Arguments to filter Trades to delete.
     * @example
     * // Delete a few Trades
     * const { count } = await prisma.trade.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TradeDeleteManyArgs>(args?: SelectSubset<T, TradeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Trades
     * const trade = await prisma.trade.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TradeUpdateManyArgs>(args: SelectSubset<T, TradeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trades and returns the data updated in the database.
     * @param {TradeUpdateManyAndReturnArgs} args - Arguments to update many Trades.
     * @example
     * // Update many Trades
     * const trade = await prisma.trade.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Trades and only return the `id`
     * const tradeWithIdOnly = await prisma.trade.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TradeUpdateManyAndReturnArgs>(args: SelectSubset<T, TradeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Trade.
     * @param {TradeUpsertArgs} args - Arguments to update or create a Trade.
     * @example
     * // Update or create a Trade
     * const trade = await prisma.trade.upsert({
     *   create: {
     *     // ... data to create a Trade
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Trade we want to update
     *   }
     * })
     */
    upsert<T extends TradeUpsertArgs>(args: SelectSubset<T, TradeUpsertArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Trades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeCountArgs} args - Arguments to filter Trades to count.
     * @example
     * // Count the number of Trades
     * const count = await prisma.trade.count({
     *   where: {
     *     // ... the filter for the Trades we want to count
     *   }
     * })
    **/
    count<T extends TradeCountArgs>(
      args?: Subset<T, TradeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TradeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Trade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TradeAggregateArgs>(args: Subset<T, TradeAggregateArgs>): Prisma.PrismaPromise<GetTradeAggregateType<T>>

    /**
     * Group by Trade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TradeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TradeGroupByArgs['orderBy'] }
        : { orderBy?: TradeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TradeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTradeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Trade model
   */
  readonly fields: TradeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Trade.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TradeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    token<T extends TokenDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TokenDefaultArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Trade model
   */
  interface TradeFieldRefs {
    readonly id: FieldRef<"Trade", 'String'>
    readonly userAddress: FieldRef<"Trade", 'String'>
    readonly tokenAddress: FieldRef<"Trade", 'String'>
    readonly type: FieldRef<"Trade", 'String'>
    readonly amount: FieldRef<"Trade", 'Float'>
    readonly price: FieldRef<"Trade", 'Float'>
    readonly totalValue: FieldRef<"Trade", 'Float'>
    readonly blockNumber: FieldRef<"Trade", 'BigInt'>
    readonly transactionHash: FieldRef<"Trade", 'String'>
    readonly riskScore: FieldRef<"Trade", 'Float'>
    readonly isSuspicious: FieldRef<"Trade", 'Boolean'>
    readonly manipulationFlags: FieldRef<"Trade", 'String'>
    readonly createdAt: FieldRef<"Trade", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Trade findUnique
   */
  export type TradeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade findUniqueOrThrow
   */
  export type TradeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade findFirst
   */
  export type TradeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trades.
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trades.
     */
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Trade findFirstOrThrow
   */
  export type TradeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trades.
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trades.
     */
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Trade findMany
   */
  export type TradeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trades to fetch.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Trades.
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Trade create
   */
  export type TradeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * The data needed to create a Trade.
     */
    data: XOR<TradeCreateInput, TradeUncheckedCreateInput>
  }

  /**
   * Trade createMany
   */
  export type TradeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Trades.
     */
    data: TradeCreateManyInput | TradeCreateManyInput[]
  }

  /**
   * Trade createManyAndReturn
   */
  export type TradeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * The data used to create many Trades.
     */
    data: TradeCreateManyInput | TradeCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Trade update
   */
  export type TradeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * The data needed to update a Trade.
     */
    data: XOR<TradeUpdateInput, TradeUncheckedUpdateInput>
    /**
     * Choose, which Trade to update.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade updateMany
   */
  export type TradeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Trades.
     */
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyInput>
    /**
     * Filter which Trades to update
     */
    where?: TradeWhereInput
    /**
     * Limit how many Trades to update.
     */
    limit?: number
  }

  /**
   * Trade updateManyAndReturn
   */
  export type TradeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * The data used to update Trades.
     */
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyInput>
    /**
     * Filter which Trades to update
     */
    where?: TradeWhereInput
    /**
     * Limit how many Trades to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Trade upsert
   */
  export type TradeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * The filter to search for the Trade to update in case it exists.
     */
    where: TradeWhereUniqueInput
    /**
     * In case the Trade found by the `where` argument doesn't exist, create a new Trade with this data.
     */
    create: XOR<TradeCreateInput, TradeUncheckedCreateInput>
    /**
     * In case the Trade was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TradeUpdateInput, TradeUncheckedUpdateInput>
  }

  /**
   * Trade delete
   */
  export type TradeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter which Trade to delete.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade deleteMany
   */
  export type TradeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trades to delete
     */
    where?: TradeWhereInput
    /**
     * Limit how many Trades to delete.
     */
    limit?: number
  }

  /**
   * Trade without action
   */
  export type TradeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
  }


  /**
   * Model ReputationQuest
   */

  export type AggregateReputationQuest = {
    _count: ReputationQuestCountAggregateOutputType | null
    _avg: ReputationQuestAvgAggregateOutputType | null
    _sum: ReputationQuestSumAggregateOutputType | null
    _min: ReputationQuestMinAggregateOutputType | null
    _max: ReputationQuestMaxAggregateOutputType | null
  }

  export type ReputationQuestAvgAggregateOutputType = {
    targetValue: number | null
    reward: number | null
  }

  export type ReputationQuestSumAggregateOutputType = {
    targetValue: number | null
    reward: number | null
  }

  export type ReputationQuestMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    type: string | null
    targetValue: number | null
    reward: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReputationQuestMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    type: string | null
    targetValue: number | null
    reward: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReputationQuestCountAggregateOutputType = {
    id: number
    title: number
    description: number
    type: number
    targetValue: number
    reward: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ReputationQuestAvgAggregateInputType = {
    targetValue?: true
    reward?: true
  }

  export type ReputationQuestSumAggregateInputType = {
    targetValue?: true
    reward?: true
  }

  export type ReputationQuestMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    type?: true
    targetValue?: true
    reward?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReputationQuestMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    type?: true
    targetValue?: true
    reward?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReputationQuestCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    type?: true
    targetValue?: true
    reward?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReputationQuestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReputationQuest to aggregate.
     */
    where?: ReputationQuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReputationQuests to fetch.
     */
    orderBy?: ReputationQuestOrderByWithRelationInput | ReputationQuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReputationQuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReputationQuests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReputationQuests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReputationQuests
    **/
    _count?: true | ReputationQuestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReputationQuestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReputationQuestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReputationQuestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReputationQuestMaxAggregateInputType
  }

  export type GetReputationQuestAggregateType<T extends ReputationQuestAggregateArgs> = {
        [P in keyof T & keyof AggregateReputationQuest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReputationQuest[P]>
      : GetScalarType<T[P], AggregateReputationQuest[P]>
  }




  export type ReputationQuestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReputationQuestWhereInput
    orderBy?: ReputationQuestOrderByWithAggregationInput | ReputationQuestOrderByWithAggregationInput[]
    by: ReputationQuestScalarFieldEnum[] | ReputationQuestScalarFieldEnum
    having?: ReputationQuestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReputationQuestCountAggregateInputType | true
    _avg?: ReputationQuestAvgAggregateInputType
    _sum?: ReputationQuestSumAggregateInputType
    _min?: ReputationQuestMinAggregateInputType
    _max?: ReputationQuestMaxAggregateInputType
  }

  export type ReputationQuestGroupByOutputType = {
    id: string
    title: string
    description: string
    type: string
    targetValue: number
    reward: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: ReputationQuestCountAggregateOutputType | null
    _avg: ReputationQuestAvgAggregateOutputType | null
    _sum: ReputationQuestSumAggregateOutputType | null
    _min: ReputationQuestMinAggregateOutputType | null
    _max: ReputationQuestMaxAggregateOutputType | null
  }

  type GetReputationQuestGroupByPayload<T extends ReputationQuestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReputationQuestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReputationQuestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReputationQuestGroupByOutputType[P]>
            : GetScalarType<T[P], ReputationQuestGroupByOutputType[P]>
        }
      >
    >


  export type ReputationQuestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    type?: boolean
    targetValue?: boolean
    reward?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userProgress?: boolean | ReputationQuest$userProgressArgs<ExtArgs>
    _count?: boolean | ReputationQuestCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reputationQuest"]>

  export type ReputationQuestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    type?: boolean
    targetValue?: boolean
    reward?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["reputationQuest"]>

  export type ReputationQuestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    type?: boolean
    targetValue?: boolean
    reward?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["reputationQuest"]>

  export type ReputationQuestSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    type?: boolean
    targetValue?: boolean
    reward?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ReputationQuestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "type" | "targetValue" | "reward" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["reputationQuest"]>
  export type ReputationQuestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userProgress?: boolean | ReputationQuest$userProgressArgs<ExtArgs>
    _count?: boolean | ReputationQuestCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ReputationQuestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ReputationQuestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ReputationQuestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReputationQuest"
    objects: {
      userProgress: Prisma.$UserReputationQuestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      type: string
      targetValue: number
      reward: number
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["reputationQuest"]>
    composites: {}
  }

  type ReputationQuestGetPayload<S extends boolean | null | undefined | ReputationQuestDefaultArgs> = $Result.GetResult<Prisma.$ReputationQuestPayload, S>

  type ReputationQuestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReputationQuestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReputationQuestCountAggregateInputType | true
    }

  export interface ReputationQuestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReputationQuest'], meta: { name: 'ReputationQuest' } }
    /**
     * Find zero or one ReputationQuest that matches the filter.
     * @param {ReputationQuestFindUniqueArgs} args - Arguments to find a ReputationQuest
     * @example
     * // Get one ReputationQuest
     * const reputationQuest = await prisma.reputationQuest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReputationQuestFindUniqueArgs>(args: SelectSubset<T, ReputationQuestFindUniqueArgs<ExtArgs>>): Prisma__ReputationQuestClient<$Result.GetResult<Prisma.$ReputationQuestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ReputationQuest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReputationQuestFindUniqueOrThrowArgs} args - Arguments to find a ReputationQuest
     * @example
     * // Get one ReputationQuest
     * const reputationQuest = await prisma.reputationQuest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReputationQuestFindUniqueOrThrowArgs>(args: SelectSubset<T, ReputationQuestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReputationQuestClient<$Result.GetResult<Prisma.$ReputationQuestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReputationQuest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReputationQuestFindFirstArgs} args - Arguments to find a ReputationQuest
     * @example
     * // Get one ReputationQuest
     * const reputationQuest = await prisma.reputationQuest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReputationQuestFindFirstArgs>(args?: SelectSubset<T, ReputationQuestFindFirstArgs<ExtArgs>>): Prisma__ReputationQuestClient<$Result.GetResult<Prisma.$ReputationQuestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReputationQuest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReputationQuestFindFirstOrThrowArgs} args - Arguments to find a ReputationQuest
     * @example
     * // Get one ReputationQuest
     * const reputationQuest = await prisma.reputationQuest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReputationQuestFindFirstOrThrowArgs>(args?: SelectSubset<T, ReputationQuestFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReputationQuestClient<$Result.GetResult<Prisma.$ReputationQuestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ReputationQuests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReputationQuestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReputationQuests
     * const reputationQuests = await prisma.reputationQuest.findMany()
     * 
     * // Get first 10 ReputationQuests
     * const reputationQuests = await prisma.reputationQuest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reputationQuestWithIdOnly = await prisma.reputationQuest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReputationQuestFindManyArgs>(args?: SelectSubset<T, ReputationQuestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReputationQuestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ReputationQuest.
     * @param {ReputationQuestCreateArgs} args - Arguments to create a ReputationQuest.
     * @example
     * // Create one ReputationQuest
     * const ReputationQuest = await prisma.reputationQuest.create({
     *   data: {
     *     // ... data to create a ReputationQuest
     *   }
     * })
     * 
     */
    create<T extends ReputationQuestCreateArgs>(args: SelectSubset<T, ReputationQuestCreateArgs<ExtArgs>>): Prisma__ReputationQuestClient<$Result.GetResult<Prisma.$ReputationQuestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ReputationQuests.
     * @param {ReputationQuestCreateManyArgs} args - Arguments to create many ReputationQuests.
     * @example
     * // Create many ReputationQuests
     * const reputationQuest = await prisma.reputationQuest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReputationQuestCreateManyArgs>(args?: SelectSubset<T, ReputationQuestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReputationQuests and returns the data saved in the database.
     * @param {ReputationQuestCreateManyAndReturnArgs} args - Arguments to create many ReputationQuests.
     * @example
     * // Create many ReputationQuests
     * const reputationQuest = await prisma.reputationQuest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReputationQuests and only return the `id`
     * const reputationQuestWithIdOnly = await prisma.reputationQuest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReputationQuestCreateManyAndReturnArgs>(args?: SelectSubset<T, ReputationQuestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReputationQuestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ReputationQuest.
     * @param {ReputationQuestDeleteArgs} args - Arguments to delete one ReputationQuest.
     * @example
     * // Delete one ReputationQuest
     * const ReputationQuest = await prisma.reputationQuest.delete({
     *   where: {
     *     // ... filter to delete one ReputationQuest
     *   }
     * })
     * 
     */
    delete<T extends ReputationQuestDeleteArgs>(args: SelectSubset<T, ReputationQuestDeleteArgs<ExtArgs>>): Prisma__ReputationQuestClient<$Result.GetResult<Prisma.$ReputationQuestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ReputationQuest.
     * @param {ReputationQuestUpdateArgs} args - Arguments to update one ReputationQuest.
     * @example
     * // Update one ReputationQuest
     * const reputationQuest = await prisma.reputationQuest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReputationQuestUpdateArgs>(args: SelectSubset<T, ReputationQuestUpdateArgs<ExtArgs>>): Prisma__ReputationQuestClient<$Result.GetResult<Prisma.$ReputationQuestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ReputationQuests.
     * @param {ReputationQuestDeleteManyArgs} args - Arguments to filter ReputationQuests to delete.
     * @example
     * // Delete a few ReputationQuests
     * const { count } = await prisma.reputationQuest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReputationQuestDeleteManyArgs>(args?: SelectSubset<T, ReputationQuestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReputationQuests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReputationQuestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReputationQuests
     * const reputationQuest = await prisma.reputationQuest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReputationQuestUpdateManyArgs>(args: SelectSubset<T, ReputationQuestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReputationQuests and returns the data updated in the database.
     * @param {ReputationQuestUpdateManyAndReturnArgs} args - Arguments to update many ReputationQuests.
     * @example
     * // Update many ReputationQuests
     * const reputationQuest = await prisma.reputationQuest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ReputationQuests and only return the `id`
     * const reputationQuestWithIdOnly = await prisma.reputationQuest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReputationQuestUpdateManyAndReturnArgs>(args: SelectSubset<T, ReputationQuestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReputationQuestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ReputationQuest.
     * @param {ReputationQuestUpsertArgs} args - Arguments to update or create a ReputationQuest.
     * @example
     * // Update or create a ReputationQuest
     * const reputationQuest = await prisma.reputationQuest.upsert({
     *   create: {
     *     // ... data to create a ReputationQuest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReputationQuest we want to update
     *   }
     * })
     */
    upsert<T extends ReputationQuestUpsertArgs>(args: SelectSubset<T, ReputationQuestUpsertArgs<ExtArgs>>): Prisma__ReputationQuestClient<$Result.GetResult<Prisma.$ReputationQuestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ReputationQuests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReputationQuestCountArgs} args - Arguments to filter ReputationQuests to count.
     * @example
     * // Count the number of ReputationQuests
     * const count = await prisma.reputationQuest.count({
     *   where: {
     *     // ... the filter for the ReputationQuests we want to count
     *   }
     * })
    **/
    count<T extends ReputationQuestCountArgs>(
      args?: Subset<T, ReputationQuestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReputationQuestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReputationQuest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReputationQuestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReputationQuestAggregateArgs>(args: Subset<T, ReputationQuestAggregateArgs>): Prisma.PrismaPromise<GetReputationQuestAggregateType<T>>

    /**
     * Group by ReputationQuest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReputationQuestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReputationQuestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReputationQuestGroupByArgs['orderBy'] }
        : { orderBy?: ReputationQuestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReputationQuestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReputationQuestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReputationQuest model
   */
  readonly fields: ReputationQuestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReputationQuest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReputationQuestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    userProgress<T extends ReputationQuest$userProgressArgs<ExtArgs> = {}>(args?: Subset<T, ReputationQuest$userProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserReputationQuestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ReputationQuest model
   */
  interface ReputationQuestFieldRefs {
    readonly id: FieldRef<"ReputationQuest", 'String'>
    readonly title: FieldRef<"ReputationQuest", 'String'>
    readonly description: FieldRef<"ReputationQuest", 'String'>
    readonly type: FieldRef<"ReputationQuest", 'String'>
    readonly targetValue: FieldRef<"ReputationQuest", 'Float'>
    readonly reward: FieldRef<"ReputationQuest", 'Int'>
    readonly isActive: FieldRef<"ReputationQuest", 'Boolean'>
    readonly createdAt: FieldRef<"ReputationQuest", 'DateTime'>
    readonly updatedAt: FieldRef<"ReputationQuest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReputationQuest findUnique
   */
  export type ReputationQuestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReputationQuest
     */
    select?: ReputationQuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReputationQuest
     */
    omit?: ReputationQuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReputationQuestInclude<ExtArgs> | null
    /**
     * Filter, which ReputationQuest to fetch.
     */
    where: ReputationQuestWhereUniqueInput
  }

  /**
   * ReputationQuest findUniqueOrThrow
   */
  export type ReputationQuestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReputationQuest
     */
    select?: ReputationQuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReputationQuest
     */
    omit?: ReputationQuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReputationQuestInclude<ExtArgs> | null
    /**
     * Filter, which ReputationQuest to fetch.
     */
    where: ReputationQuestWhereUniqueInput
  }

  /**
   * ReputationQuest findFirst
   */
  export type ReputationQuestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReputationQuest
     */
    select?: ReputationQuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReputationQuest
     */
    omit?: ReputationQuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReputationQuestInclude<ExtArgs> | null
    /**
     * Filter, which ReputationQuest to fetch.
     */
    where?: ReputationQuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReputationQuests to fetch.
     */
    orderBy?: ReputationQuestOrderByWithRelationInput | ReputationQuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReputationQuests.
     */
    cursor?: ReputationQuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReputationQuests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReputationQuests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReputationQuests.
     */
    distinct?: ReputationQuestScalarFieldEnum | ReputationQuestScalarFieldEnum[]
  }

  /**
   * ReputationQuest findFirstOrThrow
   */
  export type ReputationQuestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReputationQuest
     */
    select?: ReputationQuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReputationQuest
     */
    omit?: ReputationQuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReputationQuestInclude<ExtArgs> | null
    /**
     * Filter, which ReputationQuest to fetch.
     */
    where?: ReputationQuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReputationQuests to fetch.
     */
    orderBy?: ReputationQuestOrderByWithRelationInput | ReputationQuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReputationQuests.
     */
    cursor?: ReputationQuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReputationQuests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReputationQuests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReputationQuests.
     */
    distinct?: ReputationQuestScalarFieldEnum | ReputationQuestScalarFieldEnum[]
  }

  /**
   * ReputationQuest findMany
   */
  export type ReputationQuestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReputationQuest
     */
    select?: ReputationQuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReputationQuest
     */
    omit?: ReputationQuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReputationQuestInclude<ExtArgs> | null
    /**
     * Filter, which ReputationQuests to fetch.
     */
    where?: ReputationQuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReputationQuests to fetch.
     */
    orderBy?: ReputationQuestOrderByWithRelationInput | ReputationQuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReputationQuests.
     */
    cursor?: ReputationQuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReputationQuests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReputationQuests.
     */
    skip?: number
    distinct?: ReputationQuestScalarFieldEnum | ReputationQuestScalarFieldEnum[]
  }

  /**
   * ReputationQuest create
   */
  export type ReputationQuestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReputationQuest
     */
    select?: ReputationQuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReputationQuest
     */
    omit?: ReputationQuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReputationQuestInclude<ExtArgs> | null
    /**
     * The data needed to create a ReputationQuest.
     */
    data: XOR<ReputationQuestCreateInput, ReputationQuestUncheckedCreateInput>
  }

  /**
   * ReputationQuest createMany
   */
  export type ReputationQuestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReputationQuests.
     */
    data: ReputationQuestCreateManyInput | ReputationQuestCreateManyInput[]
  }

  /**
   * ReputationQuest createManyAndReturn
   */
  export type ReputationQuestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReputationQuest
     */
    select?: ReputationQuestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReputationQuest
     */
    omit?: ReputationQuestOmit<ExtArgs> | null
    /**
     * The data used to create many ReputationQuests.
     */
    data: ReputationQuestCreateManyInput | ReputationQuestCreateManyInput[]
  }

  /**
   * ReputationQuest update
   */
  export type ReputationQuestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReputationQuest
     */
    select?: ReputationQuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReputationQuest
     */
    omit?: ReputationQuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReputationQuestInclude<ExtArgs> | null
    /**
     * The data needed to update a ReputationQuest.
     */
    data: XOR<ReputationQuestUpdateInput, ReputationQuestUncheckedUpdateInput>
    /**
     * Choose, which ReputationQuest to update.
     */
    where: ReputationQuestWhereUniqueInput
  }

  /**
   * ReputationQuest updateMany
   */
  export type ReputationQuestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReputationQuests.
     */
    data: XOR<ReputationQuestUpdateManyMutationInput, ReputationQuestUncheckedUpdateManyInput>
    /**
     * Filter which ReputationQuests to update
     */
    where?: ReputationQuestWhereInput
    /**
     * Limit how many ReputationQuests to update.
     */
    limit?: number
  }

  /**
   * ReputationQuest updateManyAndReturn
   */
  export type ReputationQuestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReputationQuest
     */
    select?: ReputationQuestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReputationQuest
     */
    omit?: ReputationQuestOmit<ExtArgs> | null
    /**
     * The data used to update ReputationQuests.
     */
    data: XOR<ReputationQuestUpdateManyMutationInput, ReputationQuestUncheckedUpdateManyInput>
    /**
     * Filter which ReputationQuests to update
     */
    where?: ReputationQuestWhereInput
    /**
     * Limit how many ReputationQuests to update.
     */
    limit?: number
  }

  /**
   * ReputationQuest upsert
   */
  export type ReputationQuestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReputationQuest
     */
    select?: ReputationQuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReputationQuest
     */
    omit?: ReputationQuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReputationQuestInclude<ExtArgs> | null
    /**
     * The filter to search for the ReputationQuest to update in case it exists.
     */
    where: ReputationQuestWhereUniqueInput
    /**
     * In case the ReputationQuest found by the `where` argument doesn't exist, create a new ReputationQuest with this data.
     */
    create: XOR<ReputationQuestCreateInput, ReputationQuestUncheckedCreateInput>
    /**
     * In case the ReputationQuest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReputationQuestUpdateInput, ReputationQuestUncheckedUpdateInput>
  }

  /**
   * ReputationQuest delete
   */
  export type ReputationQuestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReputationQuest
     */
    select?: ReputationQuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReputationQuest
     */
    omit?: ReputationQuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReputationQuestInclude<ExtArgs> | null
    /**
     * Filter which ReputationQuest to delete.
     */
    where: ReputationQuestWhereUniqueInput
  }

  /**
   * ReputationQuest deleteMany
   */
  export type ReputationQuestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReputationQuests to delete
     */
    where?: ReputationQuestWhereInput
    /**
     * Limit how many ReputationQuests to delete.
     */
    limit?: number
  }

  /**
   * ReputationQuest.userProgress
   */
  export type ReputationQuest$userProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserReputationQuest
     */
    select?: UserReputationQuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserReputationQuest
     */
    omit?: UserReputationQuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserReputationQuestInclude<ExtArgs> | null
    where?: UserReputationQuestWhereInput
    orderBy?: UserReputationQuestOrderByWithRelationInput | UserReputationQuestOrderByWithRelationInput[]
    cursor?: UserReputationQuestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserReputationQuestScalarFieldEnum | UserReputationQuestScalarFieldEnum[]
  }

  /**
   * ReputationQuest without action
   */
  export type ReputationQuestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReputationQuest
     */
    select?: ReputationQuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReputationQuest
     */
    omit?: ReputationQuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReputationQuestInclude<ExtArgs> | null
  }


  /**
   * Model UserReputationQuest
   */

  export type AggregateUserReputationQuest = {
    _count: UserReputationQuestCountAggregateOutputType | null
    _avg: UserReputationQuestAvgAggregateOutputType | null
    _sum: UserReputationQuestSumAggregateOutputType | null
    _min: UserReputationQuestMinAggregateOutputType | null
    _max: UserReputationQuestMaxAggregateOutputType | null
  }

  export type UserReputationQuestAvgAggregateOutputType = {
    progress: number | null
  }

  export type UserReputationQuestSumAggregateOutputType = {
    progress: number | null
  }

  export type UserReputationQuestMinAggregateOutputType = {
    id: string | null
    userAddress: string | null
    questId: string | null
    progress: number | null
    isCompleted: boolean | null
    completedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserReputationQuestMaxAggregateOutputType = {
    id: string | null
    userAddress: string | null
    questId: string | null
    progress: number | null
    isCompleted: boolean | null
    completedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserReputationQuestCountAggregateOutputType = {
    id: number
    userAddress: number
    questId: number
    progress: number
    isCompleted: number
    completedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserReputationQuestAvgAggregateInputType = {
    progress?: true
  }

  export type UserReputationQuestSumAggregateInputType = {
    progress?: true
  }

  export type UserReputationQuestMinAggregateInputType = {
    id?: true
    userAddress?: true
    questId?: true
    progress?: true
    isCompleted?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserReputationQuestMaxAggregateInputType = {
    id?: true
    userAddress?: true
    questId?: true
    progress?: true
    isCompleted?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserReputationQuestCountAggregateInputType = {
    id?: true
    userAddress?: true
    questId?: true
    progress?: true
    isCompleted?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserReputationQuestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserReputationQuest to aggregate.
     */
    where?: UserReputationQuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserReputationQuests to fetch.
     */
    orderBy?: UserReputationQuestOrderByWithRelationInput | UserReputationQuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserReputationQuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserReputationQuests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserReputationQuests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserReputationQuests
    **/
    _count?: true | UserReputationQuestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserReputationQuestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserReputationQuestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserReputationQuestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserReputationQuestMaxAggregateInputType
  }

  export type GetUserReputationQuestAggregateType<T extends UserReputationQuestAggregateArgs> = {
        [P in keyof T & keyof AggregateUserReputationQuest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserReputationQuest[P]>
      : GetScalarType<T[P], AggregateUserReputationQuest[P]>
  }




  export type UserReputationQuestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserReputationQuestWhereInput
    orderBy?: UserReputationQuestOrderByWithAggregationInput | UserReputationQuestOrderByWithAggregationInput[]
    by: UserReputationQuestScalarFieldEnum[] | UserReputationQuestScalarFieldEnum
    having?: UserReputationQuestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserReputationQuestCountAggregateInputType | true
    _avg?: UserReputationQuestAvgAggregateInputType
    _sum?: UserReputationQuestSumAggregateInputType
    _min?: UserReputationQuestMinAggregateInputType
    _max?: UserReputationQuestMaxAggregateInputType
  }

  export type UserReputationQuestGroupByOutputType = {
    id: string
    userAddress: string
    questId: string
    progress: number
    isCompleted: boolean
    completedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UserReputationQuestCountAggregateOutputType | null
    _avg: UserReputationQuestAvgAggregateOutputType | null
    _sum: UserReputationQuestSumAggregateOutputType | null
    _min: UserReputationQuestMinAggregateOutputType | null
    _max: UserReputationQuestMaxAggregateOutputType | null
  }

  type GetUserReputationQuestGroupByPayload<T extends UserReputationQuestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserReputationQuestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserReputationQuestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserReputationQuestGroupByOutputType[P]>
            : GetScalarType<T[P], UserReputationQuestGroupByOutputType[P]>
        }
      >
    >


  export type UserReputationQuestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userAddress?: boolean
    questId?: boolean
    progress?: boolean
    isCompleted?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    quest?: boolean | ReputationQuestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userReputationQuest"]>

  export type UserReputationQuestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userAddress?: boolean
    questId?: boolean
    progress?: boolean
    isCompleted?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    quest?: boolean | ReputationQuestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userReputationQuest"]>

  export type UserReputationQuestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userAddress?: boolean
    questId?: boolean
    progress?: boolean
    isCompleted?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    quest?: boolean | ReputationQuestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userReputationQuest"]>

  export type UserReputationQuestSelectScalar = {
    id?: boolean
    userAddress?: boolean
    questId?: boolean
    progress?: boolean
    isCompleted?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserReputationQuestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userAddress" | "questId" | "progress" | "isCompleted" | "completedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["userReputationQuest"]>
  export type UserReputationQuestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    quest?: boolean | ReputationQuestDefaultArgs<ExtArgs>
  }
  export type UserReputationQuestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    quest?: boolean | ReputationQuestDefaultArgs<ExtArgs>
  }
  export type UserReputationQuestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    quest?: boolean | ReputationQuestDefaultArgs<ExtArgs>
  }

  export type $UserReputationQuestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserReputationQuest"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      quest: Prisma.$ReputationQuestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userAddress: string
      questId: string
      progress: number
      isCompleted: boolean
      completedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userReputationQuest"]>
    composites: {}
  }

  type UserReputationQuestGetPayload<S extends boolean | null | undefined | UserReputationQuestDefaultArgs> = $Result.GetResult<Prisma.$UserReputationQuestPayload, S>

  type UserReputationQuestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserReputationQuestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserReputationQuestCountAggregateInputType | true
    }

  export interface UserReputationQuestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserReputationQuest'], meta: { name: 'UserReputationQuest' } }
    /**
     * Find zero or one UserReputationQuest that matches the filter.
     * @param {UserReputationQuestFindUniqueArgs} args - Arguments to find a UserReputationQuest
     * @example
     * // Get one UserReputationQuest
     * const userReputationQuest = await prisma.userReputationQuest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserReputationQuestFindUniqueArgs>(args: SelectSubset<T, UserReputationQuestFindUniqueArgs<ExtArgs>>): Prisma__UserReputationQuestClient<$Result.GetResult<Prisma.$UserReputationQuestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserReputationQuest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserReputationQuestFindUniqueOrThrowArgs} args - Arguments to find a UserReputationQuest
     * @example
     * // Get one UserReputationQuest
     * const userReputationQuest = await prisma.userReputationQuest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserReputationQuestFindUniqueOrThrowArgs>(args: SelectSubset<T, UserReputationQuestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserReputationQuestClient<$Result.GetResult<Prisma.$UserReputationQuestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserReputationQuest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserReputationQuestFindFirstArgs} args - Arguments to find a UserReputationQuest
     * @example
     * // Get one UserReputationQuest
     * const userReputationQuest = await prisma.userReputationQuest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserReputationQuestFindFirstArgs>(args?: SelectSubset<T, UserReputationQuestFindFirstArgs<ExtArgs>>): Prisma__UserReputationQuestClient<$Result.GetResult<Prisma.$UserReputationQuestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserReputationQuest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserReputationQuestFindFirstOrThrowArgs} args - Arguments to find a UserReputationQuest
     * @example
     * // Get one UserReputationQuest
     * const userReputationQuest = await prisma.userReputationQuest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserReputationQuestFindFirstOrThrowArgs>(args?: SelectSubset<T, UserReputationQuestFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserReputationQuestClient<$Result.GetResult<Prisma.$UserReputationQuestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserReputationQuests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserReputationQuestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserReputationQuests
     * const userReputationQuests = await prisma.userReputationQuest.findMany()
     * 
     * // Get first 10 UserReputationQuests
     * const userReputationQuests = await prisma.userReputationQuest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userReputationQuestWithIdOnly = await prisma.userReputationQuest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserReputationQuestFindManyArgs>(args?: SelectSubset<T, UserReputationQuestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserReputationQuestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserReputationQuest.
     * @param {UserReputationQuestCreateArgs} args - Arguments to create a UserReputationQuest.
     * @example
     * // Create one UserReputationQuest
     * const UserReputationQuest = await prisma.userReputationQuest.create({
     *   data: {
     *     // ... data to create a UserReputationQuest
     *   }
     * })
     * 
     */
    create<T extends UserReputationQuestCreateArgs>(args: SelectSubset<T, UserReputationQuestCreateArgs<ExtArgs>>): Prisma__UserReputationQuestClient<$Result.GetResult<Prisma.$UserReputationQuestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserReputationQuests.
     * @param {UserReputationQuestCreateManyArgs} args - Arguments to create many UserReputationQuests.
     * @example
     * // Create many UserReputationQuests
     * const userReputationQuest = await prisma.userReputationQuest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserReputationQuestCreateManyArgs>(args?: SelectSubset<T, UserReputationQuestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserReputationQuests and returns the data saved in the database.
     * @param {UserReputationQuestCreateManyAndReturnArgs} args - Arguments to create many UserReputationQuests.
     * @example
     * // Create many UserReputationQuests
     * const userReputationQuest = await prisma.userReputationQuest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserReputationQuests and only return the `id`
     * const userReputationQuestWithIdOnly = await prisma.userReputationQuest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserReputationQuestCreateManyAndReturnArgs>(args?: SelectSubset<T, UserReputationQuestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserReputationQuestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserReputationQuest.
     * @param {UserReputationQuestDeleteArgs} args - Arguments to delete one UserReputationQuest.
     * @example
     * // Delete one UserReputationQuest
     * const UserReputationQuest = await prisma.userReputationQuest.delete({
     *   where: {
     *     // ... filter to delete one UserReputationQuest
     *   }
     * })
     * 
     */
    delete<T extends UserReputationQuestDeleteArgs>(args: SelectSubset<T, UserReputationQuestDeleteArgs<ExtArgs>>): Prisma__UserReputationQuestClient<$Result.GetResult<Prisma.$UserReputationQuestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserReputationQuest.
     * @param {UserReputationQuestUpdateArgs} args - Arguments to update one UserReputationQuest.
     * @example
     * // Update one UserReputationQuest
     * const userReputationQuest = await prisma.userReputationQuest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserReputationQuestUpdateArgs>(args: SelectSubset<T, UserReputationQuestUpdateArgs<ExtArgs>>): Prisma__UserReputationQuestClient<$Result.GetResult<Prisma.$UserReputationQuestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserReputationQuests.
     * @param {UserReputationQuestDeleteManyArgs} args - Arguments to filter UserReputationQuests to delete.
     * @example
     * // Delete a few UserReputationQuests
     * const { count } = await prisma.userReputationQuest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserReputationQuestDeleteManyArgs>(args?: SelectSubset<T, UserReputationQuestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserReputationQuests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserReputationQuestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserReputationQuests
     * const userReputationQuest = await prisma.userReputationQuest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserReputationQuestUpdateManyArgs>(args: SelectSubset<T, UserReputationQuestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserReputationQuests and returns the data updated in the database.
     * @param {UserReputationQuestUpdateManyAndReturnArgs} args - Arguments to update many UserReputationQuests.
     * @example
     * // Update many UserReputationQuests
     * const userReputationQuest = await prisma.userReputationQuest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserReputationQuests and only return the `id`
     * const userReputationQuestWithIdOnly = await prisma.userReputationQuest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserReputationQuestUpdateManyAndReturnArgs>(args: SelectSubset<T, UserReputationQuestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserReputationQuestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserReputationQuest.
     * @param {UserReputationQuestUpsertArgs} args - Arguments to update or create a UserReputationQuest.
     * @example
     * // Update or create a UserReputationQuest
     * const userReputationQuest = await prisma.userReputationQuest.upsert({
     *   create: {
     *     // ... data to create a UserReputationQuest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserReputationQuest we want to update
     *   }
     * })
     */
    upsert<T extends UserReputationQuestUpsertArgs>(args: SelectSubset<T, UserReputationQuestUpsertArgs<ExtArgs>>): Prisma__UserReputationQuestClient<$Result.GetResult<Prisma.$UserReputationQuestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserReputationQuests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserReputationQuestCountArgs} args - Arguments to filter UserReputationQuests to count.
     * @example
     * // Count the number of UserReputationQuests
     * const count = await prisma.userReputationQuest.count({
     *   where: {
     *     // ... the filter for the UserReputationQuests we want to count
     *   }
     * })
    **/
    count<T extends UserReputationQuestCountArgs>(
      args?: Subset<T, UserReputationQuestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserReputationQuestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserReputationQuest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserReputationQuestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserReputationQuestAggregateArgs>(args: Subset<T, UserReputationQuestAggregateArgs>): Prisma.PrismaPromise<GetUserReputationQuestAggregateType<T>>

    /**
     * Group by UserReputationQuest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserReputationQuestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserReputationQuestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserReputationQuestGroupByArgs['orderBy'] }
        : { orderBy?: UserReputationQuestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserReputationQuestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserReputationQuestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserReputationQuest model
   */
  readonly fields: UserReputationQuestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserReputationQuest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserReputationQuestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    quest<T extends ReputationQuestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ReputationQuestDefaultArgs<ExtArgs>>): Prisma__ReputationQuestClient<$Result.GetResult<Prisma.$ReputationQuestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserReputationQuest model
   */
  interface UserReputationQuestFieldRefs {
    readonly id: FieldRef<"UserReputationQuest", 'String'>
    readonly userAddress: FieldRef<"UserReputationQuest", 'String'>
    readonly questId: FieldRef<"UserReputationQuest", 'String'>
    readonly progress: FieldRef<"UserReputationQuest", 'Float'>
    readonly isCompleted: FieldRef<"UserReputationQuest", 'Boolean'>
    readonly completedAt: FieldRef<"UserReputationQuest", 'DateTime'>
    readonly createdAt: FieldRef<"UserReputationQuest", 'DateTime'>
    readonly updatedAt: FieldRef<"UserReputationQuest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserReputationQuest findUnique
   */
  export type UserReputationQuestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserReputationQuest
     */
    select?: UserReputationQuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserReputationQuest
     */
    omit?: UserReputationQuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserReputationQuestInclude<ExtArgs> | null
    /**
     * Filter, which UserReputationQuest to fetch.
     */
    where: UserReputationQuestWhereUniqueInput
  }

  /**
   * UserReputationQuest findUniqueOrThrow
   */
  export type UserReputationQuestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserReputationQuest
     */
    select?: UserReputationQuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserReputationQuest
     */
    omit?: UserReputationQuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserReputationQuestInclude<ExtArgs> | null
    /**
     * Filter, which UserReputationQuest to fetch.
     */
    where: UserReputationQuestWhereUniqueInput
  }

  /**
   * UserReputationQuest findFirst
   */
  export type UserReputationQuestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserReputationQuest
     */
    select?: UserReputationQuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserReputationQuest
     */
    omit?: UserReputationQuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserReputationQuestInclude<ExtArgs> | null
    /**
     * Filter, which UserReputationQuest to fetch.
     */
    where?: UserReputationQuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserReputationQuests to fetch.
     */
    orderBy?: UserReputationQuestOrderByWithRelationInput | UserReputationQuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserReputationQuests.
     */
    cursor?: UserReputationQuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserReputationQuests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserReputationQuests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserReputationQuests.
     */
    distinct?: UserReputationQuestScalarFieldEnum | UserReputationQuestScalarFieldEnum[]
  }

  /**
   * UserReputationQuest findFirstOrThrow
   */
  export type UserReputationQuestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserReputationQuest
     */
    select?: UserReputationQuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserReputationQuest
     */
    omit?: UserReputationQuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserReputationQuestInclude<ExtArgs> | null
    /**
     * Filter, which UserReputationQuest to fetch.
     */
    where?: UserReputationQuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserReputationQuests to fetch.
     */
    orderBy?: UserReputationQuestOrderByWithRelationInput | UserReputationQuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserReputationQuests.
     */
    cursor?: UserReputationQuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserReputationQuests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserReputationQuests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserReputationQuests.
     */
    distinct?: UserReputationQuestScalarFieldEnum | UserReputationQuestScalarFieldEnum[]
  }

  /**
   * UserReputationQuest findMany
   */
  export type UserReputationQuestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserReputationQuest
     */
    select?: UserReputationQuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserReputationQuest
     */
    omit?: UserReputationQuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserReputationQuestInclude<ExtArgs> | null
    /**
     * Filter, which UserReputationQuests to fetch.
     */
    where?: UserReputationQuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserReputationQuests to fetch.
     */
    orderBy?: UserReputationQuestOrderByWithRelationInput | UserReputationQuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserReputationQuests.
     */
    cursor?: UserReputationQuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserReputationQuests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserReputationQuests.
     */
    skip?: number
    distinct?: UserReputationQuestScalarFieldEnum | UserReputationQuestScalarFieldEnum[]
  }

  /**
   * UserReputationQuest create
   */
  export type UserReputationQuestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserReputationQuest
     */
    select?: UserReputationQuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserReputationQuest
     */
    omit?: UserReputationQuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserReputationQuestInclude<ExtArgs> | null
    /**
     * The data needed to create a UserReputationQuest.
     */
    data: XOR<UserReputationQuestCreateInput, UserReputationQuestUncheckedCreateInput>
  }

  /**
   * UserReputationQuest createMany
   */
  export type UserReputationQuestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserReputationQuests.
     */
    data: UserReputationQuestCreateManyInput | UserReputationQuestCreateManyInput[]
  }

  /**
   * UserReputationQuest createManyAndReturn
   */
  export type UserReputationQuestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserReputationQuest
     */
    select?: UserReputationQuestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserReputationQuest
     */
    omit?: UserReputationQuestOmit<ExtArgs> | null
    /**
     * The data used to create many UserReputationQuests.
     */
    data: UserReputationQuestCreateManyInput | UserReputationQuestCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserReputationQuestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserReputationQuest update
   */
  export type UserReputationQuestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserReputationQuest
     */
    select?: UserReputationQuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserReputationQuest
     */
    omit?: UserReputationQuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserReputationQuestInclude<ExtArgs> | null
    /**
     * The data needed to update a UserReputationQuest.
     */
    data: XOR<UserReputationQuestUpdateInput, UserReputationQuestUncheckedUpdateInput>
    /**
     * Choose, which UserReputationQuest to update.
     */
    where: UserReputationQuestWhereUniqueInput
  }

  /**
   * UserReputationQuest updateMany
   */
  export type UserReputationQuestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserReputationQuests.
     */
    data: XOR<UserReputationQuestUpdateManyMutationInput, UserReputationQuestUncheckedUpdateManyInput>
    /**
     * Filter which UserReputationQuests to update
     */
    where?: UserReputationQuestWhereInput
    /**
     * Limit how many UserReputationQuests to update.
     */
    limit?: number
  }

  /**
   * UserReputationQuest updateManyAndReturn
   */
  export type UserReputationQuestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserReputationQuest
     */
    select?: UserReputationQuestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserReputationQuest
     */
    omit?: UserReputationQuestOmit<ExtArgs> | null
    /**
     * The data used to update UserReputationQuests.
     */
    data: XOR<UserReputationQuestUpdateManyMutationInput, UserReputationQuestUncheckedUpdateManyInput>
    /**
     * Filter which UserReputationQuests to update
     */
    where?: UserReputationQuestWhereInput
    /**
     * Limit how many UserReputationQuests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserReputationQuestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserReputationQuest upsert
   */
  export type UserReputationQuestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserReputationQuest
     */
    select?: UserReputationQuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserReputationQuest
     */
    omit?: UserReputationQuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserReputationQuestInclude<ExtArgs> | null
    /**
     * The filter to search for the UserReputationQuest to update in case it exists.
     */
    where: UserReputationQuestWhereUniqueInput
    /**
     * In case the UserReputationQuest found by the `where` argument doesn't exist, create a new UserReputationQuest with this data.
     */
    create: XOR<UserReputationQuestCreateInput, UserReputationQuestUncheckedCreateInput>
    /**
     * In case the UserReputationQuest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserReputationQuestUpdateInput, UserReputationQuestUncheckedUpdateInput>
  }

  /**
   * UserReputationQuest delete
   */
  export type UserReputationQuestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserReputationQuest
     */
    select?: UserReputationQuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserReputationQuest
     */
    omit?: UserReputationQuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserReputationQuestInclude<ExtArgs> | null
    /**
     * Filter which UserReputationQuest to delete.
     */
    where: UserReputationQuestWhereUniqueInput
  }

  /**
   * UserReputationQuest deleteMany
   */
  export type UserReputationQuestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserReputationQuests to delete
     */
    where?: UserReputationQuestWhereInput
    /**
     * Limit how many UserReputationQuests to delete.
     */
    limit?: number
  }

  /**
   * UserReputationQuest without action
   */
  export type UserReputationQuestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserReputationQuest
     */
    select?: UserReputationQuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserReputationQuest
     */
    omit?: UserReputationQuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserReputationQuestInclude<ExtArgs> | null
  }


  /**
   * Model Achievement
   */

  export type AggregateAchievement = {
    _count: AchievementCountAggregateOutputType | null
    _avg: AchievementAvgAggregateOutputType | null
    _sum: AchievementSumAggregateOutputType | null
    _min: AchievementMinAggregateOutputType | null
    _max: AchievementMaxAggregateOutputType | null
  }

  export type AchievementAvgAggregateOutputType = {
    reward: number | null
  }

  export type AchievementSumAggregateOutputType = {
    reward: number | null
  }

  export type AchievementMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    icon: string | null
    rarity: string | null
    requirements: string | null
    reward: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AchievementMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    icon: string | null
    rarity: string | null
    requirements: string | null
    reward: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AchievementCountAggregateOutputType = {
    id: number
    title: number
    description: number
    icon: number
    rarity: number
    requirements: number
    reward: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AchievementAvgAggregateInputType = {
    reward?: true
  }

  export type AchievementSumAggregateInputType = {
    reward?: true
  }

  export type AchievementMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    icon?: true
    rarity?: true
    requirements?: true
    reward?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AchievementMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    icon?: true
    rarity?: true
    requirements?: true
    reward?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AchievementCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    icon?: true
    rarity?: true
    requirements?: true
    reward?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AchievementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Achievement to aggregate.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Achievements
    **/
    _count?: true | AchievementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AchievementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AchievementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AchievementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AchievementMaxAggregateInputType
  }

  export type GetAchievementAggregateType<T extends AchievementAggregateArgs> = {
        [P in keyof T & keyof AggregateAchievement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAchievement[P]>
      : GetScalarType<T[P], AggregateAchievement[P]>
  }




  export type AchievementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AchievementWhereInput
    orderBy?: AchievementOrderByWithAggregationInput | AchievementOrderByWithAggregationInput[]
    by: AchievementScalarFieldEnum[] | AchievementScalarFieldEnum
    having?: AchievementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AchievementCountAggregateInputType | true
    _avg?: AchievementAvgAggregateInputType
    _sum?: AchievementSumAggregateInputType
    _min?: AchievementMinAggregateInputType
    _max?: AchievementMaxAggregateInputType
  }

  export type AchievementGroupByOutputType = {
    id: string
    title: string
    description: string
    icon: string
    rarity: string
    requirements: string
    reward: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: AchievementCountAggregateOutputType | null
    _avg: AchievementAvgAggregateOutputType | null
    _sum: AchievementSumAggregateOutputType | null
    _min: AchievementMinAggregateOutputType | null
    _max: AchievementMaxAggregateOutputType | null
  }

  type GetAchievementGroupByPayload<T extends AchievementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AchievementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AchievementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AchievementGroupByOutputType[P]>
            : GetScalarType<T[P], AchievementGroupByOutputType[P]>
        }
      >
    >


  export type AchievementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    icon?: boolean
    rarity?: boolean
    requirements?: boolean
    reward?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userAchievements?: boolean | Achievement$userAchievementsArgs<ExtArgs>
    _count?: boolean | AchievementCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["achievement"]>

  export type AchievementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    icon?: boolean
    rarity?: boolean
    requirements?: boolean
    reward?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["achievement"]>

  export type AchievementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    icon?: boolean
    rarity?: boolean
    requirements?: boolean
    reward?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["achievement"]>

  export type AchievementSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    icon?: boolean
    rarity?: boolean
    requirements?: boolean
    reward?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AchievementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "icon" | "rarity" | "requirements" | "reward" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["achievement"]>
  export type AchievementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userAchievements?: boolean | Achievement$userAchievementsArgs<ExtArgs>
    _count?: boolean | AchievementCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AchievementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AchievementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AchievementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Achievement"
    objects: {
      userAchievements: Prisma.$UserAchievementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      icon: string
      rarity: string
      requirements: string
      reward: number
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["achievement"]>
    composites: {}
  }

  type AchievementGetPayload<S extends boolean | null | undefined | AchievementDefaultArgs> = $Result.GetResult<Prisma.$AchievementPayload, S>

  type AchievementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AchievementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AchievementCountAggregateInputType | true
    }

  export interface AchievementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Achievement'], meta: { name: 'Achievement' } }
    /**
     * Find zero or one Achievement that matches the filter.
     * @param {AchievementFindUniqueArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AchievementFindUniqueArgs>(args: SelectSubset<T, AchievementFindUniqueArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Achievement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AchievementFindUniqueOrThrowArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AchievementFindUniqueOrThrowArgs>(args: SelectSubset<T, AchievementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Achievement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementFindFirstArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AchievementFindFirstArgs>(args?: SelectSubset<T, AchievementFindFirstArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Achievement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementFindFirstOrThrowArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AchievementFindFirstOrThrowArgs>(args?: SelectSubset<T, AchievementFindFirstOrThrowArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Achievements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Achievements
     * const achievements = await prisma.achievement.findMany()
     * 
     * // Get first 10 Achievements
     * const achievements = await prisma.achievement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const achievementWithIdOnly = await prisma.achievement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AchievementFindManyArgs>(args?: SelectSubset<T, AchievementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Achievement.
     * @param {AchievementCreateArgs} args - Arguments to create a Achievement.
     * @example
     * // Create one Achievement
     * const Achievement = await prisma.achievement.create({
     *   data: {
     *     // ... data to create a Achievement
     *   }
     * })
     * 
     */
    create<T extends AchievementCreateArgs>(args: SelectSubset<T, AchievementCreateArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Achievements.
     * @param {AchievementCreateManyArgs} args - Arguments to create many Achievements.
     * @example
     * // Create many Achievements
     * const achievement = await prisma.achievement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AchievementCreateManyArgs>(args?: SelectSubset<T, AchievementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Achievements and returns the data saved in the database.
     * @param {AchievementCreateManyAndReturnArgs} args - Arguments to create many Achievements.
     * @example
     * // Create many Achievements
     * const achievement = await prisma.achievement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Achievements and only return the `id`
     * const achievementWithIdOnly = await prisma.achievement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AchievementCreateManyAndReturnArgs>(args?: SelectSubset<T, AchievementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Achievement.
     * @param {AchievementDeleteArgs} args - Arguments to delete one Achievement.
     * @example
     * // Delete one Achievement
     * const Achievement = await prisma.achievement.delete({
     *   where: {
     *     // ... filter to delete one Achievement
     *   }
     * })
     * 
     */
    delete<T extends AchievementDeleteArgs>(args: SelectSubset<T, AchievementDeleteArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Achievement.
     * @param {AchievementUpdateArgs} args - Arguments to update one Achievement.
     * @example
     * // Update one Achievement
     * const achievement = await prisma.achievement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AchievementUpdateArgs>(args: SelectSubset<T, AchievementUpdateArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Achievements.
     * @param {AchievementDeleteManyArgs} args - Arguments to filter Achievements to delete.
     * @example
     * // Delete a few Achievements
     * const { count } = await prisma.achievement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AchievementDeleteManyArgs>(args?: SelectSubset<T, AchievementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Achievements
     * const achievement = await prisma.achievement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AchievementUpdateManyArgs>(args: SelectSubset<T, AchievementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Achievements and returns the data updated in the database.
     * @param {AchievementUpdateManyAndReturnArgs} args - Arguments to update many Achievements.
     * @example
     * // Update many Achievements
     * const achievement = await prisma.achievement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Achievements and only return the `id`
     * const achievementWithIdOnly = await prisma.achievement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AchievementUpdateManyAndReturnArgs>(args: SelectSubset<T, AchievementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Achievement.
     * @param {AchievementUpsertArgs} args - Arguments to update or create a Achievement.
     * @example
     * // Update or create a Achievement
     * const achievement = await prisma.achievement.upsert({
     *   create: {
     *     // ... data to create a Achievement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Achievement we want to update
     *   }
     * })
     */
    upsert<T extends AchievementUpsertArgs>(args: SelectSubset<T, AchievementUpsertArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementCountArgs} args - Arguments to filter Achievements to count.
     * @example
     * // Count the number of Achievements
     * const count = await prisma.achievement.count({
     *   where: {
     *     // ... the filter for the Achievements we want to count
     *   }
     * })
    **/
    count<T extends AchievementCountArgs>(
      args?: Subset<T, AchievementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AchievementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Achievement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AchievementAggregateArgs>(args: Subset<T, AchievementAggregateArgs>): Prisma.PrismaPromise<GetAchievementAggregateType<T>>

    /**
     * Group by Achievement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AchievementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AchievementGroupByArgs['orderBy'] }
        : { orderBy?: AchievementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AchievementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAchievementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Achievement model
   */
  readonly fields: AchievementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Achievement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AchievementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    userAchievements<T extends Achievement$userAchievementsArgs<ExtArgs> = {}>(args?: Subset<T, Achievement$userAchievementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Achievement model
   */
  interface AchievementFieldRefs {
    readonly id: FieldRef<"Achievement", 'String'>
    readonly title: FieldRef<"Achievement", 'String'>
    readonly description: FieldRef<"Achievement", 'String'>
    readonly icon: FieldRef<"Achievement", 'String'>
    readonly rarity: FieldRef<"Achievement", 'String'>
    readonly requirements: FieldRef<"Achievement", 'String'>
    readonly reward: FieldRef<"Achievement", 'Int'>
    readonly isActive: FieldRef<"Achievement", 'Boolean'>
    readonly createdAt: FieldRef<"Achievement", 'DateTime'>
    readonly updatedAt: FieldRef<"Achievement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Achievement findUnique
   */
  export type AchievementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievement to fetch.
     */
    where: AchievementWhereUniqueInput
  }

  /**
   * Achievement findUniqueOrThrow
   */
  export type AchievementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievement to fetch.
     */
    where: AchievementWhereUniqueInput
  }

  /**
   * Achievement findFirst
   */
  export type AchievementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievement to fetch.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Achievements.
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Achievements.
     */
    distinct?: AchievementScalarFieldEnum | AchievementScalarFieldEnum[]
  }

  /**
   * Achievement findFirstOrThrow
   */
  export type AchievementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievement to fetch.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Achievements.
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Achievements.
     */
    distinct?: AchievementScalarFieldEnum | AchievementScalarFieldEnum[]
  }

  /**
   * Achievement findMany
   */
  export type AchievementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievements to fetch.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Achievements.
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    distinct?: AchievementScalarFieldEnum | AchievementScalarFieldEnum[]
  }

  /**
   * Achievement create
   */
  export type AchievementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * The data needed to create a Achievement.
     */
    data: XOR<AchievementCreateInput, AchievementUncheckedCreateInput>
  }

  /**
   * Achievement createMany
   */
  export type AchievementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Achievements.
     */
    data: AchievementCreateManyInput | AchievementCreateManyInput[]
  }

  /**
   * Achievement createManyAndReturn
   */
  export type AchievementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * The data used to create many Achievements.
     */
    data: AchievementCreateManyInput | AchievementCreateManyInput[]
  }

  /**
   * Achievement update
   */
  export type AchievementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * The data needed to update a Achievement.
     */
    data: XOR<AchievementUpdateInput, AchievementUncheckedUpdateInput>
    /**
     * Choose, which Achievement to update.
     */
    where: AchievementWhereUniqueInput
  }

  /**
   * Achievement updateMany
   */
  export type AchievementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Achievements.
     */
    data: XOR<AchievementUpdateManyMutationInput, AchievementUncheckedUpdateManyInput>
    /**
     * Filter which Achievements to update
     */
    where?: AchievementWhereInput
    /**
     * Limit how many Achievements to update.
     */
    limit?: number
  }

  /**
   * Achievement updateManyAndReturn
   */
  export type AchievementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * The data used to update Achievements.
     */
    data: XOR<AchievementUpdateManyMutationInput, AchievementUncheckedUpdateManyInput>
    /**
     * Filter which Achievements to update
     */
    where?: AchievementWhereInput
    /**
     * Limit how many Achievements to update.
     */
    limit?: number
  }

  /**
   * Achievement upsert
   */
  export type AchievementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * The filter to search for the Achievement to update in case it exists.
     */
    where: AchievementWhereUniqueInput
    /**
     * In case the Achievement found by the `where` argument doesn't exist, create a new Achievement with this data.
     */
    create: XOR<AchievementCreateInput, AchievementUncheckedCreateInput>
    /**
     * In case the Achievement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AchievementUpdateInput, AchievementUncheckedUpdateInput>
  }

  /**
   * Achievement delete
   */
  export type AchievementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter which Achievement to delete.
     */
    where: AchievementWhereUniqueInput
  }

  /**
   * Achievement deleteMany
   */
  export type AchievementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Achievements to delete
     */
    where?: AchievementWhereInput
    /**
     * Limit how many Achievements to delete.
     */
    limit?: number
  }

  /**
   * Achievement.userAchievements
   */
  export type Achievement$userAchievementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    where?: UserAchievementWhereInput
    orderBy?: UserAchievementOrderByWithRelationInput | UserAchievementOrderByWithRelationInput[]
    cursor?: UserAchievementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserAchievementScalarFieldEnum | UserAchievementScalarFieldEnum[]
  }

  /**
   * Achievement without action
   */
  export type AchievementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
  }


  /**
   * Model UserAchievement
   */

  export type AggregateUserAchievement = {
    _count: UserAchievementCountAggregateOutputType | null
    _min: UserAchievementMinAggregateOutputType | null
    _max: UserAchievementMaxAggregateOutputType | null
  }

  export type UserAchievementMinAggregateOutputType = {
    id: string | null
    userAddress: string | null
    achievementId: string | null
    unlockedAt: Date | null
  }

  export type UserAchievementMaxAggregateOutputType = {
    id: string | null
    userAddress: string | null
    achievementId: string | null
    unlockedAt: Date | null
  }

  export type UserAchievementCountAggregateOutputType = {
    id: number
    userAddress: number
    achievementId: number
    unlockedAt: number
    _all: number
  }


  export type UserAchievementMinAggregateInputType = {
    id?: true
    userAddress?: true
    achievementId?: true
    unlockedAt?: true
  }

  export type UserAchievementMaxAggregateInputType = {
    id?: true
    userAddress?: true
    achievementId?: true
    unlockedAt?: true
  }

  export type UserAchievementCountAggregateInputType = {
    id?: true
    userAddress?: true
    achievementId?: true
    unlockedAt?: true
    _all?: true
  }

  export type UserAchievementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAchievement to aggregate.
     */
    where?: UserAchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAchievements to fetch.
     */
    orderBy?: UserAchievementOrderByWithRelationInput | UserAchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserAchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAchievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAchievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserAchievements
    **/
    _count?: true | UserAchievementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserAchievementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserAchievementMaxAggregateInputType
  }

  export type GetUserAchievementAggregateType<T extends UserAchievementAggregateArgs> = {
        [P in keyof T & keyof AggregateUserAchievement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserAchievement[P]>
      : GetScalarType<T[P], AggregateUserAchievement[P]>
  }




  export type UserAchievementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAchievementWhereInput
    orderBy?: UserAchievementOrderByWithAggregationInput | UserAchievementOrderByWithAggregationInput[]
    by: UserAchievementScalarFieldEnum[] | UserAchievementScalarFieldEnum
    having?: UserAchievementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserAchievementCountAggregateInputType | true
    _min?: UserAchievementMinAggregateInputType
    _max?: UserAchievementMaxAggregateInputType
  }

  export type UserAchievementGroupByOutputType = {
    id: string
    userAddress: string
    achievementId: string
    unlockedAt: Date
    _count: UserAchievementCountAggregateOutputType | null
    _min: UserAchievementMinAggregateOutputType | null
    _max: UserAchievementMaxAggregateOutputType | null
  }

  type GetUserAchievementGroupByPayload<T extends UserAchievementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserAchievementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserAchievementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserAchievementGroupByOutputType[P]>
            : GetScalarType<T[P], UserAchievementGroupByOutputType[P]>
        }
      >
    >


  export type UserAchievementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userAddress?: boolean
    achievementId?: boolean
    unlockedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    achievement?: boolean | AchievementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAchievement"]>

  export type UserAchievementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userAddress?: boolean
    achievementId?: boolean
    unlockedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    achievement?: boolean | AchievementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAchievement"]>

  export type UserAchievementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userAddress?: boolean
    achievementId?: boolean
    unlockedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    achievement?: boolean | AchievementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAchievement"]>

  export type UserAchievementSelectScalar = {
    id?: boolean
    userAddress?: boolean
    achievementId?: boolean
    unlockedAt?: boolean
  }

  export type UserAchievementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userAddress" | "achievementId" | "unlockedAt", ExtArgs["result"]["userAchievement"]>
  export type UserAchievementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    achievement?: boolean | AchievementDefaultArgs<ExtArgs>
  }
  export type UserAchievementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    achievement?: boolean | AchievementDefaultArgs<ExtArgs>
  }
  export type UserAchievementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    achievement?: boolean | AchievementDefaultArgs<ExtArgs>
  }

  export type $UserAchievementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserAchievement"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      achievement: Prisma.$AchievementPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userAddress: string
      achievementId: string
      unlockedAt: Date
    }, ExtArgs["result"]["userAchievement"]>
    composites: {}
  }

  type UserAchievementGetPayload<S extends boolean | null | undefined | UserAchievementDefaultArgs> = $Result.GetResult<Prisma.$UserAchievementPayload, S>

  type UserAchievementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserAchievementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserAchievementCountAggregateInputType | true
    }

  export interface UserAchievementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserAchievement'], meta: { name: 'UserAchievement' } }
    /**
     * Find zero or one UserAchievement that matches the filter.
     * @param {UserAchievementFindUniqueArgs} args - Arguments to find a UserAchievement
     * @example
     * // Get one UserAchievement
     * const userAchievement = await prisma.userAchievement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserAchievementFindUniqueArgs>(args: SelectSubset<T, UserAchievementFindUniqueArgs<ExtArgs>>): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserAchievement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserAchievementFindUniqueOrThrowArgs} args - Arguments to find a UserAchievement
     * @example
     * // Get one UserAchievement
     * const userAchievement = await prisma.userAchievement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserAchievementFindUniqueOrThrowArgs>(args: SelectSubset<T, UserAchievementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserAchievement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementFindFirstArgs} args - Arguments to find a UserAchievement
     * @example
     * // Get one UserAchievement
     * const userAchievement = await prisma.userAchievement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserAchievementFindFirstArgs>(args?: SelectSubset<T, UserAchievementFindFirstArgs<ExtArgs>>): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserAchievement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementFindFirstOrThrowArgs} args - Arguments to find a UserAchievement
     * @example
     * // Get one UserAchievement
     * const userAchievement = await prisma.userAchievement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserAchievementFindFirstOrThrowArgs>(args?: SelectSubset<T, UserAchievementFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserAchievements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserAchievements
     * const userAchievements = await prisma.userAchievement.findMany()
     * 
     * // Get first 10 UserAchievements
     * const userAchievements = await prisma.userAchievement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userAchievementWithIdOnly = await prisma.userAchievement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserAchievementFindManyArgs>(args?: SelectSubset<T, UserAchievementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserAchievement.
     * @param {UserAchievementCreateArgs} args - Arguments to create a UserAchievement.
     * @example
     * // Create one UserAchievement
     * const UserAchievement = await prisma.userAchievement.create({
     *   data: {
     *     // ... data to create a UserAchievement
     *   }
     * })
     * 
     */
    create<T extends UserAchievementCreateArgs>(args: SelectSubset<T, UserAchievementCreateArgs<ExtArgs>>): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserAchievements.
     * @param {UserAchievementCreateManyArgs} args - Arguments to create many UserAchievements.
     * @example
     * // Create many UserAchievements
     * const userAchievement = await prisma.userAchievement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserAchievementCreateManyArgs>(args?: SelectSubset<T, UserAchievementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserAchievements and returns the data saved in the database.
     * @param {UserAchievementCreateManyAndReturnArgs} args - Arguments to create many UserAchievements.
     * @example
     * // Create many UserAchievements
     * const userAchievement = await prisma.userAchievement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserAchievements and only return the `id`
     * const userAchievementWithIdOnly = await prisma.userAchievement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserAchievementCreateManyAndReturnArgs>(args?: SelectSubset<T, UserAchievementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserAchievement.
     * @param {UserAchievementDeleteArgs} args - Arguments to delete one UserAchievement.
     * @example
     * // Delete one UserAchievement
     * const UserAchievement = await prisma.userAchievement.delete({
     *   where: {
     *     // ... filter to delete one UserAchievement
     *   }
     * })
     * 
     */
    delete<T extends UserAchievementDeleteArgs>(args: SelectSubset<T, UserAchievementDeleteArgs<ExtArgs>>): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserAchievement.
     * @param {UserAchievementUpdateArgs} args - Arguments to update one UserAchievement.
     * @example
     * // Update one UserAchievement
     * const userAchievement = await prisma.userAchievement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserAchievementUpdateArgs>(args: SelectSubset<T, UserAchievementUpdateArgs<ExtArgs>>): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserAchievements.
     * @param {UserAchievementDeleteManyArgs} args - Arguments to filter UserAchievements to delete.
     * @example
     * // Delete a few UserAchievements
     * const { count } = await prisma.userAchievement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserAchievementDeleteManyArgs>(args?: SelectSubset<T, UserAchievementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserAchievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserAchievements
     * const userAchievement = await prisma.userAchievement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserAchievementUpdateManyArgs>(args: SelectSubset<T, UserAchievementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserAchievements and returns the data updated in the database.
     * @param {UserAchievementUpdateManyAndReturnArgs} args - Arguments to update many UserAchievements.
     * @example
     * // Update many UserAchievements
     * const userAchievement = await prisma.userAchievement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserAchievements and only return the `id`
     * const userAchievementWithIdOnly = await prisma.userAchievement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserAchievementUpdateManyAndReturnArgs>(args: SelectSubset<T, UserAchievementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserAchievement.
     * @param {UserAchievementUpsertArgs} args - Arguments to update or create a UserAchievement.
     * @example
     * // Update or create a UserAchievement
     * const userAchievement = await prisma.userAchievement.upsert({
     *   create: {
     *     // ... data to create a UserAchievement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserAchievement we want to update
     *   }
     * })
     */
    upsert<T extends UserAchievementUpsertArgs>(args: SelectSubset<T, UserAchievementUpsertArgs<ExtArgs>>): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserAchievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementCountArgs} args - Arguments to filter UserAchievements to count.
     * @example
     * // Count the number of UserAchievements
     * const count = await prisma.userAchievement.count({
     *   where: {
     *     // ... the filter for the UserAchievements we want to count
     *   }
     * })
    **/
    count<T extends UserAchievementCountArgs>(
      args?: Subset<T, UserAchievementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserAchievementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserAchievement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAchievementAggregateArgs>(args: Subset<T, UserAchievementAggregateArgs>): Prisma.PrismaPromise<GetUserAchievementAggregateType<T>>

    /**
     * Group by UserAchievement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserAchievementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserAchievementGroupByArgs['orderBy'] }
        : { orderBy?: UserAchievementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserAchievementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserAchievementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserAchievement model
   */
  readonly fields: UserAchievementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserAchievement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserAchievementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    achievement<T extends AchievementDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AchievementDefaultArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserAchievement model
   */
  interface UserAchievementFieldRefs {
    readonly id: FieldRef<"UserAchievement", 'String'>
    readonly userAddress: FieldRef<"UserAchievement", 'String'>
    readonly achievementId: FieldRef<"UserAchievement", 'String'>
    readonly unlockedAt: FieldRef<"UserAchievement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserAchievement findUnique
   */
  export type UserAchievementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * Filter, which UserAchievement to fetch.
     */
    where: UserAchievementWhereUniqueInput
  }

  /**
   * UserAchievement findUniqueOrThrow
   */
  export type UserAchievementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * Filter, which UserAchievement to fetch.
     */
    where: UserAchievementWhereUniqueInput
  }

  /**
   * UserAchievement findFirst
   */
  export type UserAchievementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * Filter, which UserAchievement to fetch.
     */
    where?: UserAchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAchievements to fetch.
     */
    orderBy?: UserAchievementOrderByWithRelationInput | UserAchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAchievements.
     */
    cursor?: UserAchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAchievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAchievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAchievements.
     */
    distinct?: UserAchievementScalarFieldEnum | UserAchievementScalarFieldEnum[]
  }

  /**
   * UserAchievement findFirstOrThrow
   */
  export type UserAchievementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * Filter, which UserAchievement to fetch.
     */
    where?: UserAchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAchievements to fetch.
     */
    orderBy?: UserAchievementOrderByWithRelationInput | UserAchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAchievements.
     */
    cursor?: UserAchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAchievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAchievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAchievements.
     */
    distinct?: UserAchievementScalarFieldEnum | UserAchievementScalarFieldEnum[]
  }

  /**
   * UserAchievement findMany
   */
  export type UserAchievementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * Filter, which UserAchievements to fetch.
     */
    where?: UserAchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAchievements to fetch.
     */
    orderBy?: UserAchievementOrderByWithRelationInput | UserAchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserAchievements.
     */
    cursor?: UserAchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAchievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAchievements.
     */
    skip?: number
    distinct?: UserAchievementScalarFieldEnum | UserAchievementScalarFieldEnum[]
  }

  /**
   * UserAchievement create
   */
  export type UserAchievementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * The data needed to create a UserAchievement.
     */
    data: XOR<UserAchievementCreateInput, UserAchievementUncheckedCreateInput>
  }

  /**
   * UserAchievement createMany
   */
  export type UserAchievementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserAchievements.
     */
    data: UserAchievementCreateManyInput | UserAchievementCreateManyInput[]
  }

  /**
   * UserAchievement createManyAndReturn
   */
  export type UserAchievementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null
    /**
     * The data used to create many UserAchievements.
     */
    data: UserAchievementCreateManyInput | UserAchievementCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserAchievement update
   */
  export type UserAchievementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * The data needed to update a UserAchievement.
     */
    data: XOR<UserAchievementUpdateInput, UserAchievementUncheckedUpdateInput>
    /**
     * Choose, which UserAchievement to update.
     */
    where: UserAchievementWhereUniqueInput
  }

  /**
   * UserAchievement updateMany
   */
  export type UserAchievementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserAchievements.
     */
    data: XOR<UserAchievementUpdateManyMutationInput, UserAchievementUncheckedUpdateManyInput>
    /**
     * Filter which UserAchievements to update
     */
    where?: UserAchievementWhereInput
    /**
     * Limit how many UserAchievements to update.
     */
    limit?: number
  }

  /**
   * UserAchievement updateManyAndReturn
   */
  export type UserAchievementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null
    /**
     * The data used to update UserAchievements.
     */
    data: XOR<UserAchievementUpdateManyMutationInput, UserAchievementUncheckedUpdateManyInput>
    /**
     * Filter which UserAchievements to update
     */
    where?: UserAchievementWhereInput
    /**
     * Limit how many UserAchievements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserAchievement upsert
   */
  export type UserAchievementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * The filter to search for the UserAchievement to update in case it exists.
     */
    where: UserAchievementWhereUniqueInput
    /**
     * In case the UserAchievement found by the `where` argument doesn't exist, create a new UserAchievement with this data.
     */
    create: XOR<UserAchievementCreateInput, UserAchievementUncheckedCreateInput>
    /**
     * In case the UserAchievement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserAchievementUpdateInput, UserAchievementUncheckedUpdateInput>
  }

  /**
   * UserAchievement delete
   */
  export type UserAchievementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * Filter which UserAchievement to delete.
     */
    where: UserAchievementWhereUniqueInput
  }

  /**
   * UserAchievement deleteMany
   */
  export type UserAchievementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAchievements to delete
     */
    where?: UserAchievementWhereInput
    /**
     * Limit how many UserAchievements to delete.
     */
    limit?: number
  }

  /**
   * UserAchievement without action
   */
  export type UserAchievementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAchievement
     */
    omit?: UserAchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
  }


  /**
   * Model AntiManipulationLog
   */

  export type AggregateAntiManipulationLog = {
    _count: AntiManipulationLogCountAggregateOutputType | null
    _avg: AntiManipulationLogAvgAggregateOutputType | null
    _sum: AntiManipulationLogSumAggregateOutputType | null
    _min: AntiManipulationLogMinAggregateOutputType | null
    _max: AntiManipulationLogMaxAggregateOutputType | null
  }

  export type AntiManipulationLogAvgAggregateOutputType = {
    riskScore: number | null
  }

  export type AntiManipulationLogSumAggregateOutputType = {
    riskScore: number | null
  }

  export type AntiManipulationLogMinAggregateOutputType = {
    id: string | null
    userAddress: string | null
    activityType: string | null
    riskScore: number | null
    flags: string | null
    details: string | null
    isResolved: boolean | null
    resolvedAt: Date | null
    resolvedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AntiManipulationLogMaxAggregateOutputType = {
    id: string | null
    userAddress: string | null
    activityType: string | null
    riskScore: number | null
    flags: string | null
    details: string | null
    isResolved: boolean | null
    resolvedAt: Date | null
    resolvedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AntiManipulationLogCountAggregateOutputType = {
    id: number
    userAddress: number
    activityType: number
    riskScore: number
    flags: number
    details: number
    isResolved: number
    resolvedAt: number
    resolvedBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AntiManipulationLogAvgAggregateInputType = {
    riskScore?: true
  }

  export type AntiManipulationLogSumAggregateInputType = {
    riskScore?: true
  }

  export type AntiManipulationLogMinAggregateInputType = {
    id?: true
    userAddress?: true
    activityType?: true
    riskScore?: true
    flags?: true
    details?: true
    isResolved?: true
    resolvedAt?: true
    resolvedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AntiManipulationLogMaxAggregateInputType = {
    id?: true
    userAddress?: true
    activityType?: true
    riskScore?: true
    flags?: true
    details?: true
    isResolved?: true
    resolvedAt?: true
    resolvedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AntiManipulationLogCountAggregateInputType = {
    id?: true
    userAddress?: true
    activityType?: true
    riskScore?: true
    flags?: true
    details?: true
    isResolved?: true
    resolvedAt?: true
    resolvedBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AntiManipulationLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AntiManipulationLog to aggregate.
     */
    where?: AntiManipulationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AntiManipulationLogs to fetch.
     */
    orderBy?: AntiManipulationLogOrderByWithRelationInput | AntiManipulationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AntiManipulationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AntiManipulationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AntiManipulationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AntiManipulationLogs
    **/
    _count?: true | AntiManipulationLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AntiManipulationLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AntiManipulationLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AntiManipulationLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AntiManipulationLogMaxAggregateInputType
  }

  export type GetAntiManipulationLogAggregateType<T extends AntiManipulationLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAntiManipulationLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAntiManipulationLog[P]>
      : GetScalarType<T[P], AggregateAntiManipulationLog[P]>
  }




  export type AntiManipulationLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AntiManipulationLogWhereInput
    orderBy?: AntiManipulationLogOrderByWithAggregationInput | AntiManipulationLogOrderByWithAggregationInput[]
    by: AntiManipulationLogScalarFieldEnum[] | AntiManipulationLogScalarFieldEnum
    having?: AntiManipulationLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AntiManipulationLogCountAggregateInputType | true
    _avg?: AntiManipulationLogAvgAggregateInputType
    _sum?: AntiManipulationLogSumAggregateInputType
    _min?: AntiManipulationLogMinAggregateInputType
    _max?: AntiManipulationLogMaxAggregateInputType
  }

  export type AntiManipulationLogGroupByOutputType = {
    id: string
    userAddress: string
    activityType: string
    riskScore: number
    flags: string
    details: string | null
    isResolved: boolean
    resolvedAt: Date | null
    resolvedBy: string | null
    createdAt: Date
    updatedAt: Date
    _count: AntiManipulationLogCountAggregateOutputType | null
    _avg: AntiManipulationLogAvgAggregateOutputType | null
    _sum: AntiManipulationLogSumAggregateOutputType | null
    _min: AntiManipulationLogMinAggregateOutputType | null
    _max: AntiManipulationLogMaxAggregateOutputType | null
  }

  type GetAntiManipulationLogGroupByPayload<T extends AntiManipulationLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AntiManipulationLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AntiManipulationLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AntiManipulationLogGroupByOutputType[P]>
            : GetScalarType<T[P], AntiManipulationLogGroupByOutputType[P]>
        }
      >
    >


  export type AntiManipulationLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userAddress?: boolean
    activityType?: boolean
    riskScore?: boolean
    flags?: boolean
    details?: boolean
    isResolved?: boolean
    resolvedAt?: boolean
    resolvedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["antiManipulationLog"]>

  export type AntiManipulationLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userAddress?: boolean
    activityType?: boolean
    riskScore?: boolean
    flags?: boolean
    details?: boolean
    isResolved?: boolean
    resolvedAt?: boolean
    resolvedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["antiManipulationLog"]>

  export type AntiManipulationLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userAddress?: boolean
    activityType?: boolean
    riskScore?: boolean
    flags?: boolean
    details?: boolean
    isResolved?: boolean
    resolvedAt?: boolean
    resolvedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["antiManipulationLog"]>

  export type AntiManipulationLogSelectScalar = {
    id?: boolean
    userAddress?: boolean
    activityType?: boolean
    riskScore?: boolean
    flags?: boolean
    details?: boolean
    isResolved?: boolean
    resolvedAt?: boolean
    resolvedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AntiManipulationLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userAddress" | "activityType" | "riskScore" | "flags" | "details" | "isResolved" | "resolvedAt" | "resolvedBy" | "createdAt" | "updatedAt", ExtArgs["result"]["antiManipulationLog"]>
  export type AntiManipulationLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AntiManipulationLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AntiManipulationLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AntiManipulationLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AntiManipulationLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userAddress: string
      activityType: string
      riskScore: number
      flags: string
      details: string | null
      isResolved: boolean
      resolvedAt: Date | null
      resolvedBy: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["antiManipulationLog"]>
    composites: {}
  }

  type AntiManipulationLogGetPayload<S extends boolean | null | undefined | AntiManipulationLogDefaultArgs> = $Result.GetResult<Prisma.$AntiManipulationLogPayload, S>

  type AntiManipulationLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AntiManipulationLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AntiManipulationLogCountAggregateInputType | true
    }

  export interface AntiManipulationLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AntiManipulationLog'], meta: { name: 'AntiManipulationLog' } }
    /**
     * Find zero or one AntiManipulationLog that matches the filter.
     * @param {AntiManipulationLogFindUniqueArgs} args - Arguments to find a AntiManipulationLog
     * @example
     * // Get one AntiManipulationLog
     * const antiManipulationLog = await prisma.antiManipulationLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AntiManipulationLogFindUniqueArgs>(args: SelectSubset<T, AntiManipulationLogFindUniqueArgs<ExtArgs>>): Prisma__AntiManipulationLogClient<$Result.GetResult<Prisma.$AntiManipulationLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AntiManipulationLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AntiManipulationLogFindUniqueOrThrowArgs} args - Arguments to find a AntiManipulationLog
     * @example
     * // Get one AntiManipulationLog
     * const antiManipulationLog = await prisma.antiManipulationLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AntiManipulationLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AntiManipulationLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AntiManipulationLogClient<$Result.GetResult<Prisma.$AntiManipulationLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AntiManipulationLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AntiManipulationLogFindFirstArgs} args - Arguments to find a AntiManipulationLog
     * @example
     * // Get one AntiManipulationLog
     * const antiManipulationLog = await prisma.antiManipulationLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AntiManipulationLogFindFirstArgs>(args?: SelectSubset<T, AntiManipulationLogFindFirstArgs<ExtArgs>>): Prisma__AntiManipulationLogClient<$Result.GetResult<Prisma.$AntiManipulationLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AntiManipulationLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AntiManipulationLogFindFirstOrThrowArgs} args - Arguments to find a AntiManipulationLog
     * @example
     * // Get one AntiManipulationLog
     * const antiManipulationLog = await prisma.antiManipulationLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AntiManipulationLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AntiManipulationLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AntiManipulationLogClient<$Result.GetResult<Prisma.$AntiManipulationLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AntiManipulationLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AntiManipulationLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AntiManipulationLogs
     * const antiManipulationLogs = await prisma.antiManipulationLog.findMany()
     * 
     * // Get first 10 AntiManipulationLogs
     * const antiManipulationLogs = await prisma.antiManipulationLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const antiManipulationLogWithIdOnly = await prisma.antiManipulationLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AntiManipulationLogFindManyArgs>(args?: SelectSubset<T, AntiManipulationLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AntiManipulationLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AntiManipulationLog.
     * @param {AntiManipulationLogCreateArgs} args - Arguments to create a AntiManipulationLog.
     * @example
     * // Create one AntiManipulationLog
     * const AntiManipulationLog = await prisma.antiManipulationLog.create({
     *   data: {
     *     // ... data to create a AntiManipulationLog
     *   }
     * })
     * 
     */
    create<T extends AntiManipulationLogCreateArgs>(args: SelectSubset<T, AntiManipulationLogCreateArgs<ExtArgs>>): Prisma__AntiManipulationLogClient<$Result.GetResult<Prisma.$AntiManipulationLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AntiManipulationLogs.
     * @param {AntiManipulationLogCreateManyArgs} args - Arguments to create many AntiManipulationLogs.
     * @example
     * // Create many AntiManipulationLogs
     * const antiManipulationLog = await prisma.antiManipulationLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AntiManipulationLogCreateManyArgs>(args?: SelectSubset<T, AntiManipulationLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AntiManipulationLogs and returns the data saved in the database.
     * @param {AntiManipulationLogCreateManyAndReturnArgs} args - Arguments to create many AntiManipulationLogs.
     * @example
     * // Create many AntiManipulationLogs
     * const antiManipulationLog = await prisma.antiManipulationLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AntiManipulationLogs and only return the `id`
     * const antiManipulationLogWithIdOnly = await prisma.antiManipulationLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AntiManipulationLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AntiManipulationLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AntiManipulationLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AntiManipulationLog.
     * @param {AntiManipulationLogDeleteArgs} args - Arguments to delete one AntiManipulationLog.
     * @example
     * // Delete one AntiManipulationLog
     * const AntiManipulationLog = await prisma.antiManipulationLog.delete({
     *   where: {
     *     // ... filter to delete one AntiManipulationLog
     *   }
     * })
     * 
     */
    delete<T extends AntiManipulationLogDeleteArgs>(args: SelectSubset<T, AntiManipulationLogDeleteArgs<ExtArgs>>): Prisma__AntiManipulationLogClient<$Result.GetResult<Prisma.$AntiManipulationLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AntiManipulationLog.
     * @param {AntiManipulationLogUpdateArgs} args - Arguments to update one AntiManipulationLog.
     * @example
     * // Update one AntiManipulationLog
     * const antiManipulationLog = await prisma.antiManipulationLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AntiManipulationLogUpdateArgs>(args: SelectSubset<T, AntiManipulationLogUpdateArgs<ExtArgs>>): Prisma__AntiManipulationLogClient<$Result.GetResult<Prisma.$AntiManipulationLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AntiManipulationLogs.
     * @param {AntiManipulationLogDeleteManyArgs} args - Arguments to filter AntiManipulationLogs to delete.
     * @example
     * // Delete a few AntiManipulationLogs
     * const { count } = await prisma.antiManipulationLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AntiManipulationLogDeleteManyArgs>(args?: SelectSubset<T, AntiManipulationLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AntiManipulationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AntiManipulationLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AntiManipulationLogs
     * const antiManipulationLog = await prisma.antiManipulationLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AntiManipulationLogUpdateManyArgs>(args: SelectSubset<T, AntiManipulationLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AntiManipulationLogs and returns the data updated in the database.
     * @param {AntiManipulationLogUpdateManyAndReturnArgs} args - Arguments to update many AntiManipulationLogs.
     * @example
     * // Update many AntiManipulationLogs
     * const antiManipulationLog = await prisma.antiManipulationLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AntiManipulationLogs and only return the `id`
     * const antiManipulationLogWithIdOnly = await prisma.antiManipulationLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AntiManipulationLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AntiManipulationLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AntiManipulationLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AntiManipulationLog.
     * @param {AntiManipulationLogUpsertArgs} args - Arguments to update or create a AntiManipulationLog.
     * @example
     * // Update or create a AntiManipulationLog
     * const antiManipulationLog = await prisma.antiManipulationLog.upsert({
     *   create: {
     *     // ... data to create a AntiManipulationLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AntiManipulationLog we want to update
     *   }
     * })
     */
    upsert<T extends AntiManipulationLogUpsertArgs>(args: SelectSubset<T, AntiManipulationLogUpsertArgs<ExtArgs>>): Prisma__AntiManipulationLogClient<$Result.GetResult<Prisma.$AntiManipulationLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AntiManipulationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AntiManipulationLogCountArgs} args - Arguments to filter AntiManipulationLogs to count.
     * @example
     * // Count the number of AntiManipulationLogs
     * const count = await prisma.antiManipulationLog.count({
     *   where: {
     *     // ... the filter for the AntiManipulationLogs we want to count
     *   }
     * })
    **/
    count<T extends AntiManipulationLogCountArgs>(
      args?: Subset<T, AntiManipulationLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AntiManipulationLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AntiManipulationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AntiManipulationLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AntiManipulationLogAggregateArgs>(args: Subset<T, AntiManipulationLogAggregateArgs>): Prisma.PrismaPromise<GetAntiManipulationLogAggregateType<T>>

    /**
     * Group by AntiManipulationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AntiManipulationLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AntiManipulationLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AntiManipulationLogGroupByArgs['orderBy'] }
        : { orderBy?: AntiManipulationLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AntiManipulationLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAntiManipulationLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AntiManipulationLog model
   */
  readonly fields: AntiManipulationLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AntiManipulationLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AntiManipulationLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AntiManipulationLog model
   */
  interface AntiManipulationLogFieldRefs {
    readonly id: FieldRef<"AntiManipulationLog", 'String'>
    readonly userAddress: FieldRef<"AntiManipulationLog", 'String'>
    readonly activityType: FieldRef<"AntiManipulationLog", 'String'>
    readonly riskScore: FieldRef<"AntiManipulationLog", 'Float'>
    readonly flags: FieldRef<"AntiManipulationLog", 'String'>
    readonly details: FieldRef<"AntiManipulationLog", 'String'>
    readonly isResolved: FieldRef<"AntiManipulationLog", 'Boolean'>
    readonly resolvedAt: FieldRef<"AntiManipulationLog", 'DateTime'>
    readonly resolvedBy: FieldRef<"AntiManipulationLog", 'String'>
    readonly createdAt: FieldRef<"AntiManipulationLog", 'DateTime'>
    readonly updatedAt: FieldRef<"AntiManipulationLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AntiManipulationLog findUnique
   */
  export type AntiManipulationLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AntiManipulationLog
     */
    select?: AntiManipulationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AntiManipulationLog
     */
    omit?: AntiManipulationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AntiManipulationLogInclude<ExtArgs> | null
    /**
     * Filter, which AntiManipulationLog to fetch.
     */
    where: AntiManipulationLogWhereUniqueInput
  }

  /**
   * AntiManipulationLog findUniqueOrThrow
   */
  export type AntiManipulationLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AntiManipulationLog
     */
    select?: AntiManipulationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AntiManipulationLog
     */
    omit?: AntiManipulationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AntiManipulationLogInclude<ExtArgs> | null
    /**
     * Filter, which AntiManipulationLog to fetch.
     */
    where: AntiManipulationLogWhereUniqueInput
  }

  /**
   * AntiManipulationLog findFirst
   */
  export type AntiManipulationLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AntiManipulationLog
     */
    select?: AntiManipulationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AntiManipulationLog
     */
    omit?: AntiManipulationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AntiManipulationLogInclude<ExtArgs> | null
    /**
     * Filter, which AntiManipulationLog to fetch.
     */
    where?: AntiManipulationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AntiManipulationLogs to fetch.
     */
    orderBy?: AntiManipulationLogOrderByWithRelationInput | AntiManipulationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AntiManipulationLogs.
     */
    cursor?: AntiManipulationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AntiManipulationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AntiManipulationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AntiManipulationLogs.
     */
    distinct?: AntiManipulationLogScalarFieldEnum | AntiManipulationLogScalarFieldEnum[]
  }

  /**
   * AntiManipulationLog findFirstOrThrow
   */
  export type AntiManipulationLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AntiManipulationLog
     */
    select?: AntiManipulationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AntiManipulationLog
     */
    omit?: AntiManipulationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AntiManipulationLogInclude<ExtArgs> | null
    /**
     * Filter, which AntiManipulationLog to fetch.
     */
    where?: AntiManipulationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AntiManipulationLogs to fetch.
     */
    orderBy?: AntiManipulationLogOrderByWithRelationInput | AntiManipulationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AntiManipulationLogs.
     */
    cursor?: AntiManipulationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AntiManipulationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AntiManipulationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AntiManipulationLogs.
     */
    distinct?: AntiManipulationLogScalarFieldEnum | AntiManipulationLogScalarFieldEnum[]
  }

  /**
   * AntiManipulationLog findMany
   */
  export type AntiManipulationLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AntiManipulationLog
     */
    select?: AntiManipulationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AntiManipulationLog
     */
    omit?: AntiManipulationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AntiManipulationLogInclude<ExtArgs> | null
    /**
     * Filter, which AntiManipulationLogs to fetch.
     */
    where?: AntiManipulationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AntiManipulationLogs to fetch.
     */
    orderBy?: AntiManipulationLogOrderByWithRelationInput | AntiManipulationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AntiManipulationLogs.
     */
    cursor?: AntiManipulationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AntiManipulationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AntiManipulationLogs.
     */
    skip?: number
    distinct?: AntiManipulationLogScalarFieldEnum | AntiManipulationLogScalarFieldEnum[]
  }

  /**
   * AntiManipulationLog create
   */
  export type AntiManipulationLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AntiManipulationLog
     */
    select?: AntiManipulationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AntiManipulationLog
     */
    omit?: AntiManipulationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AntiManipulationLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AntiManipulationLog.
     */
    data: XOR<AntiManipulationLogCreateInput, AntiManipulationLogUncheckedCreateInput>
  }

  /**
   * AntiManipulationLog createMany
   */
  export type AntiManipulationLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AntiManipulationLogs.
     */
    data: AntiManipulationLogCreateManyInput | AntiManipulationLogCreateManyInput[]
  }

  /**
   * AntiManipulationLog createManyAndReturn
   */
  export type AntiManipulationLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AntiManipulationLog
     */
    select?: AntiManipulationLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AntiManipulationLog
     */
    omit?: AntiManipulationLogOmit<ExtArgs> | null
    /**
     * The data used to create many AntiManipulationLogs.
     */
    data: AntiManipulationLogCreateManyInput | AntiManipulationLogCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AntiManipulationLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AntiManipulationLog update
   */
  export type AntiManipulationLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AntiManipulationLog
     */
    select?: AntiManipulationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AntiManipulationLog
     */
    omit?: AntiManipulationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AntiManipulationLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AntiManipulationLog.
     */
    data: XOR<AntiManipulationLogUpdateInput, AntiManipulationLogUncheckedUpdateInput>
    /**
     * Choose, which AntiManipulationLog to update.
     */
    where: AntiManipulationLogWhereUniqueInput
  }

  /**
   * AntiManipulationLog updateMany
   */
  export type AntiManipulationLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AntiManipulationLogs.
     */
    data: XOR<AntiManipulationLogUpdateManyMutationInput, AntiManipulationLogUncheckedUpdateManyInput>
    /**
     * Filter which AntiManipulationLogs to update
     */
    where?: AntiManipulationLogWhereInput
    /**
     * Limit how many AntiManipulationLogs to update.
     */
    limit?: number
  }

  /**
   * AntiManipulationLog updateManyAndReturn
   */
  export type AntiManipulationLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AntiManipulationLog
     */
    select?: AntiManipulationLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AntiManipulationLog
     */
    omit?: AntiManipulationLogOmit<ExtArgs> | null
    /**
     * The data used to update AntiManipulationLogs.
     */
    data: XOR<AntiManipulationLogUpdateManyMutationInput, AntiManipulationLogUncheckedUpdateManyInput>
    /**
     * Filter which AntiManipulationLogs to update
     */
    where?: AntiManipulationLogWhereInput
    /**
     * Limit how many AntiManipulationLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AntiManipulationLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AntiManipulationLog upsert
   */
  export type AntiManipulationLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AntiManipulationLog
     */
    select?: AntiManipulationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AntiManipulationLog
     */
    omit?: AntiManipulationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AntiManipulationLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AntiManipulationLog to update in case it exists.
     */
    where: AntiManipulationLogWhereUniqueInput
    /**
     * In case the AntiManipulationLog found by the `where` argument doesn't exist, create a new AntiManipulationLog with this data.
     */
    create: XOR<AntiManipulationLogCreateInput, AntiManipulationLogUncheckedCreateInput>
    /**
     * In case the AntiManipulationLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AntiManipulationLogUpdateInput, AntiManipulationLogUncheckedUpdateInput>
  }

  /**
   * AntiManipulationLog delete
   */
  export type AntiManipulationLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AntiManipulationLog
     */
    select?: AntiManipulationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AntiManipulationLog
     */
    omit?: AntiManipulationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AntiManipulationLogInclude<ExtArgs> | null
    /**
     * Filter which AntiManipulationLog to delete.
     */
    where: AntiManipulationLogWhereUniqueInput
  }

  /**
   * AntiManipulationLog deleteMany
   */
  export type AntiManipulationLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AntiManipulationLogs to delete
     */
    where?: AntiManipulationLogWhereInput
    /**
     * Limit how many AntiManipulationLogs to delete.
     */
    limit?: number
  }

  /**
   * AntiManipulationLog without action
   */
  export type AntiManipulationLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AntiManipulationLog
     */
    select?: AntiManipulationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AntiManipulationLog
     */
    omit?: AntiManipulationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AntiManipulationLogInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    userAddress: string | null
    sessionToken: string | null
    expiresAt: Date | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    userAddress: string | null
    sessionToken: string | null
    expiresAt: Date | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    userAddress: number
    sessionToken: number
    expiresAt: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    userAddress?: true
    sessionToken?: true
    expiresAt?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    userAddress?: true
    sessionToken?: true
    expiresAt?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    userAddress?: true
    sessionToken?: true
    expiresAt?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    userAddress: string
    sessionToken: string
    expiresAt: Date
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userAddress?: boolean
    sessionToken?: boolean
    expiresAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userAddress?: boolean
    sessionToken?: boolean
    expiresAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userAddress?: boolean
    sessionToken?: boolean
    expiresAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    userAddress?: boolean
    sessionToken?: boolean
    expiresAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userAddress" | "sessionToken" | "expiresAt" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["session"]>

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userAddress: string
      sessionToken: string
      expiresAt: Date
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly userAddress: FieldRef<"Session", 'String'>
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly isActive: FieldRef<"Session", 'Boolean'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    walletAddress: 'walletAddress',
    worldIdHash: 'worldIdHash',
    verificationLevel: 'verificationLevel',
    reputationScore: 'reputationScore',
    reputationLevel: 'reputationLevel',
    totalTrades: 'totalTrades',
    totalVolume: 'totalVolume',
    lastActivity: 'lastActivity',
    isBanned: 'isBanned',
    riskScore: 'riskScore',
    allocationCap: 'allocationCap',
    usedAllocation: 'usedAllocation',
    marketCap: 'marketCap',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TokenScalarFieldEnum: {
    address: 'address',
    name: 'name',
    symbol: 'symbol',
    description: 'description',
    imageUrl: 'imageUrl',
    creatorAddress: 'creatorAddress',
    initialPrice: 'initialPrice',
    priceIncrement: 'priceIncrement',
    maxSupply: 'maxSupply',
    currentSupply: 'currentSupply',
    currentPrice: 'currentPrice',
    totalVolume: 'totalVolume',
    totalTrades: 'totalTrades',
    marketCap: 'marketCap',
    status: 'status',
    launchDate: 'launchDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TokenScalarFieldEnum = (typeof TokenScalarFieldEnum)[keyof typeof TokenScalarFieldEnum]


  export const TradeScalarFieldEnum: {
    id: 'id',
    userAddress: 'userAddress',
    tokenAddress: 'tokenAddress',
    type: 'type',
    amount: 'amount',
    price: 'price',
    totalValue: 'totalValue',
    blockNumber: 'blockNumber',
    transactionHash: 'transactionHash',
    riskScore: 'riskScore',
    isSuspicious: 'isSuspicious',
    manipulationFlags: 'manipulationFlags',
    createdAt: 'createdAt'
  };

  export type TradeScalarFieldEnum = (typeof TradeScalarFieldEnum)[keyof typeof TradeScalarFieldEnum]


  export const ReputationQuestScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    type: 'type',
    targetValue: 'targetValue',
    reward: 'reward',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ReputationQuestScalarFieldEnum = (typeof ReputationQuestScalarFieldEnum)[keyof typeof ReputationQuestScalarFieldEnum]


  export const UserReputationQuestScalarFieldEnum: {
    id: 'id',
    userAddress: 'userAddress',
    questId: 'questId',
    progress: 'progress',
    isCompleted: 'isCompleted',
    completedAt: 'completedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserReputationQuestScalarFieldEnum = (typeof UserReputationQuestScalarFieldEnum)[keyof typeof UserReputationQuestScalarFieldEnum]


  export const AchievementScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    icon: 'icon',
    rarity: 'rarity',
    requirements: 'requirements',
    reward: 'reward',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AchievementScalarFieldEnum = (typeof AchievementScalarFieldEnum)[keyof typeof AchievementScalarFieldEnum]


  export const UserAchievementScalarFieldEnum: {
    id: 'id',
    userAddress: 'userAddress',
    achievementId: 'achievementId',
    unlockedAt: 'unlockedAt'
  };

  export type UserAchievementScalarFieldEnum = (typeof UserAchievementScalarFieldEnum)[keyof typeof UserAchievementScalarFieldEnum]


  export const AntiManipulationLogScalarFieldEnum: {
    id: 'id',
    userAddress: 'userAddress',
    activityType: 'activityType',
    riskScore: 'riskScore',
    flags: 'flags',
    details: 'details',
    isResolved: 'isResolved',
    resolvedAt: 'resolvedAt',
    resolvedBy: 'resolvedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AntiManipulationLogScalarFieldEnum = (typeof AntiManipulationLogScalarFieldEnum)[keyof typeof AntiManipulationLogScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    userAddress: 'userAddress',
    sessionToken: 'sessionToken',
    expiresAt: 'expiresAt',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    walletAddress?: StringFilter<"User"> | string
    worldIdHash?: StringNullableFilter<"User"> | string | null
    verificationLevel?: StringFilter<"User"> | string
    reputationScore?: IntFilter<"User"> | number
    reputationLevel?: StringFilter<"User"> | string
    totalTrades?: IntFilter<"User"> | number
    totalVolume?: FloatFilter<"User"> | number
    lastActivity?: DateTimeFilter<"User"> | Date | string
    isBanned?: BoolFilter<"User"> | boolean
    riskScore?: FloatFilter<"User"> | number
    allocationCap?: FloatFilter<"User"> | number
    usedAllocation?: FloatFilter<"User"> | number
    marketCap?: FloatNullableFilter<"User"> | number | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    trades?: TradeListRelationFilter
    createdTokens?: TokenListRelationFilter
    reputationQuests?: UserReputationQuestListRelationFilter
    achievements?: UserAchievementListRelationFilter
    antiManipulationLogs?: AntiManipulationLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    walletAddress?: SortOrder
    worldIdHash?: SortOrderInput | SortOrder
    verificationLevel?: SortOrder
    reputationScore?: SortOrder
    reputationLevel?: SortOrder
    totalTrades?: SortOrder
    totalVolume?: SortOrder
    lastActivity?: SortOrder
    isBanned?: SortOrder
    riskScore?: SortOrder
    allocationCap?: SortOrder
    usedAllocation?: SortOrder
    marketCap?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trades?: TradeOrderByRelationAggregateInput
    createdTokens?: TokenOrderByRelationAggregateInput
    reputationQuests?: UserReputationQuestOrderByRelationAggregateInput
    achievements?: UserAchievementOrderByRelationAggregateInput
    antiManipulationLogs?: AntiManipulationLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    walletAddress?: string
    worldIdHash?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    verificationLevel?: StringFilter<"User"> | string
    reputationScore?: IntFilter<"User"> | number
    reputationLevel?: StringFilter<"User"> | string
    totalTrades?: IntFilter<"User"> | number
    totalVolume?: FloatFilter<"User"> | number
    lastActivity?: DateTimeFilter<"User"> | Date | string
    isBanned?: BoolFilter<"User"> | boolean
    riskScore?: FloatFilter<"User"> | number
    allocationCap?: FloatFilter<"User"> | number
    usedAllocation?: FloatFilter<"User"> | number
    marketCap?: FloatNullableFilter<"User"> | number | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    trades?: TradeListRelationFilter
    createdTokens?: TokenListRelationFilter
    reputationQuests?: UserReputationQuestListRelationFilter
    achievements?: UserAchievementListRelationFilter
    antiManipulationLogs?: AntiManipulationLogListRelationFilter
  }, "walletAddress" | "walletAddress" | "worldIdHash">

  export type UserOrderByWithAggregationInput = {
    walletAddress?: SortOrder
    worldIdHash?: SortOrderInput | SortOrder
    verificationLevel?: SortOrder
    reputationScore?: SortOrder
    reputationLevel?: SortOrder
    totalTrades?: SortOrder
    totalVolume?: SortOrder
    lastActivity?: SortOrder
    isBanned?: SortOrder
    riskScore?: SortOrder
    allocationCap?: SortOrder
    usedAllocation?: SortOrder
    marketCap?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    walletAddress?: StringWithAggregatesFilter<"User"> | string
    worldIdHash?: StringNullableWithAggregatesFilter<"User"> | string | null
    verificationLevel?: StringWithAggregatesFilter<"User"> | string
    reputationScore?: IntWithAggregatesFilter<"User"> | number
    reputationLevel?: StringWithAggregatesFilter<"User"> | string
    totalTrades?: IntWithAggregatesFilter<"User"> | number
    totalVolume?: FloatWithAggregatesFilter<"User"> | number
    lastActivity?: DateTimeWithAggregatesFilter<"User"> | Date | string
    isBanned?: BoolWithAggregatesFilter<"User"> | boolean
    riskScore?: FloatWithAggregatesFilter<"User"> | number
    allocationCap?: FloatWithAggregatesFilter<"User"> | number
    usedAllocation?: FloatWithAggregatesFilter<"User"> | number
    marketCap?: FloatNullableWithAggregatesFilter<"User"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type TokenWhereInput = {
    AND?: TokenWhereInput | TokenWhereInput[]
    OR?: TokenWhereInput[]
    NOT?: TokenWhereInput | TokenWhereInput[]
    address?: StringFilter<"Token"> | string
    name?: StringFilter<"Token"> | string
    symbol?: StringFilter<"Token"> | string
    description?: StringFilter<"Token"> | string
    imageUrl?: StringNullableFilter<"Token"> | string | null
    creatorAddress?: StringFilter<"Token"> | string
    initialPrice?: FloatFilter<"Token"> | number
    priceIncrement?: FloatFilter<"Token"> | number
    maxSupply?: BigIntFilter<"Token"> | bigint | number
    currentSupply?: BigIntFilter<"Token"> | bigint | number
    currentPrice?: FloatFilter<"Token"> | number
    totalVolume?: FloatFilter<"Token"> | number
    totalTrades?: IntFilter<"Token"> | number
    marketCap?: FloatFilter<"Token"> | number
    status?: StringFilter<"Token"> | string
    launchDate?: DateTimeFilter<"Token"> | Date | string
    createdAt?: DateTimeFilter<"Token"> | Date | string
    updatedAt?: DateTimeFilter<"Token"> | Date | string
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    trades?: TradeListRelationFilter
  }

  export type TokenOrderByWithRelationInput = {
    address?: SortOrder
    name?: SortOrder
    symbol?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    creatorAddress?: SortOrder
    initialPrice?: SortOrder
    priceIncrement?: SortOrder
    maxSupply?: SortOrder
    currentSupply?: SortOrder
    currentPrice?: SortOrder
    totalVolume?: SortOrder
    totalTrades?: SortOrder
    marketCap?: SortOrder
    status?: SortOrder
    launchDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creator?: UserOrderByWithRelationInput
    trades?: TradeOrderByRelationAggregateInput
  }

  export type TokenWhereUniqueInput = Prisma.AtLeast<{
    address?: string
    symbol?: string
    AND?: TokenWhereInput | TokenWhereInput[]
    OR?: TokenWhereInput[]
    NOT?: TokenWhereInput | TokenWhereInput[]
    name?: StringFilter<"Token"> | string
    description?: StringFilter<"Token"> | string
    imageUrl?: StringNullableFilter<"Token"> | string | null
    creatorAddress?: StringFilter<"Token"> | string
    initialPrice?: FloatFilter<"Token"> | number
    priceIncrement?: FloatFilter<"Token"> | number
    maxSupply?: BigIntFilter<"Token"> | bigint | number
    currentSupply?: BigIntFilter<"Token"> | bigint | number
    currentPrice?: FloatFilter<"Token"> | number
    totalVolume?: FloatFilter<"Token"> | number
    totalTrades?: IntFilter<"Token"> | number
    marketCap?: FloatFilter<"Token"> | number
    status?: StringFilter<"Token"> | string
    launchDate?: DateTimeFilter<"Token"> | Date | string
    createdAt?: DateTimeFilter<"Token"> | Date | string
    updatedAt?: DateTimeFilter<"Token"> | Date | string
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    trades?: TradeListRelationFilter
  }, "address" | "address" | "symbol">

  export type TokenOrderByWithAggregationInput = {
    address?: SortOrder
    name?: SortOrder
    symbol?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    creatorAddress?: SortOrder
    initialPrice?: SortOrder
    priceIncrement?: SortOrder
    maxSupply?: SortOrder
    currentSupply?: SortOrder
    currentPrice?: SortOrder
    totalVolume?: SortOrder
    totalTrades?: SortOrder
    marketCap?: SortOrder
    status?: SortOrder
    launchDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TokenCountOrderByAggregateInput
    _avg?: TokenAvgOrderByAggregateInput
    _max?: TokenMaxOrderByAggregateInput
    _min?: TokenMinOrderByAggregateInput
    _sum?: TokenSumOrderByAggregateInput
  }

  export type TokenScalarWhereWithAggregatesInput = {
    AND?: TokenScalarWhereWithAggregatesInput | TokenScalarWhereWithAggregatesInput[]
    OR?: TokenScalarWhereWithAggregatesInput[]
    NOT?: TokenScalarWhereWithAggregatesInput | TokenScalarWhereWithAggregatesInput[]
    address?: StringWithAggregatesFilter<"Token"> | string
    name?: StringWithAggregatesFilter<"Token"> | string
    symbol?: StringWithAggregatesFilter<"Token"> | string
    description?: StringWithAggregatesFilter<"Token"> | string
    imageUrl?: StringNullableWithAggregatesFilter<"Token"> | string | null
    creatorAddress?: StringWithAggregatesFilter<"Token"> | string
    initialPrice?: FloatWithAggregatesFilter<"Token"> | number
    priceIncrement?: FloatWithAggregatesFilter<"Token"> | number
    maxSupply?: BigIntWithAggregatesFilter<"Token"> | bigint | number
    currentSupply?: BigIntWithAggregatesFilter<"Token"> | bigint | number
    currentPrice?: FloatWithAggregatesFilter<"Token"> | number
    totalVolume?: FloatWithAggregatesFilter<"Token"> | number
    totalTrades?: IntWithAggregatesFilter<"Token"> | number
    marketCap?: FloatWithAggregatesFilter<"Token"> | number
    status?: StringWithAggregatesFilter<"Token"> | string
    launchDate?: DateTimeWithAggregatesFilter<"Token"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Token"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Token"> | Date | string
  }

  export type TradeWhereInput = {
    AND?: TradeWhereInput | TradeWhereInput[]
    OR?: TradeWhereInput[]
    NOT?: TradeWhereInput | TradeWhereInput[]
    id?: StringFilter<"Trade"> | string
    userAddress?: StringFilter<"Trade"> | string
    tokenAddress?: StringFilter<"Trade"> | string
    type?: StringFilter<"Trade"> | string
    amount?: FloatFilter<"Trade"> | number
    price?: FloatFilter<"Trade"> | number
    totalValue?: FloatFilter<"Trade"> | number
    blockNumber?: BigIntNullableFilter<"Trade"> | bigint | number | null
    transactionHash?: StringNullableFilter<"Trade"> | string | null
    riskScore?: FloatFilter<"Trade"> | number
    isSuspicious?: BoolFilter<"Trade"> | boolean
    manipulationFlags?: StringNullableFilter<"Trade"> | string | null
    createdAt?: DateTimeFilter<"Trade"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    token?: XOR<TokenScalarRelationFilter, TokenWhereInput>
  }

  export type TradeOrderByWithRelationInput = {
    id?: SortOrder
    userAddress?: SortOrder
    tokenAddress?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    price?: SortOrder
    totalValue?: SortOrder
    blockNumber?: SortOrderInput | SortOrder
    transactionHash?: SortOrderInput | SortOrder
    riskScore?: SortOrder
    isSuspicious?: SortOrder
    manipulationFlags?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    token?: TokenOrderByWithRelationInput
  }

  export type TradeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TradeWhereInput | TradeWhereInput[]
    OR?: TradeWhereInput[]
    NOT?: TradeWhereInput | TradeWhereInput[]
    userAddress?: StringFilter<"Trade"> | string
    tokenAddress?: StringFilter<"Trade"> | string
    type?: StringFilter<"Trade"> | string
    amount?: FloatFilter<"Trade"> | number
    price?: FloatFilter<"Trade"> | number
    totalValue?: FloatFilter<"Trade"> | number
    blockNumber?: BigIntNullableFilter<"Trade"> | bigint | number | null
    transactionHash?: StringNullableFilter<"Trade"> | string | null
    riskScore?: FloatFilter<"Trade"> | number
    isSuspicious?: BoolFilter<"Trade"> | boolean
    manipulationFlags?: StringNullableFilter<"Trade"> | string | null
    createdAt?: DateTimeFilter<"Trade"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    token?: XOR<TokenScalarRelationFilter, TokenWhereInput>
  }, "id">

  export type TradeOrderByWithAggregationInput = {
    id?: SortOrder
    userAddress?: SortOrder
    tokenAddress?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    price?: SortOrder
    totalValue?: SortOrder
    blockNumber?: SortOrderInput | SortOrder
    transactionHash?: SortOrderInput | SortOrder
    riskScore?: SortOrder
    isSuspicious?: SortOrder
    manipulationFlags?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TradeCountOrderByAggregateInput
    _avg?: TradeAvgOrderByAggregateInput
    _max?: TradeMaxOrderByAggregateInput
    _min?: TradeMinOrderByAggregateInput
    _sum?: TradeSumOrderByAggregateInput
  }

  export type TradeScalarWhereWithAggregatesInput = {
    AND?: TradeScalarWhereWithAggregatesInput | TradeScalarWhereWithAggregatesInput[]
    OR?: TradeScalarWhereWithAggregatesInput[]
    NOT?: TradeScalarWhereWithAggregatesInput | TradeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Trade"> | string
    userAddress?: StringWithAggregatesFilter<"Trade"> | string
    tokenAddress?: StringWithAggregatesFilter<"Trade"> | string
    type?: StringWithAggregatesFilter<"Trade"> | string
    amount?: FloatWithAggregatesFilter<"Trade"> | number
    price?: FloatWithAggregatesFilter<"Trade"> | number
    totalValue?: FloatWithAggregatesFilter<"Trade"> | number
    blockNumber?: BigIntNullableWithAggregatesFilter<"Trade"> | bigint | number | null
    transactionHash?: StringNullableWithAggregatesFilter<"Trade"> | string | null
    riskScore?: FloatWithAggregatesFilter<"Trade"> | number
    isSuspicious?: BoolWithAggregatesFilter<"Trade"> | boolean
    manipulationFlags?: StringNullableWithAggregatesFilter<"Trade"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Trade"> | Date | string
  }

  export type ReputationQuestWhereInput = {
    AND?: ReputationQuestWhereInput | ReputationQuestWhereInput[]
    OR?: ReputationQuestWhereInput[]
    NOT?: ReputationQuestWhereInput | ReputationQuestWhereInput[]
    id?: StringFilter<"ReputationQuest"> | string
    title?: StringFilter<"ReputationQuest"> | string
    description?: StringFilter<"ReputationQuest"> | string
    type?: StringFilter<"ReputationQuest"> | string
    targetValue?: FloatFilter<"ReputationQuest"> | number
    reward?: IntFilter<"ReputationQuest"> | number
    isActive?: BoolFilter<"ReputationQuest"> | boolean
    createdAt?: DateTimeFilter<"ReputationQuest"> | Date | string
    updatedAt?: DateTimeFilter<"ReputationQuest"> | Date | string
    userProgress?: UserReputationQuestListRelationFilter
  }

  export type ReputationQuestOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    targetValue?: SortOrder
    reward?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userProgress?: UserReputationQuestOrderByRelationAggregateInput
  }

  export type ReputationQuestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReputationQuestWhereInput | ReputationQuestWhereInput[]
    OR?: ReputationQuestWhereInput[]
    NOT?: ReputationQuestWhereInput | ReputationQuestWhereInput[]
    title?: StringFilter<"ReputationQuest"> | string
    description?: StringFilter<"ReputationQuest"> | string
    type?: StringFilter<"ReputationQuest"> | string
    targetValue?: FloatFilter<"ReputationQuest"> | number
    reward?: IntFilter<"ReputationQuest"> | number
    isActive?: BoolFilter<"ReputationQuest"> | boolean
    createdAt?: DateTimeFilter<"ReputationQuest"> | Date | string
    updatedAt?: DateTimeFilter<"ReputationQuest"> | Date | string
    userProgress?: UserReputationQuestListRelationFilter
  }, "id">

  export type ReputationQuestOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    targetValue?: SortOrder
    reward?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ReputationQuestCountOrderByAggregateInput
    _avg?: ReputationQuestAvgOrderByAggregateInput
    _max?: ReputationQuestMaxOrderByAggregateInput
    _min?: ReputationQuestMinOrderByAggregateInput
    _sum?: ReputationQuestSumOrderByAggregateInput
  }

  export type ReputationQuestScalarWhereWithAggregatesInput = {
    AND?: ReputationQuestScalarWhereWithAggregatesInput | ReputationQuestScalarWhereWithAggregatesInput[]
    OR?: ReputationQuestScalarWhereWithAggregatesInput[]
    NOT?: ReputationQuestScalarWhereWithAggregatesInput | ReputationQuestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ReputationQuest"> | string
    title?: StringWithAggregatesFilter<"ReputationQuest"> | string
    description?: StringWithAggregatesFilter<"ReputationQuest"> | string
    type?: StringWithAggregatesFilter<"ReputationQuest"> | string
    targetValue?: FloatWithAggregatesFilter<"ReputationQuest"> | number
    reward?: IntWithAggregatesFilter<"ReputationQuest"> | number
    isActive?: BoolWithAggregatesFilter<"ReputationQuest"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ReputationQuest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ReputationQuest"> | Date | string
  }

  export type UserReputationQuestWhereInput = {
    AND?: UserReputationQuestWhereInput | UserReputationQuestWhereInput[]
    OR?: UserReputationQuestWhereInput[]
    NOT?: UserReputationQuestWhereInput | UserReputationQuestWhereInput[]
    id?: StringFilter<"UserReputationQuest"> | string
    userAddress?: StringFilter<"UserReputationQuest"> | string
    questId?: StringFilter<"UserReputationQuest"> | string
    progress?: FloatFilter<"UserReputationQuest"> | number
    isCompleted?: BoolFilter<"UserReputationQuest"> | boolean
    completedAt?: DateTimeNullableFilter<"UserReputationQuest"> | Date | string | null
    createdAt?: DateTimeFilter<"UserReputationQuest"> | Date | string
    updatedAt?: DateTimeFilter<"UserReputationQuest"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    quest?: XOR<ReputationQuestScalarRelationFilter, ReputationQuestWhereInput>
  }

  export type UserReputationQuestOrderByWithRelationInput = {
    id?: SortOrder
    userAddress?: SortOrder
    questId?: SortOrder
    progress?: SortOrder
    isCompleted?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    quest?: ReputationQuestOrderByWithRelationInput
  }

  export type UserReputationQuestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userAddress_questId?: UserReputationQuestUserAddressQuestIdCompoundUniqueInput
    AND?: UserReputationQuestWhereInput | UserReputationQuestWhereInput[]
    OR?: UserReputationQuestWhereInput[]
    NOT?: UserReputationQuestWhereInput | UserReputationQuestWhereInput[]
    userAddress?: StringFilter<"UserReputationQuest"> | string
    questId?: StringFilter<"UserReputationQuest"> | string
    progress?: FloatFilter<"UserReputationQuest"> | number
    isCompleted?: BoolFilter<"UserReputationQuest"> | boolean
    completedAt?: DateTimeNullableFilter<"UserReputationQuest"> | Date | string | null
    createdAt?: DateTimeFilter<"UserReputationQuest"> | Date | string
    updatedAt?: DateTimeFilter<"UserReputationQuest"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    quest?: XOR<ReputationQuestScalarRelationFilter, ReputationQuestWhereInput>
  }, "id" | "userAddress_questId">

  export type UserReputationQuestOrderByWithAggregationInput = {
    id?: SortOrder
    userAddress?: SortOrder
    questId?: SortOrder
    progress?: SortOrder
    isCompleted?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserReputationQuestCountOrderByAggregateInput
    _avg?: UserReputationQuestAvgOrderByAggregateInput
    _max?: UserReputationQuestMaxOrderByAggregateInput
    _min?: UserReputationQuestMinOrderByAggregateInput
    _sum?: UserReputationQuestSumOrderByAggregateInput
  }

  export type UserReputationQuestScalarWhereWithAggregatesInput = {
    AND?: UserReputationQuestScalarWhereWithAggregatesInput | UserReputationQuestScalarWhereWithAggregatesInput[]
    OR?: UserReputationQuestScalarWhereWithAggregatesInput[]
    NOT?: UserReputationQuestScalarWhereWithAggregatesInput | UserReputationQuestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserReputationQuest"> | string
    userAddress?: StringWithAggregatesFilter<"UserReputationQuest"> | string
    questId?: StringWithAggregatesFilter<"UserReputationQuest"> | string
    progress?: FloatWithAggregatesFilter<"UserReputationQuest"> | number
    isCompleted?: BoolWithAggregatesFilter<"UserReputationQuest"> | boolean
    completedAt?: DateTimeNullableWithAggregatesFilter<"UserReputationQuest"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"UserReputationQuest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserReputationQuest"> | Date | string
  }

  export type AchievementWhereInput = {
    AND?: AchievementWhereInput | AchievementWhereInput[]
    OR?: AchievementWhereInput[]
    NOT?: AchievementWhereInput | AchievementWhereInput[]
    id?: StringFilter<"Achievement"> | string
    title?: StringFilter<"Achievement"> | string
    description?: StringFilter<"Achievement"> | string
    icon?: StringFilter<"Achievement"> | string
    rarity?: StringFilter<"Achievement"> | string
    requirements?: StringFilter<"Achievement"> | string
    reward?: IntFilter<"Achievement"> | number
    isActive?: BoolFilter<"Achievement"> | boolean
    createdAt?: DateTimeFilter<"Achievement"> | Date | string
    updatedAt?: DateTimeFilter<"Achievement"> | Date | string
    userAchievements?: UserAchievementListRelationFilter
  }

  export type AchievementOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    icon?: SortOrder
    rarity?: SortOrder
    requirements?: SortOrder
    reward?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userAchievements?: UserAchievementOrderByRelationAggregateInput
  }

  export type AchievementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AchievementWhereInput | AchievementWhereInput[]
    OR?: AchievementWhereInput[]
    NOT?: AchievementWhereInput | AchievementWhereInput[]
    title?: StringFilter<"Achievement"> | string
    description?: StringFilter<"Achievement"> | string
    icon?: StringFilter<"Achievement"> | string
    rarity?: StringFilter<"Achievement"> | string
    requirements?: StringFilter<"Achievement"> | string
    reward?: IntFilter<"Achievement"> | number
    isActive?: BoolFilter<"Achievement"> | boolean
    createdAt?: DateTimeFilter<"Achievement"> | Date | string
    updatedAt?: DateTimeFilter<"Achievement"> | Date | string
    userAchievements?: UserAchievementListRelationFilter
  }, "id">

  export type AchievementOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    icon?: SortOrder
    rarity?: SortOrder
    requirements?: SortOrder
    reward?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AchievementCountOrderByAggregateInput
    _avg?: AchievementAvgOrderByAggregateInput
    _max?: AchievementMaxOrderByAggregateInput
    _min?: AchievementMinOrderByAggregateInput
    _sum?: AchievementSumOrderByAggregateInput
  }

  export type AchievementScalarWhereWithAggregatesInput = {
    AND?: AchievementScalarWhereWithAggregatesInput | AchievementScalarWhereWithAggregatesInput[]
    OR?: AchievementScalarWhereWithAggregatesInput[]
    NOT?: AchievementScalarWhereWithAggregatesInput | AchievementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Achievement"> | string
    title?: StringWithAggregatesFilter<"Achievement"> | string
    description?: StringWithAggregatesFilter<"Achievement"> | string
    icon?: StringWithAggregatesFilter<"Achievement"> | string
    rarity?: StringWithAggregatesFilter<"Achievement"> | string
    requirements?: StringWithAggregatesFilter<"Achievement"> | string
    reward?: IntWithAggregatesFilter<"Achievement"> | number
    isActive?: BoolWithAggregatesFilter<"Achievement"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Achievement"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Achievement"> | Date | string
  }

  export type UserAchievementWhereInput = {
    AND?: UserAchievementWhereInput | UserAchievementWhereInput[]
    OR?: UserAchievementWhereInput[]
    NOT?: UserAchievementWhereInput | UserAchievementWhereInput[]
    id?: StringFilter<"UserAchievement"> | string
    userAddress?: StringFilter<"UserAchievement"> | string
    achievementId?: StringFilter<"UserAchievement"> | string
    unlockedAt?: DateTimeFilter<"UserAchievement"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    achievement?: XOR<AchievementScalarRelationFilter, AchievementWhereInput>
  }

  export type UserAchievementOrderByWithRelationInput = {
    id?: SortOrder
    userAddress?: SortOrder
    achievementId?: SortOrder
    unlockedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    achievement?: AchievementOrderByWithRelationInput
  }

  export type UserAchievementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userAddress_achievementId?: UserAchievementUserAddressAchievementIdCompoundUniqueInput
    AND?: UserAchievementWhereInput | UserAchievementWhereInput[]
    OR?: UserAchievementWhereInput[]
    NOT?: UserAchievementWhereInput | UserAchievementWhereInput[]
    userAddress?: StringFilter<"UserAchievement"> | string
    achievementId?: StringFilter<"UserAchievement"> | string
    unlockedAt?: DateTimeFilter<"UserAchievement"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    achievement?: XOR<AchievementScalarRelationFilter, AchievementWhereInput>
  }, "id" | "userAddress_achievementId">

  export type UserAchievementOrderByWithAggregationInput = {
    id?: SortOrder
    userAddress?: SortOrder
    achievementId?: SortOrder
    unlockedAt?: SortOrder
    _count?: UserAchievementCountOrderByAggregateInput
    _max?: UserAchievementMaxOrderByAggregateInput
    _min?: UserAchievementMinOrderByAggregateInput
  }

  export type UserAchievementScalarWhereWithAggregatesInput = {
    AND?: UserAchievementScalarWhereWithAggregatesInput | UserAchievementScalarWhereWithAggregatesInput[]
    OR?: UserAchievementScalarWhereWithAggregatesInput[]
    NOT?: UserAchievementScalarWhereWithAggregatesInput | UserAchievementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserAchievement"> | string
    userAddress?: StringWithAggregatesFilter<"UserAchievement"> | string
    achievementId?: StringWithAggregatesFilter<"UserAchievement"> | string
    unlockedAt?: DateTimeWithAggregatesFilter<"UserAchievement"> | Date | string
  }

  export type AntiManipulationLogWhereInput = {
    AND?: AntiManipulationLogWhereInput | AntiManipulationLogWhereInput[]
    OR?: AntiManipulationLogWhereInput[]
    NOT?: AntiManipulationLogWhereInput | AntiManipulationLogWhereInput[]
    id?: StringFilter<"AntiManipulationLog"> | string
    userAddress?: StringFilter<"AntiManipulationLog"> | string
    activityType?: StringFilter<"AntiManipulationLog"> | string
    riskScore?: FloatFilter<"AntiManipulationLog"> | number
    flags?: StringFilter<"AntiManipulationLog"> | string
    details?: StringNullableFilter<"AntiManipulationLog"> | string | null
    isResolved?: BoolFilter<"AntiManipulationLog"> | boolean
    resolvedAt?: DateTimeNullableFilter<"AntiManipulationLog"> | Date | string | null
    resolvedBy?: StringNullableFilter<"AntiManipulationLog"> | string | null
    createdAt?: DateTimeFilter<"AntiManipulationLog"> | Date | string
    updatedAt?: DateTimeFilter<"AntiManipulationLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AntiManipulationLogOrderByWithRelationInput = {
    id?: SortOrder
    userAddress?: SortOrder
    activityType?: SortOrder
    riskScore?: SortOrder
    flags?: SortOrder
    details?: SortOrderInput | SortOrder
    isResolved?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    resolvedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AntiManipulationLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AntiManipulationLogWhereInput | AntiManipulationLogWhereInput[]
    OR?: AntiManipulationLogWhereInput[]
    NOT?: AntiManipulationLogWhereInput | AntiManipulationLogWhereInput[]
    userAddress?: StringFilter<"AntiManipulationLog"> | string
    activityType?: StringFilter<"AntiManipulationLog"> | string
    riskScore?: FloatFilter<"AntiManipulationLog"> | number
    flags?: StringFilter<"AntiManipulationLog"> | string
    details?: StringNullableFilter<"AntiManipulationLog"> | string | null
    isResolved?: BoolFilter<"AntiManipulationLog"> | boolean
    resolvedAt?: DateTimeNullableFilter<"AntiManipulationLog"> | Date | string | null
    resolvedBy?: StringNullableFilter<"AntiManipulationLog"> | string | null
    createdAt?: DateTimeFilter<"AntiManipulationLog"> | Date | string
    updatedAt?: DateTimeFilter<"AntiManipulationLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AntiManipulationLogOrderByWithAggregationInput = {
    id?: SortOrder
    userAddress?: SortOrder
    activityType?: SortOrder
    riskScore?: SortOrder
    flags?: SortOrder
    details?: SortOrderInput | SortOrder
    isResolved?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    resolvedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AntiManipulationLogCountOrderByAggregateInput
    _avg?: AntiManipulationLogAvgOrderByAggregateInput
    _max?: AntiManipulationLogMaxOrderByAggregateInput
    _min?: AntiManipulationLogMinOrderByAggregateInput
    _sum?: AntiManipulationLogSumOrderByAggregateInput
  }

  export type AntiManipulationLogScalarWhereWithAggregatesInput = {
    AND?: AntiManipulationLogScalarWhereWithAggregatesInput | AntiManipulationLogScalarWhereWithAggregatesInput[]
    OR?: AntiManipulationLogScalarWhereWithAggregatesInput[]
    NOT?: AntiManipulationLogScalarWhereWithAggregatesInput | AntiManipulationLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AntiManipulationLog"> | string
    userAddress?: StringWithAggregatesFilter<"AntiManipulationLog"> | string
    activityType?: StringWithAggregatesFilter<"AntiManipulationLog"> | string
    riskScore?: FloatWithAggregatesFilter<"AntiManipulationLog"> | number
    flags?: StringWithAggregatesFilter<"AntiManipulationLog"> | string
    details?: StringNullableWithAggregatesFilter<"AntiManipulationLog"> | string | null
    isResolved?: BoolWithAggregatesFilter<"AntiManipulationLog"> | boolean
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"AntiManipulationLog"> | Date | string | null
    resolvedBy?: StringNullableWithAggregatesFilter<"AntiManipulationLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AntiManipulationLog"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AntiManipulationLog"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    userAddress?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    isActive?: BoolFilter<"Session"> | boolean
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    userAddress?: SortOrder
    sessionToken?: SortOrder
    expiresAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userAddress?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    isActive?: BoolFilter<"Session"> | boolean
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
  }, "id" | "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    userAddress?: SortOrder
    sessionToken?: SortOrder
    expiresAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    userAddress?: StringWithAggregatesFilter<"Session"> | string
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    isActive?: BoolWithAggregatesFilter<"Session"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type UserCreateInput = {
    walletAddress: string
    worldIdHash?: string | null
    verificationLevel?: string
    reputationScore?: number
    reputationLevel?: string
    totalTrades?: number
    totalVolume?: number
    lastActivity?: Date | string
    isBanned?: boolean
    riskScore?: number
    allocationCap?: number
    usedAllocation?: number
    marketCap?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeCreateNestedManyWithoutUserInput
    createdTokens?: TokenCreateNestedManyWithoutCreatorInput
    reputationQuests?: UserReputationQuestCreateNestedManyWithoutUserInput
    achievements?: UserAchievementCreateNestedManyWithoutUserInput
    antiManipulationLogs?: AntiManipulationLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    walletAddress: string
    worldIdHash?: string | null
    verificationLevel?: string
    reputationScore?: number
    reputationLevel?: string
    totalTrades?: number
    totalVolume?: number
    lastActivity?: Date | string
    isBanned?: boolean
    riskScore?: number
    allocationCap?: number
    usedAllocation?: number
    marketCap?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeUncheckedCreateNestedManyWithoutUserInput
    createdTokens?: TokenUncheckedCreateNestedManyWithoutCreatorInput
    reputationQuests?: UserReputationQuestUncheckedCreateNestedManyWithoutUserInput
    achievements?: UserAchievementUncheckedCreateNestedManyWithoutUserInput
    antiManipulationLogs?: AntiManipulationLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    walletAddress?: StringFieldUpdateOperationsInput | string
    worldIdHash?: NullableStringFieldUpdateOperationsInput | string | null
    verificationLevel?: StringFieldUpdateOperationsInput | string
    reputationScore?: IntFieldUpdateOperationsInput | number
    reputationLevel?: StringFieldUpdateOperationsInput | string
    totalTrades?: IntFieldUpdateOperationsInput | number
    totalVolume?: FloatFieldUpdateOperationsInput | number
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    riskScore?: FloatFieldUpdateOperationsInput | number
    allocationCap?: FloatFieldUpdateOperationsInput | number
    usedAllocation?: FloatFieldUpdateOperationsInput | number
    marketCap?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUpdateManyWithoutUserNestedInput
    createdTokens?: TokenUpdateManyWithoutCreatorNestedInput
    reputationQuests?: UserReputationQuestUpdateManyWithoutUserNestedInput
    achievements?: UserAchievementUpdateManyWithoutUserNestedInput
    antiManipulationLogs?: AntiManipulationLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    walletAddress?: StringFieldUpdateOperationsInput | string
    worldIdHash?: NullableStringFieldUpdateOperationsInput | string | null
    verificationLevel?: StringFieldUpdateOperationsInput | string
    reputationScore?: IntFieldUpdateOperationsInput | number
    reputationLevel?: StringFieldUpdateOperationsInput | string
    totalTrades?: IntFieldUpdateOperationsInput | number
    totalVolume?: FloatFieldUpdateOperationsInput | number
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    riskScore?: FloatFieldUpdateOperationsInput | number
    allocationCap?: FloatFieldUpdateOperationsInput | number
    usedAllocation?: FloatFieldUpdateOperationsInput | number
    marketCap?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUncheckedUpdateManyWithoutUserNestedInput
    createdTokens?: TokenUncheckedUpdateManyWithoutCreatorNestedInput
    reputationQuests?: UserReputationQuestUncheckedUpdateManyWithoutUserNestedInput
    achievements?: UserAchievementUncheckedUpdateManyWithoutUserNestedInput
    antiManipulationLogs?: AntiManipulationLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    walletAddress: string
    worldIdHash?: string | null
    verificationLevel?: string
    reputationScore?: number
    reputationLevel?: string
    totalTrades?: number
    totalVolume?: number
    lastActivity?: Date | string
    isBanned?: boolean
    riskScore?: number
    allocationCap?: number
    usedAllocation?: number
    marketCap?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    walletAddress?: StringFieldUpdateOperationsInput | string
    worldIdHash?: NullableStringFieldUpdateOperationsInput | string | null
    verificationLevel?: StringFieldUpdateOperationsInput | string
    reputationScore?: IntFieldUpdateOperationsInput | number
    reputationLevel?: StringFieldUpdateOperationsInput | string
    totalTrades?: IntFieldUpdateOperationsInput | number
    totalVolume?: FloatFieldUpdateOperationsInput | number
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    riskScore?: FloatFieldUpdateOperationsInput | number
    allocationCap?: FloatFieldUpdateOperationsInput | number
    usedAllocation?: FloatFieldUpdateOperationsInput | number
    marketCap?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    walletAddress?: StringFieldUpdateOperationsInput | string
    worldIdHash?: NullableStringFieldUpdateOperationsInput | string | null
    verificationLevel?: StringFieldUpdateOperationsInput | string
    reputationScore?: IntFieldUpdateOperationsInput | number
    reputationLevel?: StringFieldUpdateOperationsInput | string
    totalTrades?: IntFieldUpdateOperationsInput | number
    totalVolume?: FloatFieldUpdateOperationsInput | number
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    riskScore?: FloatFieldUpdateOperationsInput | number
    allocationCap?: FloatFieldUpdateOperationsInput | number
    usedAllocation?: FloatFieldUpdateOperationsInput | number
    marketCap?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenCreateInput = {
    address: string
    name: string
    symbol: string
    description: string
    imageUrl?: string | null
    initialPrice: number
    priceIncrement: number
    maxSupply: bigint | number
    currentSupply?: bigint | number
    currentPrice: number
    totalVolume?: number
    totalTrades?: number
    marketCap?: number
    status?: string
    launchDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    creator: UserCreateNestedOneWithoutCreatedTokensInput
    trades?: TradeCreateNestedManyWithoutTokenInput
  }

  export type TokenUncheckedCreateInput = {
    address: string
    name: string
    symbol: string
    description: string
    imageUrl?: string | null
    creatorAddress: string
    initialPrice: number
    priceIncrement: number
    maxSupply: bigint | number
    currentSupply?: bigint | number
    currentPrice: number
    totalVolume?: number
    totalTrades?: number
    marketCap?: number
    status?: string
    launchDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeUncheckedCreateNestedManyWithoutTokenInput
  }

  export type TokenUpdateInput = {
    address?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    initialPrice?: FloatFieldUpdateOperationsInput | number
    priceIncrement?: FloatFieldUpdateOperationsInput | number
    maxSupply?: BigIntFieldUpdateOperationsInput | bigint | number
    currentSupply?: BigIntFieldUpdateOperationsInput | bigint | number
    currentPrice?: FloatFieldUpdateOperationsInput | number
    totalVolume?: FloatFieldUpdateOperationsInput | number
    totalTrades?: IntFieldUpdateOperationsInput | number
    marketCap?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    launchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutCreatedTokensNestedInput
    trades?: TradeUpdateManyWithoutTokenNestedInput
  }

  export type TokenUncheckedUpdateInput = {
    address?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    creatorAddress?: StringFieldUpdateOperationsInput | string
    initialPrice?: FloatFieldUpdateOperationsInput | number
    priceIncrement?: FloatFieldUpdateOperationsInput | number
    maxSupply?: BigIntFieldUpdateOperationsInput | bigint | number
    currentSupply?: BigIntFieldUpdateOperationsInput | bigint | number
    currentPrice?: FloatFieldUpdateOperationsInput | number
    totalVolume?: FloatFieldUpdateOperationsInput | number
    totalTrades?: IntFieldUpdateOperationsInput | number
    marketCap?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    launchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUncheckedUpdateManyWithoutTokenNestedInput
  }

  export type TokenCreateManyInput = {
    address: string
    name: string
    symbol: string
    description: string
    imageUrl?: string | null
    creatorAddress: string
    initialPrice: number
    priceIncrement: number
    maxSupply: bigint | number
    currentSupply?: bigint | number
    currentPrice: number
    totalVolume?: number
    totalTrades?: number
    marketCap?: number
    status?: string
    launchDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TokenUpdateManyMutationInput = {
    address?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    initialPrice?: FloatFieldUpdateOperationsInput | number
    priceIncrement?: FloatFieldUpdateOperationsInput | number
    maxSupply?: BigIntFieldUpdateOperationsInput | bigint | number
    currentSupply?: BigIntFieldUpdateOperationsInput | bigint | number
    currentPrice?: FloatFieldUpdateOperationsInput | number
    totalVolume?: FloatFieldUpdateOperationsInput | number
    totalTrades?: IntFieldUpdateOperationsInput | number
    marketCap?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    launchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenUncheckedUpdateManyInput = {
    address?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    creatorAddress?: StringFieldUpdateOperationsInput | string
    initialPrice?: FloatFieldUpdateOperationsInput | number
    priceIncrement?: FloatFieldUpdateOperationsInput | number
    maxSupply?: BigIntFieldUpdateOperationsInput | bigint | number
    currentSupply?: BigIntFieldUpdateOperationsInput | bigint | number
    currentPrice?: FloatFieldUpdateOperationsInput | number
    totalVolume?: FloatFieldUpdateOperationsInput | number
    totalTrades?: IntFieldUpdateOperationsInput | number
    marketCap?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    launchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeCreateInput = {
    id?: string
    type: string
    amount: number
    price: number
    totalValue: number
    blockNumber?: bigint | number | null
    transactionHash?: string | null
    riskScore?: number
    isSuspicious?: boolean
    manipulationFlags?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTradesInput
    token: TokenCreateNestedOneWithoutTradesInput
  }

  export type TradeUncheckedCreateInput = {
    id?: string
    userAddress: string
    tokenAddress: string
    type: string
    amount: number
    price: number
    totalValue: number
    blockNumber?: bigint | number | null
    transactionHash?: string | null
    riskScore?: number
    isSuspicious?: boolean
    manipulationFlags?: string | null
    createdAt?: Date | string
  }

  export type TradeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    riskScore?: FloatFieldUpdateOperationsInput | number
    isSuspicious?: BoolFieldUpdateOperationsInput | boolean
    manipulationFlags?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTradesNestedInput
    token?: TokenUpdateOneRequiredWithoutTradesNestedInput
  }

  export type TradeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    tokenAddress?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    riskScore?: FloatFieldUpdateOperationsInput | number
    isSuspicious?: BoolFieldUpdateOperationsInput | boolean
    manipulationFlags?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeCreateManyInput = {
    id?: string
    userAddress: string
    tokenAddress: string
    type: string
    amount: number
    price: number
    totalValue: number
    blockNumber?: bigint | number | null
    transactionHash?: string | null
    riskScore?: number
    isSuspicious?: boolean
    manipulationFlags?: string | null
    createdAt?: Date | string
  }

  export type TradeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    riskScore?: FloatFieldUpdateOperationsInput | number
    isSuspicious?: BoolFieldUpdateOperationsInput | boolean
    manipulationFlags?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    tokenAddress?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    riskScore?: FloatFieldUpdateOperationsInput | number
    isSuspicious?: BoolFieldUpdateOperationsInput | boolean
    manipulationFlags?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReputationQuestCreateInput = {
    id?: string
    title: string
    description: string
    type: string
    targetValue: number
    reward: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userProgress?: UserReputationQuestCreateNestedManyWithoutQuestInput
  }

  export type ReputationQuestUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    type: string
    targetValue: number
    reward: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userProgress?: UserReputationQuestUncheckedCreateNestedManyWithoutQuestInput
  }

  export type ReputationQuestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    targetValue?: FloatFieldUpdateOperationsInput | number
    reward?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userProgress?: UserReputationQuestUpdateManyWithoutQuestNestedInput
  }

  export type ReputationQuestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    targetValue?: FloatFieldUpdateOperationsInput | number
    reward?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userProgress?: UserReputationQuestUncheckedUpdateManyWithoutQuestNestedInput
  }

  export type ReputationQuestCreateManyInput = {
    id?: string
    title: string
    description: string
    type: string
    targetValue: number
    reward: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReputationQuestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    targetValue?: FloatFieldUpdateOperationsInput | number
    reward?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReputationQuestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    targetValue?: FloatFieldUpdateOperationsInput | number
    reward?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserReputationQuestCreateInput = {
    id?: string
    progress?: number
    isCompleted?: boolean
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutReputationQuestsInput
    quest: ReputationQuestCreateNestedOneWithoutUserProgressInput
  }

  export type UserReputationQuestUncheckedCreateInput = {
    id?: string
    userAddress: string
    questId: string
    progress?: number
    isCompleted?: boolean
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserReputationQuestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReputationQuestsNestedInput
    quest?: ReputationQuestUpdateOneRequiredWithoutUserProgressNestedInput
  }

  export type UserReputationQuestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    questId?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserReputationQuestCreateManyInput = {
    id?: string
    userAddress: string
    questId: string
    progress?: number
    isCompleted?: boolean
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserReputationQuestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserReputationQuestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    questId?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AchievementCreateInput = {
    id?: string
    title: string
    description: string
    icon: string
    rarity: string
    requirements: string
    reward: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userAchievements?: UserAchievementCreateNestedManyWithoutAchievementInput
  }

  export type AchievementUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    icon: string
    rarity: string
    requirements: string
    reward: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userAchievements?: UserAchievementUncheckedCreateNestedManyWithoutAchievementInput
  }

  export type AchievementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    rarity?: StringFieldUpdateOperationsInput | string
    requirements?: StringFieldUpdateOperationsInput | string
    reward?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userAchievements?: UserAchievementUpdateManyWithoutAchievementNestedInput
  }

  export type AchievementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    rarity?: StringFieldUpdateOperationsInput | string
    requirements?: StringFieldUpdateOperationsInput | string
    reward?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userAchievements?: UserAchievementUncheckedUpdateManyWithoutAchievementNestedInput
  }

  export type AchievementCreateManyInput = {
    id?: string
    title: string
    description: string
    icon: string
    rarity: string
    requirements: string
    reward: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AchievementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    rarity?: StringFieldUpdateOperationsInput | string
    requirements?: StringFieldUpdateOperationsInput | string
    reward?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AchievementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    rarity?: StringFieldUpdateOperationsInput | string
    requirements?: StringFieldUpdateOperationsInput | string
    reward?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAchievementCreateInput = {
    id?: string
    unlockedAt?: Date | string
    user: UserCreateNestedOneWithoutAchievementsInput
    achievement: AchievementCreateNestedOneWithoutUserAchievementsInput
  }

  export type UserAchievementUncheckedCreateInput = {
    id?: string
    userAddress: string
    achievementId: string
    unlockedAt?: Date | string
  }

  export type UserAchievementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAchievementsNestedInput
    achievement?: AchievementUpdateOneRequiredWithoutUserAchievementsNestedInput
  }

  export type UserAchievementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    achievementId?: StringFieldUpdateOperationsInput | string
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAchievementCreateManyInput = {
    id?: string
    userAddress: string
    achievementId: string
    unlockedAt?: Date | string
  }

  export type UserAchievementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAchievementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    achievementId?: StringFieldUpdateOperationsInput | string
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AntiManipulationLogCreateInput = {
    id?: string
    activityType: string
    riskScore: number
    flags: string
    details?: string | null
    isResolved?: boolean
    resolvedAt?: Date | string | null
    resolvedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAntiManipulationLogsInput
  }

  export type AntiManipulationLogUncheckedCreateInput = {
    id?: string
    userAddress: string
    activityType: string
    riskScore: number
    flags: string
    details?: string | null
    isResolved?: boolean
    resolvedAt?: Date | string | null
    resolvedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AntiManipulationLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    activityType?: StringFieldUpdateOperationsInput | string
    riskScore?: FloatFieldUpdateOperationsInput | number
    flags?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    isResolved?: BoolFieldUpdateOperationsInput | boolean
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAntiManipulationLogsNestedInput
  }

  export type AntiManipulationLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    activityType?: StringFieldUpdateOperationsInput | string
    riskScore?: FloatFieldUpdateOperationsInput | number
    flags?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    isResolved?: BoolFieldUpdateOperationsInput | boolean
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AntiManipulationLogCreateManyInput = {
    id?: string
    userAddress: string
    activityType: string
    riskScore: number
    flags: string
    details?: string | null
    isResolved?: boolean
    resolvedAt?: Date | string | null
    resolvedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AntiManipulationLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    activityType?: StringFieldUpdateOperationsInput | string
    riskScore?: FloatFieldUpdateOperationsInput | number
    flags?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    isResolved?: BoolFieldUpdateOperationsInput | boolean
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AntiManipulationLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    activityType?: StringFieldUpdateOperationsInput | string
    riskScore?: FloatFieldUpdateOperationsInput | number
    flags?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    isResolved?: BoolFieldUpdateOperationsInput | boolean
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    userAddress: string
    sessionToken: string
    expiresAt: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    userAddress: string
    sessionToken: string
    expiresAt: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    userAddress: string
    sessionToken: string
    expiresAt: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type TradeListRelationFilter = {
    every?: TradeWhereInput
    some?: TradeWhereInput
    none?: TradeWhereInput
  }

  export type TokenListRelationFilter = {
    every?: TokenWhereInput
    some?: TokenWhereInput
    none?: TokenWhereInput
  }

  export type UserReputationQuestListRelationFilter = {
    every?: UserReputationQuestWhereInput
    some?: UserReputationQuestWhereInput
    none?: UserReputationQuestWhereInput
  }

  export type UserAchievementListRelationFilter = {
    every?: UserAchievementWhereInput
    some?: UserAchievementWhereInput
    none?: UserAchievementWhereInput
  }

  export type AntiManipulationLogListRelationFilter = {
    every?: AntiManipulationLogWhereInput
    some?: AntiManipulationLogWhereInput
    none?: AntiManipulationLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TradeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserReputationQuestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserAchievementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AntiManipulationLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    walletAddress?: SortOrder
    worldIdHash?: SortOrder
    verificationLevel?: SortOrder
    reputationScore?: SortOrder
    reputationLevel?: SortOrder
    totalTrades?: SortOrder
    totalVolume?: SortOrder
    lastActivity?: SortOrder
    isBanned?: SortOrder
    riskScore?: SortOrder
    allocationCap?: SortOrder
    usedAllocation?: SortOrder
    marketCap?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    reputationScore?: SortOrder
    totalTrades?: SortOrder
    totalVolume?: SortOrder
    riskScore?: SortOrder
    allocationCap?: SortOrder
    usedAllocation?: SortOrder
    marketCap?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    walletAddress?: SortOrder
    worldIdHash?: SortOrder
    verificationLevel?: SortOrder
    reputationScore?: SortOrder
    reputationLevel?: SortOrder
    totalTrades?: SortOrder
    totalVolume?: SortOrder
    lastActivity?: SortOrder
    isBanned?: SortOrder
    riskScore?: SortOrder
    allocationCap?: SortOrder
    usedAllocation?: SortOrder
    marketCap?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    walletAddress?: SortOrder
    worldIdHash?: SortOrder
    verificationLevel?: SortOrder
    reputationScore?: SortOrder
    reputationLevel?: SortOrder
    totalTrades?: SortOrder
    totalVolume?: SortOrder
    lastActivity?: SortOrder
    isBanned?: SortOrder
    riskScore?: SortOrder
    allocationCap?: SortOrder
    usedAllocation?: SortOrder
    marketCap?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    reputationScore?: SortOrder
    totalTrades?: SortOrder
    totalVolume?: SortOrder
    riskScore?: SortOrder
    allocationCap?: SortOrder
    usedAllocation?: SortOrder
    marketCap?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TokenCountOrderByAggregateInput = {
    address?: SortOrder
    name?: SortOrder
    symbol?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    creatorAddress?: SortOrder
    initialPrice?: SortOrder
    priceIncrement?: SortOrder
    maxSupply?: SortOrder
    currentSupply?: SortOrder
    currentPrice?: SortOrder
    totalVolume?: SortOrder
    totalTrades?: SortOrder
    marketCap?: SortOrder
    status?: SortOrder
    launchDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TokenAvgOrderByAggregateInput = {
    initialPrice?: SortOrder
    priceIncrement?: SortOrder
    maxSupply?: SortOrder
    currentSupply?: SortOrder
    currentPrice?: SortOrder
    totalVolume?: SortOrder
    totalTrades?: SortOrder
    marketCap?: SortOrder
  }

  export type TokenMaxOrderByAggregateInput = {
    address?: SortOrder
    name?: SortOrder
    symbol?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    creatorAddress?: SortOrder
    initialPrice?: SortOrder
    priceIncrement?: SortOrder
    maxSupply?: SortOrder
    currentSupply?: SortOrder
    currentPrice?: SortOrder
    totalVolume?: SortOrder
    totalTrades?: SortOrder
    marketCap?: SortOrder
    status?: SortOrder
    launchDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TokenMinOrderByAggregateInput = {
    address?: SortOrder
    name?: SortOrder
    symbol?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    creatorAddress?: SortOrder
    initialPrice?: SortOrder
    priceIncrement?: SortOrder
    maxSupply?: SortOrder
    currentSupply?: SortOrder
    currentPrice?: SortOrder
    totalVolume?: SortOrder
    totalTrades?: SortOrder
    marketCap?: SortOrder
    status?: SortOrder
    launchDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TokenSumOrderByAggregateInput = {
    initialPrice?: SortOrder
    priceIncrement?: SortOrder
    maxSupply?: SortOrder
    currentSupply?: SortOrder
    currentPrice?: SortOrder
    totalVolume?: SortOrder
    totalTrades?: SortOrder
    marketCap?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type TokenScalarRelationFilter = {
    is?: TokenWhereInput
    isNot?: TokenWhereInput
  }

  export type TradeCountOrderByAggregateInput = {
    id?: SortOrder
    userAddress?: SortOrder
    tokenAddress?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    price?: SortOrder
    totalValue?: SortOrder
    blockNumber?: SortOrder
    transactionHash?: SortOrder
    riskScore?: SortOrder
    isSuspicious?: SortOrder
    manipulationFlags?: SortOrder
    createdAt?: SortOrder
  }

  export type TradeAvgOrderByAggregateInput = {
    amount?: SortOrder
    price?: SortOrder
    totalValue?: SortOrder
    blockNumber?: SortOrder
    riskScore?: SortOrder
  }

  export type TradeMaxOrderByAggregateInput = {
    id?: SortOrder
    userAddress?: SortOrder
    tokenAddress?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    price?: SortOrder
    totalValue?: SortOrder
    blockNumber?: SortOrder
    transactionHash?: SortOrder
    riskScore?: SortOrder
    isSuspicious?: SortOrder
    manipulationFlags?: SortOrder
    createdAt?: SortOrder
  }

  export type TradeMinOrderByAggregateInput = {
    id?: SortOrder
    userAddress?: SortOrder
    tokenAddress?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    price?: SortOrder
    totalValue?: SortOrder
    blockNumber?: SortOrder
    transactionHash?: SortOrder
    riskScore?: SortOrder
    isSuspicious?: SortOrder
    manipulationFlags?: SortOrder
    createdAt?: SortOrder
  }

  export type TradeSumOrderByAggregateInput = {
    amount?: SortOrder
    price?: SortOrder
    totalValue?: SortOrder
    blockNumber?: SortOrder
    riskScore?: SortOrder
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type ReputationQuestCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    targetValue?: SortOrder
    reward?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReputationQuestAvgOrderByAggregateInput = {
    targetValue?: SortOrder
    reward?: SortOrder
  }

  export type ReputationQuestMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    targetValue?: SortOrder
    reward?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReputationQuestMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    targetValue?: SortOrder
    reward?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReputationQuestSumOrderByAggregateInput = {
    targetValue?: SortOrder
    reward?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ReputationQuestScalarRelationFilter = {
    is?: ReputationQuestWhereInput
    isNot?: ReputationQuestWhereInput
  }

  export type UserReputationQuestUserAddressQuestIdCompoundUniqueInput = {
    userAddress: string
    questId: string
  }

  export type UserReputationQuestCountOrderByAggregateInput = {
    id?: SortOrder
    userAddress?: SortOrder
    questId?: SortOrder
    progress?: SortOrder
    isCompleted?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserReputationQuestAvgOrderByAggregateInput = {
    progress?: SortOrder
  }

  export type UserReputationQuestMaxOrderByAggregateInput = {
    id?: SortOrder
    userAddress?: SortOrder
    questId?: SortOrder
    progress?: SortOrder
    isCompleted?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserReputationQuestMinOrderByAggregateInput = {
    id?: SortOrder
    userAddress?: SortOrder
    questId?: SortOrder
    progress?: SortOrder
    isCompleted?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserReputationQuestSumOrderByAggregateInput = {
    progress?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type AchievementCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    icon?: SortOrder
    rarity?: SortOrder
    requirements?: SortOrder
    reward?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AchievementAvgOrderByAggregateInput = {
    reward?: SortOrder
  }

  export type AchievementMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    icon?: SortOrder
    rarity?: SortOrder
    requirements?: SortOrder
    reward?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AchievementMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    icon?: SortOrder
    rarity?: SortOrder
    requirements?: SortOrder
    reward?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AchievementSumOrderByAggregateInput = {
    reward?: SortOrder
  }

  export type AchievementScalarRelationFilter = {
    is?: AchievementWhereInput
    isNot?: AchievementWhereInput
  }

  export type UserAchievementUserAddressAchievementIdCompoundUniqueInput = {
    userAddress: string
    achievementId: string
  }

  export type UserAchievementCountOrderByAggregateInput = {
    id?: SortOrder
    userAddress?: SortOrder
    achievementId?: SortOrder
    unlockedAt?: SortOrder
  }

  export type UserAchievementMaxOrderByAggregateInput = {
    id?: SortOrder
    userAddress?: SortOrder
    achievementId?: SortOrder
    unlockedAt?: SortOrder
  }

  export type UserAchievementMinOrderByAggregateInput = {
    id?: SortOrder
    userAddress?: SortOrder
    achievementId?: SortOrder
    unlockedAt?: SortOrder
  }

  export type AntiManipulationLogCountOrderByAggregateInput = {
    id?: SortOrder
    userAddress?: SortOrder
    activityType?: SortOrder
    riskScore?: SortOrder
    flags?: SortOrder
    details?: SortOrder
    isResolved?: SortOrder
    resolvedAt?: SortOrder
    resolvedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AntiManipulationLogAvgOrderByAggregateInput = {
    riskScore?: SortOrder
  }

  export type AntiManipulationLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userAddress?: SortOrder
    activityType?: SortOrder
    riskScore?: SortOrder
    flags?: SortOrder
    details?: SortOrder
    isResolved?: SortOrder
    resolvedAt?: SortOrder
    resolvedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AntiManipulationLogMinOrderByAggregateInput = {
    id?: SortOrder
    userAddress?: SortOrder
    activityType?: SortOrder
    riskScore?: SortOrder
    flags?: SortOrder
    details?: SortOrder
    isResolved?: SortOrder
    resolvedAt?: SortOrder
    resolvedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AntiManipulationLogSumOrderByAggregateInput = {
    riskScore?: SortOrder
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    userAddress?: SortOrder
    sessionToken?: SortOrder
    expiresAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userAddress?: SortOrder
    sessionToken?: SortOrder
    expiresAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    userAddress?: SortOrder
    sessionToken?: SortOrder
    expiresAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TradeCreateNestedManyWithoutUserInput = {
    create?: XOR<TradeCreateWithoutUserInput, TradeUncheckedCreateWithoutUserInput> | TradeCreateWithoutUserInput[] | TradeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutUserInput | TradeCreateOrConnectWithoutUserInput[]
    createMany?: TradeCreateManyUserInputEnvelope
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
  }

  export type TokenCreateNestedManyWithoutCreatorInput = {
    create?: XOR<TokenCreateWithoutCreatorInput, TokenUncheckedCreateWithoutCreatorInput> | TokenCreateWithoutCreatorInput[] | TokenUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: TokenCreateOrConnectWithoutCreatorInput | TokenCreateOrConnectWithoutCreatorInput[]
    createMany?: TokenCreateManyCreatorInputEnvelope
    connect?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
  }

  export type UserReputationQuestCreateNestedManyWithoutUserInput = {
    create?: XOR<UserReputationQuestCreateWithoutUserInput, UserReputationQuestUncheckedCreateWithoutUserInput> | UserReputationQuestCreateWithoutUserInput[] | UserReputationQuestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserReputationQuestCreateOrConnectWithoutUserInput | UserReputationQuestCreateOrConnectWithoutUserInput[]
    createMany?: UserReputationQuestCreateManyUserInputEnvelope
    connect?: UserReputationQuestWhereUniqueInput | UserReputationQuestWhereUniqueInput[]
  }

  export type UserAchievementCreateNestedManyWithoutUserInput = {
    create?: XOR<UserAchievementCreateWithoutUserInput, UserAchievementUncheckedCreateWithoutUserInput> | UserAchievementCreateWithoutUserInput[] | UserAchievementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutUserInput | UserAchievementCreateOrConnectWithoutUserInput[]
    createMany?: UserAchievementCreateManyUserInputEnvelope
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
  }

  export type AntiManipulationLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AntiManipulationLogCreateWithoutUserInput, AntiManipulationLogUncheckedCreateWithoutUserInput> | AntiManipulationLogCreateWithoutUserInput[] | AntiManipulationLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AntiManipulationLogCreateOrConnectWithoutUserInput | AntiManipulationLogCreateOrConnectWithoutUserInput[]
    createMany?: AntiManipulationLogCreateManyUserInputEnvelope
    connect?: AntiManipulationLogWhereUniqueInput | AntiManipulationLogWhereUniqueInput[]
  }

  export type TradeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TradeCreateWithoutUserInput, TradeUncheckedCreateWithoutUserInput> | TradeCreateWithoutUserInput[] | TradeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutUserInput | TradeCreateOrConnectWithoutUserInput[]
    createMany?: TradeCreateManyUserInputEnvelope
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
  }

  export type TokenUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<TokenCreateWithoutCreatorInput, TokenUncheckedCreateWithoutCreatorInput> | TokenCreateWithoutCreatorInput[] | TokenUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: TokenCreateOrConnectWithoutCreatorInput | TokenCreateOrConnectWithoutCreatorInput[]
    createMany?: TokenCreateManyCreatorInputEnvelope
    connect?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
  }

  export type UserReputationQuestUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserReputationQuestCreateWithoutUserInput, UserReputationQuestUncheckedCreateWithoutUserInput> | UserReputationQuestCreateWithoutUserInput[] | UserReputationQuestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserReputationQuestCreateOrConnectWithoutUserInput | UserReputationQuestCreateOrConnectWithoutUserInput[]
    createMany?: UserReputationQuestCreateManyUserInputEnvelope
    connect?: UserReputationQuestWhereUniqueInput | UserReputationQuestWhereUniqueInput[]
  }

  export type UserAchievementUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserAchievementCreateWithoutUserInput, UserAchievementUncheckedCreateWithoutUserInput> | UserAchievementCreateWithoutUserInput[] | UserAchievementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutUserInput | UserAchievementCreateOrConnectWithoutUserInput[]
    createMany?: UserAchievementCreateManyUserInputEnvelope
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
  }

  export type AntiManipulationLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AntiManipulationLogCreateWithoutUserInput, AntiManipulationLogUncheckedCreateWithoutUserInput> | AntiManipulationLogCreateWithoutUserInput[] | AntiManipulationLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AntiManipulationLogCreateOrConnectWithoutUserInput | AntiManipulationLogCreateOrConnectWithoutUserInput[]
    createMany?: AntiManipulationLogCreateManyUserInputEnvelope
    connect?: AntiManipulationLogWhereUniqueInput | AntiManipulationLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TradeUpdateManyWithoutUserNestedInput = {
    create?: XOR<TradeCreateWithoutUserInput, TradeUncheckedCreateWithoutUserInput> | TradeCreateWithoutUserInput[] | TradeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutUserInput | TradeCreateOrConnectWithoutUserInput[]
    upsert?: TradeUpsertWithWhereUniqueWithoutUserInput | TradeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TradeCreateManyUserInputEnvelope
    set?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    disconnect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    delete?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    update?: TradeUpdateWithWhereUniqueWithoutUserInput | TradeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TradeUpdateManyWithWhereWithoutUserInput | TradeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TradeScalarWhereInput | TradeScalarWhereInput[]
  }

  export type TokenUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<TokenCreateWithoutCreatorInput, TokenUncheckedCreateWithoutCreatorInput> | TokenCreateWithoutCreatorInput[] | TokenUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: TokenCreateOrConnectWithoutCreatorInput | TokenCreateOrConnectWithoutCreatorInput[]
    upsert?: TokenUpsertWithWhereUniqueWithoutCreatorInput | TokenUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: TokenCreateManyCreatorInputEnvelope
    set?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    disconnect?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    delete?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    connect?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    update?: TokenUpdateWithWhereUniqueWithoutCreatorInput | TokenUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: TokenUpdateManyWithWhereWithoutCreatorInput | TokenUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: TokenScalarWhereInput | TokenScalarWhereInput[]
  }

  export type UserReputationQuestUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserReputationQuestCreateWithoutUserInput, UserReputationQuestUncheckedCreateWithoutUserInput> | UserReputationQuestCreateWithoutUserInput[] | UserReputationQuestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserReputationQuestCreateOrConnectWithoutUserInput | UserReputationQuestCreateOrConnectWithoutUserInput[]
    upsert?: UserReputationQuestUpsertWithWhereUniqueWithoutUserInput | UserReputationQuestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserReputationQuestCreateManyUserInputEnvelope
    set?: UserReputationQuestWhereUniqueInput | UserReputationQuestWhereUniqueInput[]
    disconnect?: UserReputationQuestWhereUniqueInput | UserReputationQuestWhereUniqueInput[]
    delete?: UserReputationQuestWhereUniqueInput | UserReputationQuestWhereUniqueInput[]
    connect?: UserReputationQuestWhereUniqueInput | UserReputationQuestWhereUniqueInput[]
    update?: UserReputationQuestUpdateWithWhereUniqueWithoutUserInput | UserReputationQuestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserReputationQuestUpdateManyWithWhereWithoutUserInput | UserReputationQuestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserReputationQuestScalarWhereInput | UserReputationQuestScalarWhereInput[]
  }

  export type UserAchievementUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserAchievementCreateWithoutUserInput, UserAchievementUncheckedCreateWithoutUserInput> | UserAchievementCreateWithoutUserInput[] | UserAchievementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutUserInput | UserAchievementCreateOrConnectWithoutUserInput[]
    upsert?: UserAchievementUpsertWithWhereUniqueWithoutUserInput | UserAchievementUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserAchievementCreateManyUserInputEnvelope
    set?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    disconnect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    delete?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    update?: UserAchievementUpdateWithWhereUniqueWithoutUserInput | UserAchievementUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserAchievementUpdateManyWithWhereWithoutUserInput | UserAchievementUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[]
  }

  export type AntiManipulationLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AntiManipulationLogCreateWithoutUserInput, AntiManipulationLogUncheckedCreateWithoutUserInput> | AntiManipulationLogCreateWithoutUserInput[] | AntiManipulationLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AntiManipulationLogCreateOrConnectWithoutUserInput | AntiManipulationLogCreateOrConnectWithoutUserInput[]
    upsert?: AntiManipulationLogUpsertWithWhereUniqueWithoutUserInput | AntiManipulationLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AntiManipulationLogCreateManyUserInputEnvelope
    set?: AntiManipulationLogWhereUniqueInput | AntiManipulationLogWhereUniqueInput[]
    disconnect?: AntiManipulationLogWhereUniqueInput | AntiManipulationLogWhereUniqueInput[]
    delete?: AntiManipulationLogWhereUniqueInput | AntiManipulationLogWhereUniqueInput[]
    connect?: AntiManipulationLogWhereUniqueInput | AntiManipulationLogWhereUniqueInput[]
    update?: AntiManipulationLogUpdateWithWhereUniqueWithoutUserInput | AntiManipulationLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AntiManipulationLogUpdateManyWithWhereWithoutUserInput | AntiManipulationLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AntiManipulationLogScalarWhereInput | AntiManipulationLogScalarWhereInput[]
  }

  export type TradeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TradeCreateWithoutUserInput, TradeUncheckedCreateWithoutUserInput> | TradeCreateWithoutUserInput[] | TradeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutUserInput | TradeCreateOrConnectWithoutUserInput[]
    upsert?: TradeUpsertWithWhereUniqueWithoutUserInput | TradeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TradeCreateManyUserInputEnvelope
    set?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    disconnect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    delete?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    update?: TradeUpdateWithWhereUniqueWithoutUserInput | TradeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TradeUpdateManyWithWhereWithoutUserInput | TradeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TradeScalarWhereInput | TradeScalarWhereInput[]
  }

  export type TokenUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<TokenCreateWithoutCreatorInput, TokenUncheckedCreateWithoutCreatorInput> | TokenCreateWithoutCreatorInput[] | TokenUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: TokenCreateOrConnectWithoutCreatorInput | TokenCreateOrConnectWithoutCreatorInput[]
    upsert?: TokenUpsertWithWhereUniqueWithoutCreatorInput | TokenUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: TokenCreateManyCreatorInputEnvelope
    set?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    disconnect?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    delete?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    connect?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    update?: TokenUpdateWithWhereUniqueWithoutCreatorInput | TokenUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: TokenUpdateManyWithWhereWithoutCreatorInput | TokenUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: TokenScalarWhereInput | TokenScalarWhereInput[]
  }

  export type UserReputationQuestUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserReputationQuestCreateWithoutUserInput, UserReputationQuestUncheckedCreateWithoutUserInput> | UserReputationQuestCreateWithoutUserInput[] | UserReputationQuestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserReputationQuestCreateOrConnectWithoutUserInput | UserReputationQuestCreateOrConnectWithoutUserInput[]
    upsert?: UserReputationQuestUpsertWithWhereUniqueWithoutUserInput | UserReputationQuestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserReputationQuestCreateManyUserInputEnvelope
    set?: UserReputationQuestWhereUniqueInput | UserReputationQuestWhereUniqueInput[]
    disconnect?: UserReputationQuestWhereUniqueInput | UserReputationQuestWhereUniqueInput[]
    delete?: UserReputationQuestWhereUniqueInput | UserReputationQuestWhereUniqueInput[]
    connect?: UserReputationQuestWhereUniqueInput | UserReputationQuestWhereUniqueInput[]
    update?: UserReputationQuestUpdateWithWhereUniqueWithoutUserInput | UserReputationQuestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserReputationQuestUpdateManyWithWhereWithoutUserInput | UserReputationQuestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserReputationQuestScalarWhereInput | UserReputationQuestScalarWhereInput[]
  }

  export type UserAchievementUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserAchievementCreateWithoutUserInput, UserAchievementUncheckedCreateWithoutUserInput> | UserAchievementCreateWithoutUserInput[] | UserAchievementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutUserInput | UserAchievementCreateOrConnectWithoutUserInput[]
    upsert?: UserAchievementUpsertWithWhereUniqueWithoutUserInput | UserAchievementUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserAchievementCreateManyUserInputEnvelope
    set?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    disconnect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    delete?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    update?: UserAchievementUpdateWithWhereUniqueWithoutUserInput | UserAchievementUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserAchievementUpdateManyWithWhereWithoutUserInput | UserAchievementUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[]
  }

  export type AntiManipulationLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AntiManipulationLogCreateWithoutUserInput, AntiManipulationLogUncheckedCreateWithoutUserInput> | AntiManipulationLogCreateWithoutUserInput[] | AntiManipulationLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AntiManipulationLogCreateOrConnectWithoutUserInput | AntiManipulationLogCreateOrConnectWithoutUserInput[]
    upsert?: AntiManipulationLogUpsertWithWhereUniqueWithoutUserInput | AntiManipulationLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AntiManipulationLogCreateManyUserInputEnvelope
    set?: AntiManipulationLogWhereUniqueInput | AntiManipulationLogWhereUniqueInput[]
    disconnect?: AntiManipulationLogWhereUniqueInput | AntiManipulationLogWhereUniqueInput[]
    delete?: AntiManipulationLogWhereUniqueInput | AntiManipulationLogWhereUniqueInput[]
    connect?: AntiManipulationLogWhereUniqueInput | AntiManipulationLogWhereUniqueInput[]
    update?: AntiManipulationLogUpdateWithWhereUniqueWithoutUserInput | AntiManipulationLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AntiManipulationLogUpdateManyWithWhereWithoutUserInput | AntiManipulationLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AntiManipulationLogScalarWhereInput | AntiManipulationLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCreatedTokensInput = {
    create?: XOR<UserCreateWithoutCreatedTokensInput, UserUncheckedCreateWithoutCreatedTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedTokensInput
    connect?: UserWhereUniqueInput
  }

  export type TradeCreateNestedManyWithoutTokenInput = {
    create?: XOR<TradeCreateWithoutTokenInput, TradeUncheckedCreateWithoutTokenInput> | TradeCreateWithoutTokenInput[] | TradeUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutTokenInput | TradeCreateOrConnectWithoutTokenInput[]
    createMany?: TradeCreateManyTokenInputEnvelope
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
  }

  export type TradeUncheckedCreateNestedManyWithoutTokenInput = {
    create?: XOR<TradeCreateWithoutTokenInput, TradeUncheckedCreateWithoutTokenInput> | TradeCreateWithoutTokenInput[] | TradeUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutTokenInput | TradeCreateOrConnectWithoutTokenInput[]
    createMany?: TradeCreateManyTokenInputEnvelope
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type UserUpdateOneRequiredWithoutCreatedTokensNestedInput = {
    create?: XOR<UserCreateWithoutCreatedTokensInput, UserUncheckedCreateWithoutCreatedTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedTokensInput
    upsert?: UserUpsertWithoutCreatedTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedTokensInput, UserUpdateWithoutCreatedTokensInput>, UserUncheckedUpdateWithoutCreatedTokensInput>
  }

  export type TradeUpdateManyWithoutTokenNestedInput = {
    create?: XOR<TradeCreateWithoutTokenInput, TradeUncheckedCreateWithoutTokenInput> | TradeCreateWithoutTokenInput[] | TradeUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutTokenInput | TradeCreateOrConnectWithoutTokenInput[]
    upsert?: TradeUpsertWithWhereUniqueWithoutTokenInput | TradeUpsertWithWhereUniqueWithoutTokenInput[]
    createMany?: TradeCreateManyTokenInputEnvelope
    set?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    disconnect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    delete?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    update?: TradeUpdateWithWhereUniqueWithoutTokenInput | TradeUpdateWithWhereUniqueWithoutTokenInput[]
    updateMany?: TradeUpdateManyWithWhereWithoutTokenInput | TradeUpdateManyWithWhereWithoutTokenInput[]
    deleteMany?: TradeScalarWhereInput | TradeScalarWhereInput[]
  }

  export type TradeUncheckedUpdateManyWithoutTokenNestedInput = {
    create?: XOR<TradeCreateWithoutTokenInput, TradeUncheckedCreateWithoutTokenInput> | TradeCreateWithoutTokenInput[] | TradeUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutTokenInput | TradeCreateOrConnectWithoutTokenInput[]
    upsert?: TradeUpsertWithWhereUniqueWithoutTokenInput | TradeUpsertWithWhereUniqueWithoutTokenInput[]
    createMany?: TradeCreateManyTokenInputEnvelope
    set?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    disconnect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    delete?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    update?: TradeUpdateWithWhereUniqueWithoutTokenInput | TradeUpdateWithWhereUniqueWithoutTokenInput[]
    updateMany?: TradeUpdateManyWithWhereWithoutTokenInput | TradeUpdateManyWithWhereWithoutTokenInput[]
    deleteMany?: TradeScalarWhereInput | TradeScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTradesInput = {
    create?: XOR<UserCreateWithoutTradesInput, UserUncheckedCreateWithoutTradesInput>
    connectOrCreate?: UserCreateOrConnectWithoutTradesInput
    connect?: UserWhereUniqueInput
  }

  export type TokenCreateNestedOneWithoutTradesInput = {
    create?: XOR<TokenCreateWithoutTradesInput, TokenUncheckedCreateWithoutTradesInput>
    connectOrCreate?: TokenCreateOrConnectWithoutTradesInput
    connect?: TokenWhereUniqueInput
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type UserUpdateOneRequiredWithoutTradesNestedInput = {
    create?: XOR<UserCreateWithoutTradesInput, UserUncheckedCreateWithoutTradesInput>
    connectOrCreate?: UserCreateOrConnectWithoutTradesInput
    upsert?: UserUpsertWithoutTradesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTradesInput, UserUpdateWithoutTradesInput>, UserUncheckedUpdateWithoutTradesInput>
  }

  export type TokenUpdateOneRequiredWithoutTradesNestedInput = {
    create?: XOR<TokenCreateWithoutTradesInput, TokenUncheckedCreateWithoutTradesInput>
    connectOrCreate?: TokenCreateOrConnectWithoutTradesInput
    upsert?: TokenUpsertWithoutTradesInput
    connect?: TokenWhereUniqueInput
    update?: XOR<XOR<TokenUpdateToOneWithWhereWithoutTradesInput, TokenUpdateWithoutTradesInput>, TokenUncheckedUpdateWithoutTradesInput>
  }

  export type UserReputationQuestCreateNestedManyWithoutQuestInput = {
    create?: XOR<UserReputationQuestCreateWithoutQuestInput, UserReputationQuestUncheckedCreateWithoutQuestInput> | UserReputationQuestCreateWithoutQuestInput[] | UserReputationQuestUncheckedCreateWithoutQuestInput[]
    connectOrCreate?: UserReputationQuestCreateOrConnectWithoutQuestInput | UserReputationQuestCreateOrConnectWithoutQuestInput[]
    createMany?: UserReputationQuestCreateManyQuestInputEnvelope
    connect?: UserReputationQuestWhereUniqueInput | UserReputationQuestWhereUniqueInput[]
  }

  export type UserReputationQuestUncheckedCreateNestedManyWithoutQuestInput = {
    create?: XOR<UserReputationQuestCreateWithoutQuestInput, UserReputationQuestUncheckedCreateWithoutQuestInput> | UserReputationQuestCreateWithoutQuestInput[] | UserReputationQuestUncheckedCreateWithoutQuestInput[]
    connectOrCreate?: UserReputationQuestCreateOrConnectWithoutQuestInput | UserReputationQuestCreateOrConnectWithoutQuestInput[]
    createMany?: UserReputationQuestCreateManyQuestInputEnvelope
    connect?: UserReputationQuestWhereUniqueInput | UserReputationQuestWhereUniqueInput[]
  }

  export type UserReputationQuestUpdateManyWithoutQuestNestedInput = {
    create?: XOR<UserReputationQuestCreateWithoutQuestInput, UserReputationQuestUncheckedCreateWithoutQuestInput> | UserReputationQuestCreateWithoutQuestInput[] | UserReputationQuestUncheckedCreateWithoutQuestInput[]
    connectOrCreate?: UserReputationQuestCreateOrConnectWithoutQuestInput | UserReputationQuestCreateOrConnectWithoutQuestInput[]
    upsert?: UserReputationQuestUpsertWithWhereUniqueWithoutQuestInput | UserReputationQuestUpsertWithWhereUniqueWithoutQuestInput[]
    createMany?: UserReputationQuestCreateManyQuestInputEnvelope
    set?: UserReputationQuestWhereUniqueInput | UserReputationQuestWhereUniqueInput[]
    disconnect?: UserReputationQuestWhereUniqueInput | UserReputationQuestWhereUniqueInput[]
    delete?: UserReputationQuestWhereUniqueInput | UserReputationQuestWhereUniqueInput[]
    connect?: UserReputationQuestWhereUniqueInput | UserReputationQuestWhereUniqueInput[]
    update?: UserReputationQuestUpdateWithWhereUniqueWithoutQuestInput | UserReputationQuestUpdateWithWhereUniqueWithoutQuestInput[]
    updateMany?: UserReputationQuestUpdateManyWithWhereWithoutQuestInput | UserReputationQuestUpdateManyWithWhereWithoutQuestInput[]
    deleteMany?: UserReputationQuestScalarWhereInput | UserReputationQuestScalarWhereInput[]
  }

  export type UserReputationQuestUncheckedUpdateManyWithoutQuestNestedInput = {
    create?: XOR<UserReputationQuestCreateWithoutQuestInput, UserReputationQuestUncheckedCreateWithoutQuestInput> | UserReputationQuestCreateWithoutQuestInput[] | UserReputationQuestUncheckedCreateWithoutQuestInput[]
    connectOrCreate?: UserReputationQuestCreateOrConnectWithoutQuestInput | UserReputationQuestCreateOrConnectWithoutQuestInput[]
    upsert?: UserReputationQuestUpsertWithWhereUniqueWithoutQuestInput | UserReputationQuestUpsertWithWhereUniqueWithoutQuestInput[]
    createMany?: UserReputationQuestCreateManyQuestInputEnvelope
    set?: UserReputationQuestWhereUniqueInput | UserReputationQuestWhereUniqueInput[]
    disconnect?: UserReputationQuestWhereUniqueInput | UserReputationQuestWhereUniqueInput[]
    delete?: UserReputationQuestWhereUniqueInput | UserReputationQuestWhereUniqueInput[]
    connect?: UserReputationQuestWhereUniqueInput | UserReputationQuestWhereUniqueInput[]
    update?: UserReputationQuestUpdateWithWhereUniqueWithoutQuestInput | UserReputationQuestUpdateWithWhereUniqueWithoutQuestInput[]
    updateMany?: UserReputationQuestUpdateManyWithWhereWithoutQuestInput | UserReputationQuestUpdateManyWithWhereWithoutQuestInput[]
    deleteMany?: UserReputationQuestScalarWhereInput | UserReputationQuestScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutReputationQuestsInput = {
    create?: XOR<UserCreateWithoutReputationQuestsInput, UserUncheckedCreateWithoutReputationQuestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReputationQuestsInput
    connect?: UserWhereUniqueInput
  }

  export type ReputationQuestCreateNestedOneWithoutUserProgressInput = {
    create?: XOR<ReputationQuestCreateWithoutUserProgressInput, ReputationQuestUncheckedCreateWithoutUserProgressInput>
    connectOrCreate?: ReputationQuestCreateOrConnectWithoutUserProgressInput
    connect?: ReputationQuestWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutReputationQuestsNestedInput = {
    create?: XOR<UserCreateWithoutReputationQuestsInput, UserUncheckedCreateWithoutReputationQuestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReputationQuestsInput
    upsert?: UserUpsertWithoutReputationQuestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReputationQuestsInput, UserUpdateWithoutReputationQuestsInput>, UserUncheckedUpdateWithoutReputationQuestsInput>
  }

  export type ReputationQuestUpdateOneRequiredWithoutUserProgressNestedInput = {
    create?: XOR<ReputationQuestCreateWithoutUserProgressInput, ReputationQuestUncheckedCreateWithoutUserProgressInput>
    connectOrCreate?: ReputationQuestCreateOrConnectWithoutUserProgressInput
    upsert?: ReputationQuestUpsertWithoutUserProgressInput
    connect?: ReputationQuestWhereUniqueInput
    update?: XOR<XOR<ReputationQuestUpdateToOneWithWhereWithoutUserProgressInput, ReputationQuestUpdateWithoutUserProgressInput>, ReputationQuestUncheckedUpdateWithoutUserProgressInput>
  }

  export type UserAchievementCreateNestedManyWithoutAchievementInput = {
    create?: XOR<UserAchievementCreateWithoutAchievementInput, UserAchievementUncheckedCreateWithoutAchievementInput> | UserAchievementCreateWithoutAchievementInput[] | UserAchievementUncheckedCreateWithoutAchievementInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutAchievementInput | UserAchievementCreateOrConnectWithoutAchievementInput[]
    createMany?: UserAchievementCreateManyAchievementInputEnvelope
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
  }

  export type UserAchievementUncheckedCreateNestedManyWithoutAchievementInput = {
    create?: XOR<UserAchievementCreateWithoutAchievementInput, UserAchievementUncheckedCreateWithoutAchievementInput> | UserAchievementCreateWithoutAchievementInput[] | UserAchievementUncheckedCreateWithoutAchievementInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutAchievementInput | UserAchievementCreateOrConnectWithoutAchievementInput[]
    createMany?: UserAchievementCreateManyAchievementInputEnvelope
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
  }

  export type UserAchievementUpdateManyWithoutAchievementNestedInput = {
    create?: XOR<UserAchievementCreateWithoutAchievementInput, UserAchievementUncheckedCreateWithoutAchievementInput> | UserAchievementCreateWithoutAchievementInput[] | UserAchievementUncheckedCreateWithoutAchievementInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutAchievementInput | UserAchievementCreateOrConnectWithoutAchievementInput[]
    upsert?: UserAchievementUpsertWithWhereUniqueWithoutAchievementInput | UserAchievementUpsertWithWhereUniqueWithoutAchievementInput[]
    createMany?: UserAchievementCreateManyAchievementInputEnvelope
    set?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    disconnect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    delete?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    update?: UserAchievementUpdateWithWhereUniqueWithoutAchievementInput | UserAchievementUpdateWithWhereUniqueWithoutAchievementInput[]
    updateMany?: UserAchievementUpdateManyWithWhereWithoutAchievementInput | UserAchievementUpdateManyWithWhereWithoutAchievementInput[]
    deleteMany?: UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[]
  }

  export type UserAchievementUncheckedUpdateManyWithoutAchievementNestedInput = {
    create?: XOR<UserAchievementCreateWithoutAchievementInput, UserAchievementUncheckedCreateWithoutAchievementInput> | UserAchievementCreateWithoutAchievementInput[] | UserAchievementUncheckedCreateWithoutAchievementInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutAchievementInput | UserAchievementCreateOrConnectWithoutAchievementInput[]
    upsert?: UserAchievementUpsertWithWhereUniqueWithoutAchievementInput | UserAchievementUpsertWithWhereUniqueWithoutAchievementInput[]
    createMany?: UserAchievementCreateManyAchievementInputEnvelope
    set?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    disconnect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    delete?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    update?: UserAchievementUpdateWithWhereUniqueWithoutAchievementInput | UserAchievementUpdateWithWhereUniqueWithoutAchievementInput[]
    updateMany?: UserAchievementUpdateManyWithWhereWithoutAchievementInput | UserAchievementUpdateManyWithWhereWithoutAchievementInput[]
    deleteMany?: UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAchievementsInput = {
    create?: XOR<UserCreateWithoutAchievementsInput, UserUncheckedCreateWithoutAchievementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAchievementsInput
    connect?: UserWhereUniqueInput
  }

  export type AchievementCreateNestedOneWithoutUserAchievementsInput = {
    create?: XOR<AchievementCreateWithoutUserAchievementsInput, AchievementUncheckedCreateWithoutUserAchievementsInput>
    connectOrCreate?: AchievementCreateOrConnectWithoutUserAchievementsInput
    connect?: AchievementWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAchievementsNestedInput = {
    create?: XOR<UserCreateWithoutAchievementsInput, UserUncheckedCreateWithoutAchievementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAchievementsInput
    upsert?: UserUpsertWithoutAchievementsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAchievementsInput, UserUpdateWithoutAchievementsInput>, UserUncheckedUpdateWithoutAchievementsInput>
  }

  export type AchievementUpdateOneRequiredWithoutUserAchievementsNestedInput = {
    create?: XOR<AchievementCreateWithoutUserAchievementsInput, AchievementUncheckedCreateWithoutUserAchievementsInput>
    connectOrCreate?: AchievementCreateOrConnectWithoutUserAchievementsInput
    upsert?: AchievementUpsertWithoutUserAchievementsInput
    connect?: AchievementWhereUniqueInput
    update?: XOR<XOR<AchievementUpdateToOneWithWhereWithoutUserAchievementsInput, AchievementUpdateWithoutUserAchievementsInput>, AchievementUncheckedUpdateWithoutUserAchievementsInput>
  }

  export type UserCreateNestedOneWithoutAntiManipulationLogsInput = {
    create?: XOR<UserCreateWithoutAntiManipulationLogsInput, UserUncheckedCreateWithoutAntiManipulationLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAntiManipulationLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAntiManipulationLogsNestedInput = {
    create?: XOR<UserCreateWithoutAntiManipulationLogsInput, UserUncheckedCreateWithoutAntiManipulationLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAntiManipulationLogsInput
    upsert?: UserUpsertWithoutAntiManipulationLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAntiManipulationLogsInput, UserUpdateWithoutAntiManipulationLogsInput>, UserUncheckedUpdateWithoutAntiManipulationLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type TradeCreateWithoutUserInput = {
    id?: string
    type: string
    amount: number
    price: number
    totalValue: number
    blockNumber?: bigint | number | null
    transactionHash?: string | null
    riskScore?: number
    isSuspicious?: boolean
    manipulationFlags?: string | null
    createdAt?: Date | string
    token: TokenCreateNestedOneWithoutTradesInput
  }

  export type TradeUncheckedCreateWithoutUserInput = {
    id?: string
    tokenAddress: string
    type: string
    amount: number
    price: number
    totalValue: number
    blockNumber?: bigint | number | null
    transactionHash?: string | null
    riskScore?: number
    isSuspicious?: boolean
    manipulationFlags?: string | null
    createdAt?: Date | string
  }

  export type TradeCreateOrConnectWithoutUserInput = {
    where: TradeWhereUniqueInput
    create: XOR<TradeCreateWithoutUserInput, TradeUncheckedCreateWithoutUserInput>
  }

  export type TradeCreateManyUserInputEnvelope = {
    data: TradeCreateManyUserInput | TradeCreateManyUserInput[]
  }

  export type TokenCreateWithoutCreatorInput = {
    address: string
    name: string
    symbol: string
    description: string
    imageUrl?: string | null
    initialPrice: number
    priceIncrement: number
    maxSupply: bigint | number
    currentSupply?: bigint | number
    currentPrice: number
    totalVolume?: number
    totalTrades?: number
    marketCap?: number
    status?: string
    launchDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeCreateNestedManyWithoutTokenInput
  }

  export type TokenUncheckedCreateWithoutCreatorInput = {
    address: string
    name: string
    symbol: string
    description: string
    imageUrl?: string | null
    initialPrice: number
    priceIncrement: number
    maxSupply: bigint | number
    currentSupply?: bigint | number
    currentPrice: number
    totalVolume?: number
    totalTrades?: number
    marketCap?: number
    status?: string
    launchDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeUncheckedCreateNestedManyWithoutTokenInput
  }

  export type TokenCreateOrConnectWithoutCreatorInput = {
    where: TokenWhereUniqueInput
    create: XOR<TokenCreateWithoutCreatorInput, TokenUncheckedCreateWithoutCreatorInput>
  }

  export type TokenCreateManyCreatorInputEnvelope = {
    data: TokenCreateManyCreatorInput | TokenCreateManyCreatorInput[]
  }

  export type UserReputationQuestCreateWithoutUserInput = {
    id?: string
    progress?: number
    isCompleted?: boolean
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    quest: ReputationQuestCreateNestedOneWithoutUserProgressInput
  }

  export type UserReputationQuestUncheckedCreateWithoutUserInput = {
    id?: string
    questId: string
    progress?: number
    isCompleted?: boolean
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserReputationQuestCreateOrConnectWithoutUserInput = {
    where: UserReputationQuestWhereUniqueInput
    create: XOR<UserReputationQuestCreateWithoutUserInput, UserReputationQuestUncheckedCreateWithoutUserInput>
  }

  export type UserReputationQuestCreateManyUserInputEnvelope = {
    data: UserReputationQuestCreateManyUserInput | UserReputationQuestCreateManyUserInput[]
  }

  export type UserAchievementCreateWithoutUserInput = {
    id?: string
    unlockedAt?: Date | string
    achievement: AchievementCreateNestedOneWithoutUserAchievementsInput
  }

  export type UserAchievementUncheckedCreateWithoutUserInput = {
    id?: string
    achievementId: string
    unlockedAt?: Date | string
  }

  export type UserAchievementCreateOrConnectWithoutUserInput = {
    where: UserAchievementWhereUniqueInput
    create: XOR<UserAchievementCreateWithoutUserInput, UserAchievementUncheckedCreateWithoutUserInput>
  }

  export type UserAchievementCreateManyUserInputEnvelope = {
    data: UserAchievementCreateManyUserInput | UserAchievementCreateManyUserInput[]
  }

  export type AntiManipulationLogCreateWithoutUserInput = {
    id?: string
    activityType: string
    riskScore: number
    flags: string
    details?: string | null
    isResolved?: boolean
    resolvedAt?: Date | string | null
    resolvedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AntiManipulationLogUncheckedCreateWithoutUserInput = {
    id?: string
    activityType: string
    riskScore: number
    flags: string
    details?: string | null
    isResolved?: boolean
    resolvedAt?: Date | string | null
    resolvedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AntiManipulationLogCreateOrConnectWithoutUserInput = {
    where: AntiManipulationLogWhereUniqueInput
    create: XOR<AntiManipulationLogCreateWithoutUserInput, AntiManipulationLogUncheckedCreateWithoutUserInput>
  }

  export type AntiManipulationLogCreateManyUserInputEnvelope = {
    data: AntiManipulationLogCreateManyUserInput | AntiManipulationLogCreateManyUserInput[]
  }

  export type TradeUpsertWithWhereUniqueWithoutUserInput = {
    where: TradeWhereUniqueInput
    update: XOR<TradeUpdateWithoutUserInput, TradeUncheckedUpdateWithoutUserInput>
    create: XOR<TradeCreateWithoutUserInput, TradeUncheckedCreateWithoutUserInput>
  }

  export type TradeUpdateWithWhereUniqueWithoutUserInput = {
    where: TradeWhereUniqueInput
    data: XOR<TradeUpdateWithoutUserInput, TradeUncheckedUpdateWithoutUserInput>
  }

  export type TradeUpdateManyWithWhereWithoutUserInput = {
    where: TradeScalarWhereInput
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyWithoutUserInput>
  }

  export type TradeScalarWhereInput = {
    AND?: TradeScalarWhereInput | TradeScalarWhereInput[]
    OR?: TradeScalarWhereInput[]
    NOT?: TradeScalarWhereInput | TradeScalarWhereInput[]
    id?: StringFilter<"Trade"> | string
    userAddress?: StringFilter<"Trade"> | string
    tokenAddress?: StringFilter<"Trade"> | string
    type?: StringFilter<"Trade"> | string
    amount?: FloatFilter<"Trade"> | number
    price?: FloatFilter<"Trade"> | number
    totalValue?: FloatFilter<"Trade"> | number
    blockNumber?: BigIntNullableFilter<"Trade"> | bigint | number | null
    transactionHash?: StringNullableFilter<"Trade"> | string | null
    riskScore?: FloatFilter<"Trade"> | number
    isSuspicious?: BoolFilter<"Trade"> | boolean
    manipulationFlags?: StringNullableFilter<"Trade"> | string | null
    createdAt?: DateTimeFilter<"Trade"> | Date | string
  }

  export type TokenUpsertWithWhereUniqueWithoutCreatorInput = {
    where: TokenWhereUniqueInput
    update: XOR<TokenUpdateWithoutCreatorInput, TokenUncheckedUpdateWithoutCreatorInput>
    create: XOR<TokenCreateWithoutCreatorInput, TokenUncheckedCreateWithoutCreatorInput>
  }

  export type TokenUpdateWithWhereUniqueWithoutCreatorInput = {
    where: TokenWhereUniqueInput
    data: XOR<TokenUpdateWithoutCreatorInput, TokenUncheckedUpdateWithoutCreatorInput>
  }

  export type TokenUpdateManyWithWhereWithoutCreatorInput = {
    where: TokenScalarWhereInput
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyWithoutCreatorInput>
  }

  export type TokenScalarWhereInput = {
    AND?: TokenScalarWhereInput | TokenScalarWhereInput[]
    OR?: TokenScalarWhereInput[]
    NOT?: TokenScalarWhereInput | TokenScalarWhereInput[]
    address?: StringFilter<"Token"> | string
    name?: StringFilter<"Token"> | string
    symbol?: StringFilter<"Token"> | string
    description?: StringFilter<"Token"> | string
    imageUrl?: StringNullableFilter<"Token"> | string | null
    creatorAddress?: StringFilter<"Token"> | string
    initialPrice?: FloatFilter<"Token"> | number
    priceIncrement?: FloatFilter<"Token"> | number
    maxSupply?: BigIntFilter<"Token"> | bigint | number
    currentSupply?: BigIntFilter<"Token"> | bigint | number
    currentPrice?: FloatFilter<"Token"> | number
    totalVolume?: FloatFilter<"Token"> | number
    totalTrades?: IntFilter<"Token"> | number
    marketCap?: FloatFilter<"Token"> | number
    status?: StringFilter<"Token"> | string
    launchDate?: DateTimeFilter<"Token"> | Date | string
    createdAt?: DateTimeFilter<"Token"> | Date | string
    updatedAt?: DateTimeFilter<"Token"> | Date | string
  }

  export type UserReputationQuestUpsertWithWhereUniqueWithoutUserInput = {
    where: UserReputationQuestWhereUniqueInput
    update: XOR<UserReputationQuestUpdateWithoutUserInput, UserReputationQuestUncheckedUpdateWithoutUserInput>
    create: XOR<UserReputationQuestCreateWithoutUserInput, UserReputationQuestUncheckedCreateWithoutUserInput>
  }

  export type UserReputationQuestUpdateWithWhereUniqueWithoutUserInput = {
    where: UserReputationQuestWhereUniqueInput
    data: XOR<UserReputationQuestUpdateWithoutUserInput, UserReputationQuestUncheckedUpdateWithoutUserInput>
  }

  export type UserReputationQuestUpdateManyWithWhereWithoutUserInput = {
    where: UserReputationQuestScalarWhereInput
    data: XOR<UserReputationQuestUpdateManyMutationInput, UserReputationQuestUncheckedUpdateManyWithoutUserInput>
  }

  export type UserReputationQuestScalarWhereInput = {
    AND?: UserReputationQuestScalarWhereInput | UserReputationQuestScalarWhereInput[]
    OR?: UserReputationQuestScalarWhereInput[]
    NOT?: UserReputationQuestScalarWhereInput | UserReputationQuestScalarWhereInput[]
    id?: StringFilter<"UserReputationQuest"> | string
    userAddress?: StringFilter<"UserReputationQuest"> | string
    questId?: StringFilter<"UserReputationQuest"> | string
    progress?: FloatFilter<"UserReputationQuest"> | number
    isCompleted?: BoolFilter<"UserReputationQuest"> | boolean
    completedAt?: DateTimeNullableFilter<"UserReputationQuest"> | Date | string | null
    createdAt?: DateTimeFilter<"UserReputationQuest"> | Date | string
    updatedAt?: DateTimeFilter<"UserReputationQuest"> | Date | string
  }

  export type UserAchievementUpsertWithWhereUniqueWithoutUserInput = {
    where: UserAchievementWhereUniqueInput
    update: XOR<UserAchievementUpdateWithoutUserInput, UserAchievementUncheckedUpdateWithoutUserInput>
    create: XOR<UserAchievementCreateWithoutUserInput, UserAchievementUncheckedCreateWithoutUserInput>
  }

  export type UserAchievementUpdateWithWhereUniqueWithoutUserInput = {
    where: UserAchievementWhereUniqueInput
    data: XOR<UserAchievementUpdateWithoutUserInput, UserAchievementUncheckedUpdateWithoutUserInput>
  }

  export type UserAchievementUpdateManyWithWhereWithoutUserInput = {
    where: UserAchievementScalarWhereInput
    data: XOR<UserAchievementUpdateManyMutationInput, UserAchievementUncheckedUpdateManyWithoutUserInput>
  }

  export type UserAchievementScalarWhereInput = {
    AND?: UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[]
    OR?: UserAchievementScalarWhereInput[]
    NOT?: UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[]
    id?: StringFilter<"UserAchievement"> | string
    userAddress?: StringFilter<"UserAchievement"> | string
    achievementId?: StringFilter<"UserAchievement"> | string
    unlockedAt?: DateTimeFilter<"UserAchievement"> | Date | string
  }

  export type AntiManipulationLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AntiManipulationLogWhereUniqueInput
    update: XOR<AntiManipulationLogUpdateWithoutUserInput, AntiManipulationLogUncheckedUpdateWithoutUserInput>
    create: XOR<AntiManipulationLogCreateWithoutUserInput, AntiManipulationLogUncheckedCreateWithoutUserInput>
  }

  export type AntiManipulationLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AntiManipulationLogWhereUniqueInput
    data: XOR<AntiManipulationLogUpdateWithoutUserInput, AntiManipulationLogUncheckedUpdateWithoutUserInput>
  }

  export type AntiManipulationLogUpdateManyWithWhereWithoutUserInput = {
    where: AntiManipulationLogScalarWhereInput
    data: XOR<AntiManipulationLogUpdateManyMutationInput, AntiManipulationLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AntiManipulationLogScalarWhereInput = {
    AND?: AntiManipulationLogScalarWhereInput | AntiManipulationLogScalarWhereInput[]
    OR?: AntiManipulationLogScalarWhereInput[]
    NOT?: AntiManipulationLogScalarWhereInput | AntiManipulationLogScalarWhereInput[]
    id?: StringFilter<"AntiManipulationLog"> | string
    userAddress?: StringFilter<"AntiManipulationLog"> | string
    activityType?: StringFilter<"AntiManipulationLog"> | string
    riskScore?: FloatFilter<"AntiManipulationLog"> | number
    flags?: StringFilter<"AntiManipulationLog"> | string
    details?: StringNullableFilter<"AntiManipulationLog"> | string | null
    isResolved?: BoolFilter<"AntiManipulationLog"> | boolean
    resolvedAt?: DateTimeNullableFilter<"AntiManipulationLog"> | Date | string | null
    resolvedBy?: StringNullableFilter<"AntiManipulationLog"> | string | null
    createdAt?: DateTimeFilter<"AntiManipulationLog"> | Date | string
    updatedAt?: DateTimeFilter<"AntiManipulationLog"> | Date | string
  }

  export type UserCreateWithoutCreatedTokensInput = {
    walletAddress: string
    worldIdHash?: string | null
    verificationLevel?: string
    reputationScore?: number
    reputationLevel?: string
    totalTrades?: number
    totalVolume?: number
    lastActivity?: Date | string
    isBanned?: boolean
    riskScore?: number
    allocationCap?: number
    usedAllocation?: number
    marketCap?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeCreateNestedManyWithoutUserInput
    reputationQuests?: UserReputationQuestCreateNestedManyWithoutUserInput
    achievements?: UserAchievementCreateNestedManyWithoutUserInput
    antiManipulationLogs?: AntiManipulationLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCreatedTokensInput = {
    walletAddress: string
    worldIdHash?: string | null
    verificationLevel?: string
    reputationScore?: number
    reputationLevel?: string
    totalTrades?: number
    totalVolume?: number
    lastActivity?: Date | string
    isBanned?: boolean
    riskScore?: number
    allocationCap?: number
    usedAllocation?: number
    marketCap?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeUncheckedCreateNestedManyWithoutUserInput
    reputationQuests?: UserReputationQuestUncheckedCreateNestedManyWithoutUserInput
    achievements?: UserAchievementUncheckedCreateNestedManyWithoutUserInput
    antiManipulationLogs?: AntiManipulationLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCreatedTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedTokensInput, UserUncheckedCreateWithoutCreatedTokensInput>
  }

  export type TradeCreateWithoutTokenInput = {
    id?: string
    type: string
    amount: number
    price: number
    totalValue: number
    blockNumber?: bigint | number | null
    transactionHash?: string | null
    riskScore?: number
    isSuspicious?: boolean
    manipulationFlags?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTradesInput
  }

  export type TradeUncheckedCreateWithoutTokenInput = {
    id?: string
    userAddress: string
    type: string
    amount: number
    price: number
    totalValue: number
    blockNumber?: bigint | number | null
    transactionHash?: string | null
    riskScore?: number
    isSuspicious?: boolean
    manipulationFlags?: string | null
    createdAt?: Date | string
  }

  export type TradeCreateOrConnectWithoutTokenInput = {
    where: TradeWhereUniqueInput
    create: XOR<TradeCreateWithoutTokenInput, TradeUncheckedCreateWithoutTokenInput>
  }

  export type TradeCreateManyTokenInputEnvelope = {
    data: TradeCreateManyTokenInput | TradeCreateManyTokenInput[]
  }

  export type UserUpsertWithoutCreatedTokensInput = {
    update: XOR<UserUpdateWithoutCreatedTokensInput, UserUncheckedUpdateWithoutCreatedTokensInput>
    create: XOR<UserCreateWithoutCreatedTokensInput, UserUncheckedCreateWithoutCreatedTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedTokensInput, UserUncheckedUpdateWithoutCreatedTokensInput>
  }

  export type UserUpdateWithoutCreatedTokensInput = {
    walletAddress?: StringFieldUpdateOperationsInput | string
    worldIdHash?: NullableStringFieldUpdateOperationsInput | string | null
    verificationLevel?: StringFieldUpdateOperationsInput | string
    reputationScore?: IntFieldUpdateOperationsInput | number
    reputationLevel?: StringFieldUpdateOperationsInput | string
    totalTrades?: IntFieldUpdateOperationsInput | number
    totalVolume?: FloatFieldUpdateOperationsInput | number
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    riskScore?: FloatFieldUpdateOperationsInput | number
    allocationCap?: FloatFieldUpdateOperationsInput | number
    usedAllocation?: FloatFieldUpdateOperationsInput | number
    marketCap?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUpdateManyWithoutUserNestedInput
    reputationQuests?: UserReputationQuestUpdateManyWithoutUserNestedInput
    achievements?: UserAchievementUpdateManyWithoutUserNestedInput
    antiManipulationLogs?: AntiManipulationLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedTokensInput = {
    walletAddress?: StringFieldUpdateOperationsInput | string
    worldIdHash?: NullableStringFieldUpdateOperationsInput | string | null
    verificationLevel?: StringFieldUpdateOperationsInput | string
    reputationScore?: IntFieldUpdateOperationsInput | number
    reputationLevel?: StringFieldUpdateOperationsInput | string
    totalTrades?: IntFieldUpdateOperationsInput | number
    totalVolume?: FloatFieldUpdateOperationsInput | number
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    riskScore?: FloatFieldUpdateOperationsInput | number
    allocationCap?: FloatFieldUpdateOperationsInput | number
    usedAllocation?: FloatFieldUpdateOperationsInput | number
    marketCap?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUncheckedUpdateManyWithoutUserNestedInput
    reputationQuests?: UserReputationQuestUncheckedUpdateManyWithoutUserNestedInput
    achievements?: UserAchievementUncheckedUpdateManyWithoutUserNestedInput
    antiManipulationLogs?: AntiManipulationLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TradeUpsertWithWhereUniqueWithoutTokenInput = {
    where: TradeWhereUniqueInput
    update: XOR<TradeUpdateWithoutTokenInput, TradeUncheckedUpdateWithoutTokenInput>
    create: XOR<TradeCreateWithoutTokenInput, TradeUncheckedCreateWithoutTokenInput>
  }

  export type TradeUpdateWithWhereUniqueWithoutTokenInput = {
    where: TradeWhereUniqueInput
    data: XOR<TradeUpdateWithoutTokenInput, TradeUncheckedUpdateWithoutTokenInput>
  }

  export type TradeUpdateManyWithWhereWithoutTokenInput = {
    where: TradeScalarWhereInput
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyWithoutTokenInput>
  }

  export type UserCreateWithoutTradesInput = {
    walletAddress: string
    worldIdHash?: string | null
    verificationLevel?: string
    reputationScore?: number
    reputationLevel?: string
    totalTrades?: number
    totalVolume?: number
    lastActivity?: Date | string
    isBanned?: boolean
    riskScore?: number
    allocationCap?: number
    usedAllocation?: number
    marketCap?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdTokens?: TokenCreateNestedManyWithoutCreatorInput
    reputationQuests?: UserReputationQuestCreateNestedManyWithoutUserInput
    achievements?: UserAchievementCreateNestedManyWithoutUserInput
    antiManipulationLogs?: AntiManipulationLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTradesInput = {
    walletAddress: string
    worldIdHash?: string | null
    verificationLevel?: string
    reputationScore?: number
    reputationLevel?: string
    totalTrades?: number
    totalVolume?: number
    lastActivity?: Date | string
    isBanned?: boolean
    riskScore?: number
    allocationCap?: number
    usedAllocation?: number
    marketCap?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdTokens?: TokenUncheckedCreateNestedManyWithoutCreatorInput
    reputationQuests?: UserReputationQuestUncheckedCreateNestedManyWithoutUserInput
    achievements?: UserAchievementUncheckedCreateNestedManyWithoutUserInput
    antiManipulationLogs?: AntiManipulationLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTradesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTradesInput, UserUncheckedCreateWithoutTradesInput>
  }

  export type TokenCreateWithoutTradesInput = {
    address: string
    name: string
    symbol: string
    description: string
    imageUrl?: string | null
    initialPrice: number
    priceIncrement: number
    maxSupply: bigint | number
    currentSupply?: bigint | number
    currentPrice: number
    totalVolume?: number
    totalTrades?: number
    marketCap?: number
    status?: string
    launchDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    creator: UserCreateNestedOneWithoutCreatedTokensInput
  }

  export type TokenUncheckedCreateWithoutTradesInput = {
    address: string
    name: string
    symbol: string
    description: string
    imageUrl?: string | null
    creatorAddress: string
    initialPrice: number
    priceIncrement: number
    maxSupply: bigint | number
    currentSupply?: bigint | number
    currentPrice: number
    totalVolume?: number
    totalTrades?: number
    marketCap?: number
    status?: string
    launchDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TokenCreateOrConnectWithoutTradesInput = {
    where: TokenWhereUniqueInput
    create: XOR<TokenCreateWithoutTradesInput, TokenUncheckedCreateWithoutTradesInput>
  }

  export type UserUpsertWithoutTradesInput = {
    update: XOR<UserUpdateWithoutTradesInput, UserUncheckedUpdateWithoutTradesInput>
    create: XOR<UserCreateWithoutTradesInput, UserUncheckedCreateWithoutTradesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTradesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTradesInput, UserUncheckedUpdateWithoutTradesInput>
  }

  export type UserUpdateWithoutTradesInput = {
    walletAddress?: StringFieldUpdateOperationsInput | string
    worldIdHash?: NullableStringFieldUpdateOperationsInput | string | null
    verificationLevel?: StringFieldUpdateOperationsInput | string
    reputationScore?: IntFieldUpdateOperationsInput | number
    reputationLevel?: StringFieldUpdateOperationsInput | string
    totalTrades?: IntFieldUpdateOperationsInput | number
    totalVolume?: FloatFieldUpdateOperationsInput | number
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    riskScore?: FloatFieldUpdateOperationsInput | number
    allocationCap?: FloatFieldUpdateOperationsInput | number
    usedAllocation?: FloatFieldUpdateOperationsInput | number
    marketCap?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdTokens?: TokenUpdateManyWithoutCreatorNestedInput
    reputationQuests?: UserReputationQuestUpdateManyWithoutUserNestedInput
    achievements?: UserAchievementUpdateManyWithoutUserNestedInput
    antiManipulationLogs?: AntiManipulationLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTradesInput = {
    walletAddress?: StringFieldUpdateOperationsInput | string
    worldIdHash?: NullableStringFieldUpdateOperationsInput | string | null
    verificationLevel?: StringFieldUpdateOperationsInput | string
    reputationScore?: IntFieldUpdateOperationsInput | number
    reputationLevel?: StringFieldUpdateOperationsInput | string
    totalTrades?: IntFieldUpdateOperationsInput | number
    totalVolume?: FloatFieldUpdateOperationsInput | number
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    riskScore?: FloatFieldUpdateOperationsInput | number
    allocationCap?: FloatFieldUpdateOperationsInput | number
    usedAllocation?: FloatFieldUpdateOperationsInput | number
    marketCap?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdTokens?: TokenUncheckedUpdateManyWithoutCreatorNestedInput
    reputationQuests?: UserReputationQuestUncheckedUpdateManyWithoutUserNestedInput
    achievements?: UserAchievementUncheckedUpdateManyWithoutUserNestedInput
    antiManipulationLogs?: AntiManipulationLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TokenUpsertWithoutTradesInput = {
    update: XOR<TokenUpdateWithoutTradesInput, TokenUncheckedUpdateWithoutTradesInput>
    create: XOR<TokenCreateWithoutTradesInput, TokenUncheckedCreateWithoutTradesInput>
    where?: TokenWhereInput
  }

  export type TokenUpdateToOneWithWhereWithoutTradesInput = {
    where?: TokenWhereInput
    data: XOR<TokenUpdateWithoutTradesInput, TokenUncheckedUpdateWithoutTradesInput>
  }

  export type TokenUpdateWithoutTradesInput = {
    address?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    initialPrice?: FloatFieldUpdateOperationsInput | number
    priceIncrement?: FloatFieldUpdateOperationsInput | number
    maxSupply?: BigIntFieldUpdateOperationsInput | bigint | number
    currentSupply?: BigIntFieldUpdateOperationsInput | bigint | number
    currentPrice?: FloatFieldUpdateOperationsInput | number
    totalVolume?: FloatFieldUpdateOperationsInput | number
    totalTrades?: IntFieldUpdateOperationsInput | number
    marketCap?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    launchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutCreatedTokensNestedInput
  }

  export type TokenUncheckedUpdateWithoutTradesInput = {
    address?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    creatorAddress?: StringFieldUpdateOperationsInput | string
    initialPrice?: FloatFieldUpdateOperationsInput | number
    priceIncrement?: FloatFieldUpdateOperationsInput | number
    maxSupply?: BigIntFieldUpdateOperationsInput | bigint | number
    currentSupply?: BigIntFieldUpdateOperationsInput | bigint | number
    currentPrice?: FloatFieldUpdateOperationsInput | number
    totalVolume?: FloatFieldUpdateOperationsInput | number
    totalTrades?: IntFieldUpdateOperationsInput | number
    marketCap?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    launchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserReputationQuestCreateWithoutQuestInput = {
    id?: string
    progress?: number
    isCompleted?: boolean
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutReputationQuestsInput
  }

  export type UserReputationQuestUncheckedCreateWithoutQuestInput = {
    id?: string
    userAddress: string
    progress?: number
    isCompleted?: boolean
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserReputationQuestCreateOrConnectWithoutQuestInput = {
    where: UserReputationQuestWhereUniqueInput
    create: XOR<UserReputationQuestCreateWithoutQuestInput, UserReputationQuestUncheckedCreateWithoutQuestInput>
  }

  export type UserReputationQuestCreateManyQuestInputEnvelope = {
    data: UserReputationQuestCreateManyQuestInput | UserReputationQuestCreateManyQuestInput[]
  }

  export type UserReputationQuestUpsertWithWhereUniqueWithoutQuestInput = {
    where: UserReputationQuestWhereUniqueInput
    update: XOR<UserReputationQuestUpdateWithoutQuestInput, UserReputationQuestUncheckedUpdateWithoutQuestInput>
    create: XOR<UserReputationQuestCreateWithoutQuestInput, UserReputationQuestUncheckedCreateWithoutQuestInput>
  }

  export type UserReputationQuestUpdateWithWhereUniqueWithoutQuestInput = {
    where: UserReputationQuestWhereUniqueInput
    data: XOR<UserReputationQuestUpdateWithoutQuestInput, UserReputationQuestUncheckedUpdateWithoutQuestInput>
  }

  export type UserReputationQuestUpdateManyWithWhereWithoutQuestInput = {
    where: UserReputationQuestScalarWhereInput
    data: XOR<UserReputationQuestUpdateManyMutationInput, UserReputationQuestUncheckedUpdateManyWithoutQuestInput>
  }

  export type UserCreateWithoutReputationQuestsInput = {
    walletAddress: string
    worldIdHash?: string | null
    verificationLevel?: string
    reputationScore?: number
    reputationLevel?: string
    totalTrades?: number
    totalVolume?: number
    lastActivity?: Date | string
    isBanned?: boolean
    riskScore?: number
    allocationCap?: number
    usedAllocation?: number
    marketCap?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeCreateNestedManyWithoutUserInput
    createdTokens?: TokenCreateNestedManyWithoutCreatorInput
    achievements?: UserAchievementCreateNestedManyWithoutUserInput
    antiManipulationLogs?: AntiManipulationLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReputationQuestsInput = {
    walletAddress: string
    worldIdHash?: string | null
    verificationLevel?: string
    reputationScore?: number
    reputationLevel?: string
    totalTrades?: number
    totalVolume?: number
    lastActivity?: Date | string
    isBanned?: boolean
    riskScore?: number
    allocationCap?: number
    usedAllocation?: number
    marketCap?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeUncheckedCreateNestedManyWithoutUserInput
    createdTokens?: TokenUncheckedCreateNestedManyWithoutCreatorInput
    achievements?: UserAchievementUncheckedCreateNestedManyWithoutUserInput
    antiManipulationLogs?: AntiManipulationLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReputationQuestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReputationQuestsInput, UserUncheckedCreateWithoutReputationQuestsInput>
  }

  export type ReputationQuestCreateWithoutUserProgressInput = {
    id?: string
    title: string
    description: string
    type: string
    targetValue: number
    reward: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReputationQuestUncheckedCreateWithoutUserProgressInput = {
    id?: string
    title: string
    description: string
    type: string
    targetValue: number
    reward: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReputationQuestCreateOrConnectWithoutUserProgressInput = {
    where: ReputationQuestWhereUniqueInput
    create: XOR<ReputationQuestCreateWithoutUserProgressInput, ReputationQuestUncheckedCreateWithoutUserProgressInput>
  }

  export type UserUpsertWithoutReputationQuestsInput = {
    update: XOR<UserUpdateWithoutReputationQuestsInput, UserUncheckedUpdateWithoutReputationQuestsInput>
    create: XOR<UserCreateWithoutReputationQuestsInput, UserUncheckedCreateWithoutReputationQuestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReputationQuestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReputationQuestsInput, UserUncheckedUpdateWithoutReputationQuestsInput>
  }

  export type UserUpdateWithoutReputationQuestsInput = {
    walletAddress?: StringFieldUpdateOperationsInput | string
    worldIdHash?: NullableStringFieldUpdateOperationsInput | string | null
    verificationLevel?: StringFieldUpdateOperationsInput | string
    reputationScore?: IntFieldUpdateOperationsInput | number
    reputationLevel?: StringFieldUpdateOperationsInput | string
    totalTrades?: IntFieldUpdateOperationsInput | number
    totalVolume?: FloatFieldUpdateOperationsInput | number
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    riskScore?: FloatFieldUpdateOperationsInput | number
    allocationCap?: FloatFieldUpdateOperationsInput | number
    usedAllocation?: FloatFieldUpdateOperationsInput | number
    marketCap?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUpdateManyWithoutUserNestedInput
    createdTokens?: TokenUpdateManyWithoutCreatorNestedInput
    achievements?: UserAchievementUpdateManyWithoutUserNestedInput
    antiManipulationLogs?: AntiManipulationLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReputationQuestsInput = {
    walletAddress?: StringFieldUpdateOperationsInput | string
    worldIdHash?: NullableStringFieldUpdateOperationsInput | string | null
    verificationLevel?: StringFieldUpdateOperationsInput | string
    reputationScore?: IntFieldUpdateOperationsInput | number
    reputationLevel?: StringFieldUpdateOperationsInput | string
    totalTrades?: IntFieldUpdateOperationsInput | number
    totalVolume?: FloatFieldUpdateOperationsInput | number
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    riskScore?: FloatFieldUpdateOperationsInput | number
    allocationCap?: FloatFieldUpdateOperationsInput | number
    usedAllocation?: FloatFieldUpdateOperationsInput | number
    marketCap?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUncheckedUpdateManyWithoutUserNestedInput
    createdTokens?: TokenUncheckedUpdateManyWithoutCreatorNestedInput
    achievements?: UserAchievementUncheckedUpdateManyWithoutUserNestedInput
    antiManipulationLogs?: AntiManipulationLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ReputationQuestUpsertWithoutUserProgressInput = {
    update: XOR<ReputationQuestUpdateWithoutUserProgressInput, ReputationQuestUncheckedUpdateWithoutUserProgressInput>
    create: XOR<ReputationQuestCreateWithoutUserProgressInput, ReputationQuestUncheckedCreateWithoutUserProgressInput>
    where?: ReputationQuestWhereInput
  }

  export type ReputationQuestUpdateToOneWithWhereWithoutUserProgressInput = {
    where?: ReputationQuestWhereInput
    data: XOR<ReputationQuestUpdateWithoutUserProgressInput, ReputationQuestUncheckedUpdateWithoutUserProgressInput>
  }

  export type ReputationQuestUpdateWithoutUserProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    targetValue?: FloatFieldUpdateOperationsInput | number
    reward?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReputationQuestUncheckedUpdateWithoutUserProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    targetValue?: FloatFieldUpdateOperationsInput | number
    reward?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAchievementCreateWithoutAchievementInput = {
    id?: string
    unlockedAt?: Date | string
    user: UserCreateNestedOneWithoutAchievementsInput
  }

  export type UserAchievementUncheckedCreateWithoutAchievementInput = {
    id?: string
    userAddress: string
    unlockedAt?: Date | string
  }

  export type UserAchievementCreateOrConnectWithoutAchievementInput = {
    where: UserAchievementWhereUniqueInput
    create: XOR<UserAchievementCreateWithoutAchievementInput, UserAchievementUncheckedCreateWithoutAchievementInput>
  }

  export type UserAchievementCreateManyAchievementInputEnvelope = {
    data: UserAchievementCreateManyAchievementInput | UserAchievementCreateManyAchievementInput[]
  }

  export type UserAchievementUpsertWithWhereUniqueWithoutAchievementInput = {
    where: UserAchievementWhereUniqueInput
    update: XOR<UserAchievementUpdateWithoutAchievementInput, UserAchievementUncheckedUpdateWithoutAchievementInput>
    create: XOR<UserAchievementCreateWithoutAchievementInput, UserAchievementUncheckedCreateWithoutAchievementInput>
  }

  export type UserAchievementUpdateWithWhereUniqueWithoutAchievementInput = {
    where: UserAchievementWhereUniqueInput
    data: XOR<UserAchievementUpdateWithoutAchievementInput, UserAchievementUncheckedUpdateWithoutAchievementInput>
  }

  export type UserAchievementUpdateManyWithWhereWithoutAchievementInput = {
    where: UserAchievementScalarWhereInput
    data: XOR<UserAchievementUpdateManyMutationInput, UserAchievementUncheckedUpdateManyWithoutAchievementInput>
  }

  export type UserCreateWithoutAchievementsInput = {
    walletAddress: string
    worldIdHash?: string | null
    verificationLevel?: string
    reputationScore?: number
    reputationLevel?: string
    totalTrades?: number
    totalVolume?: number
    lastActivity?: Date | string
    isBanned?: boolean
    riskScore?: number
    allocationCap?: number
    usedAllocation?: number
    marketCap?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeCreateNestedManyWithoutUserInput
    createdTokens?: TokenCreateNestedManyWithoutCreatorInput
    reputationQuests?: UserReputationQuestCreateNestedManyWithoutUserInput
    antiManipulationLogs?: AntiManipulationLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAchievementsInput = {
    walletAddress: string
    worldIdHash?: string | null
    verificationLevel?: string
    reputationScore?: number
    reputationLevel?: string
    totalTrades?: number
    totalVolume?: number
    lastActivity?: Date | string
    isBanned?: boolean
    riskScore?: number
    allocationCap?: number
    usedAllocation?: number
    marketCap?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeUncheckedCreateNestedManyWithoutUserInput
    createdTokens?: TokenUncheckedCreateNestedManyWithoutCreatorInput
    reputationQuests?: UserReputationQuestUncheckedCreateNestedManyWithoutUserInput
    antiManipulationLogs?: AntiManipulationLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAchievementsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAchievementsInput, UserUncheckedCreateWithoutAchievementsInput>
  }

  export type AchievementCreateWithoutUserAchievementsInput = {
    id?: string
    title: string
    description: string
    icon: string
    rarity: string
    requirements: string
    reward: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AchievementUncheckedCreateWithoutUserAchievementsInput = {
    id?: string
    title: string
    description: string
    icon: string
    rarity: string
    requirements: string
    reward: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AchievementCreateOrConnectWithoutUserAchievementsInput = {
    where: AchievementWhereUniqueInput
    create: XOR<AchievementCreateWithoutUserAchievementsInput, AchievementUncheckedCreateWithoutUserAchievementsInput>
  }

  export type UserUpsertWithoutAchievementsInput = {
    update: XOR<UserUpdateWithoutAchievementsInput, UserUncheckedUpdateWithoutAchievementsInput>
    create: XOR<UserCreateWithoutAchievementsInput, UserUncheckedCreateWithoutAchievementsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAchievementsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAchievementsInput, UserUncheckedUpdateWithoutAchievementsInput>
  }

  export type UserUpdateWithoutAchievementsInput = {
    walletAddress?: StringFieldUpdateOperationsInput | string
    worldIdHash?: NullableStringFieldUpdateOperationsInput | string | null
    verificationLevel?: StringFieldUpdateOperationsInput | string
    reputationScore?: IntFieldUpdateOperationsInput | number
    reputationLevel?: StringFieldUpdateOperationsInput | string
    totalTrades?: IntFieldUpdateOperationsInput | number
    totalVolume?: FloatFieldUpdateOperationsInput | number
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    riskScore?: FloatFieldUpdateOperationsInput | number
    allocationCap?: FloatFieldUpdateOperationsInput | number
    usedAllocation?: FloatFieldUpdateOperationsInput | number
    marketCap?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUpdateManyWithoutUserNestedInput
    createdTokens?: TokenUpdateManyWithoutCreatorNestedInput
    reputationQuests?: UserReputationQuestUpdateManyWithoutUserNestedInput
    antiManipulationLogs?: AntiManipulationLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAchievementsInput = {
    walletAddress?: StringFieldUpdateOperationsInput | string
    worldIdHash?: NullableStringFieldUpdateOperationsInput | string | null
    verificationLevel?: StringFieldUpdateOperationsInput | string
    reputationScore?: IntFieldUpdateOperationsInput | number
    reputationLevel?: StringFieldUpdateOperationsInput | string
    totalTrades?: IntFieldUpdateOperationsInput | number
    totalVolume?: FloatFieldUpdateOperationsInput | number
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    riskScore?: FloatFieldUpdateOperationsInput | number
    allocationCap?: FloatFieldUpdateOperationsInput | number
    usedAllocation?: FloatFieldUpdateOperationsInput | number
    marketCap?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUncheckedUpdateManyWithoutUserNestedInput
    createdTokens?: TokenUncheckedUpdateManyWithoutCreatorNestedInput
    reputationQuests?: UserReputationQuestUncheckedUpdateManyWithoutUserNestedInput
    antiManipulationLogs?: AntiManipulationLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AchievementUpsertWithoutUserAchievementsInput = {
    update: XOR<AchievementUpdateWithoutUserAchievementsInput, AchievementUncheckedUpdateWithoutUserAchievementsInput>
    create: XOR<AchievementCreateWithoutUserAchievementsInput, AchievementUncheckedCreateWithoutUserAchievementsInput>
    where?: AchievementWhereInput
  }

  export type AchievementUpdateToOneWithWhereWithoutUserAchievementsInput = {
    where?: AchievementWhereInput
    data: XOR<AchievementUpdateWithoutUserAchievementsInput, AchievementUncheckedUpdateWithoutUserAchievementsInput>
  }

  export type AchievementUpdateWithoutUserAchievementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    rarity?: StringFieldUpdateOperationsInput | string
    requirements?: StringFieldUpdateOperationsInput | string
    reward?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AchievementUncheckedUpdateWithoutUserAchievementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    rarity?: StringFieldUpdateOperationsInput | string
    requirements?: StringFieldUpdateOperationsInput | string
    reward?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutAntiManipulationLogsInput = {
    walletAddress: string
    worldIdHash?: string | null
    verificationLevel?: string
    reputationScore?: number
    reputationLevel?: string
    totalTrades?: number
    totalVolume?: number
    lastActivity?: Date | string
    isBanned?: boolean
    riskScore?: number
    allocationCap?: number
    usedAllocation?: number
    marketCap?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeCreateNestedManyWithoutUserInput
    createdTokens?: TokenCreateNestedManyWithoutCreatorInput
    reputationQuests?: UserReputationQuestCreateNestedManyWithoutUserInput
    achievements?: UserAchievementCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAntiManipulationLogsInput = {
    walletAddress: string
    worldIdHash?: string | null
    verificationLevel?: string
    reputationScore?: number
    reputationLevel?: string
    totalTrades?: number
    totalVolume?: number
    lastActivity?: Date | string
    isBanned?: boolean
    riskScore?: number
    allocationCap?: number
    usedAllocation?: number
    marketCap?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeUncheckedCreateNestedManyWithoutUserInput
    createdTokens?: TokenUncheckedCreateNestedManyWithoutCreatorInput
    reputationQuests?: UserReputationQuestUncheckedCreateNestedManyWithoutUserInput
    achievements?: UserAchievementUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAntiManipulationLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAntiManipulationLogsInput, UserUncheckedCreateWithoutAntiManipulationLogsInput>
  }

  export type UserUpsertWithoutAntiManipulationLogsInput = {
    update: XOR<UserUpdateWithoutAntiManipulationLogsInput, UserUncheckedUpdateWithoutAntiManipulationLogsInput>
    create: XOR<UserCreateWithoutAntiManipulationLogsInput, UserUncheckedCreateWithoutAntiManipulationLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAntiManipulationLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAntiManipulationLogsInput, UserUncheckedUpdateWithoutAntiManipulationLogsInput>
  }

  export type UserUpdateWithoutAntiManipulationLogsInput = {
    walletAddress?: StringFieldUpdateOperationsInput | string
    worldIdHash?: NullableStringFieldUpdateOperationsInput | string | null
    verificationLevel?: StringFieldUpdateOperationsInput | string
    reputationScore?: IntFieldUpdateOperationsInput | number
    reputationLevel?: StringFieldUpdateOperationsInput | string
    totalTrades?: IntFieldUpdateOperationsInput | number
    totalVolume?: FloatFieldUpdateOperationsInput | number
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    riskScore?: FloatFieldUpdateOperationsInput | number
    allocationCap?: FloatFieldUpdateOperationsInput | number
    usedAllocation?: FloatFieldUpdateOperationsInput | number
    marketCap?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUpdateManyWithoutUserNestedInput
    createdTokens?: TokenUpdateManyWithoutCreatorNestedInput
    reputationQuests?: UserReputationQuestUpdateManyWithoutUserNestedInput
    achievements?: UserAchievementUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAntiManipulationLogsInput = {
    walletAddress?: StringFieldUpdateOperationsInput | string
    worldIdHash?: NullableStringFieldUpdateOperationsInput | string | null
    verificationLevel?: StringFieldUpdateOperationsInput | string
    reputationScore?: IntFieldUpdateOperationsInput | number
    reputationLevel?: StringFieldUpdateOperationsInput | string
    totalTrades?: IntFieldUpdateOperationsInput | number
    totalVolume?: FloatFieldUpdateOperationsInput | number
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    riskScore?: FloatFieldUpdateOperationsInput | number
    allocationCap?: FloatFieldUpdateOperationsInput | number
    usedAllocation?: FloatFieldUpdateOperationsInput | number
    marketCap?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUncheckedUpdateManyWithoutUserNestedInput
    createdTokens?: TokenUncheckedUpdateManyWithoutCreatorNestedInput
    reputationQuests?: UserReputationQuestUncheckedUpdateManyWithoutUserNestedInput
    achievements?: UserAchievementUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TradeCreateManyUserInput = {
    id?: string
    tokenAddress: string
    type: string
    amount: number
    price: number
    totalValue: number
    blockNumber?: bigint | number | null
    transactionHash?: string | null
    riskScore?: number
    isSuspicious?: boolean
    manipulationFlags?: string | null
    createdAt?: Date | string
  }

  export type TokenCreateManyCreatorInput = {
    address: string
    name: string
    symbol: string
    description: string
    imageUrl?: string | null
    initialPrice: number
    priceIncrement: number
    maxSupply: bigint | number
    currentSupply?: bigint | number
    currentPrice: number
    totalVolume?: number
    totalTrades?: number
    marketCap?: number
    status?: string
    launchDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserReputationQuestCreateManyUserInput = {
    id?: string
    questId: string
    progress?: number
    isCompleted?: boolean
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserAchievementCreateManyUserInput = {
    id?: string
    achievementId: string
    unlockedAt?: Date | string
  }

  export type AntiManipulationLogCreateManyUserInput = {
    id?: string
    activityType: string
    riskScore: number
    flags: string
    details?: string | null
    isResolved?: boolean
    resolvedAt?: Date | string | null
    resolvedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TradeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    riskScore?: FloatFieldUpdateOperationsInput | number
    isSuspicious?: BoolFieldUpdateOperationsInput | boolean
    manipulationFlags?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: TokenUpdateOneRequiredWithoutTradesNestedInput
  }

  export type TradeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenAddress?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    riskScore?: FloatFieldUpdateOperationsInput | number
    isSuspicious?: BoolFieldUpdateOperationsInput | boolean
    manipulationFlags?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenAddress?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    riskScore?: FloatFieldUpdateOperationsInput | number
    isSuspicious?: BoolFieldUpdateOperationsInput | boolean
    manipulationFlags?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenUpdateWithoutCreatorInput = {
    address?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    initialPrice?: FloatFieldUpdateOperationsInput | number
    priceIncrement?: FloatFieldUpdateOperationsInput | number
    maxSupply?: BigIntFieldUpdateOperationsInput | bigint | number
    currentSupply?: BigIntFieldUpdateOperationsInput | bigint | number
    currentPrice?: FloatFieldUpdateOperationsInput | number
    totalVolume?: FloatFieldUpdateOperationsInput | number
    totalTrades?: IntFieldUpdateOperationsInput | number
    marketCap?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    launchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUpdateManyWithoutTokenNestedInput
  }

  export type TokenUncheckedUpdateWithoutCreatorInput = {
    address?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    initialPrice?: FloatFieldUpdateOperationsInput | number
    priceIncrement?: FloatFieldUpdateOperationsInput | number
    maxSupply?: BigIntFieldUpdateOperationsInput | bigint | number
    currentSupply?: BigIntFieldUpdateOperationsInput | bigint | number
    currentPrice?: FloatFieldUpdateOperationsInput | number
    totalVolume?: FloatFieldUpdateOperationsInput | number
    totalTrades?: IntFieldUpdateOperationsInput | number
    marketCap?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    launchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUncheckedUpdateManyWithoutTokenNestedInput
  }

  export type TokenUncheckedUpdateManyWithoutCreatorInput = {
    address?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    initialPrice?: FloatFieldUpdateOperationsInput | number
    priceIncrement?: FloatFieldUpdateOperationsInput | number
    maxSupply?: BigIntFieldUpdateOperationsInput | bigint | number
    currentSupply?: BigIntFieldUpdateOperationsInput | bigint | number
    currentPrice?: FloatFieldUpdateOperationsInput | number
    totalVolume?: FloatFieldUpdateOperationsInput | number
    totalTrades?: IntFieldUpdateOperationsInput | number
    marketCap?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    launchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserReputationQuestUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quest?: ReputationQuestUpdateOneRequiredWithoutUserProgressNestedInput
  }

  export type UserReputationQuestUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    questId?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserReputationQuestUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    questId?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAchievementUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    achievement?: AchievementUpdateOneRequiredWithoutUserAchievementsNestedInput
  }

  export type UserAchievementUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    achievementId?: StringFieldUpdateOperationsInput | string
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAchievementUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    achievementId?: StringFieldUpdateOperationsInput | string
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AntiManipulationLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    activityType?: StringFieldUpdateOperationsInput | string
    riskScore?: FloatFieldUpdateOperationsInput | number
    flags?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    isResolved?: BoolFieldUpdateOperationsInput | boolean
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AntiManipulationLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    activityType?: StringFieldUpdateOperationsInput | string
    riskScore?: FloatFieldUpdateOperationsInput | number
    flags?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    isResolved?: BoolFieldUpdateOperationsInput | boolean
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AntiManipulationLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    activityType?: StringFieldUpdateOperationsInput | string
    riskScore?: FloatFieldUpdateOperationsInput | number
    flags?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    isResolved?: BoolFieldUpdateOperationsInput | boolean
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeCreateManyTokenInput = {
    id?: string
    userAddress: string
    type: string
    amount: number
    price: number
    totalValue: number
    blockNumber?: bigint | number | null
    transactionHash?: string | null
    riskScore?: number
    isSuspicious?: boolean
    manipulationFlags?: string | null
    createdAt?: Date | string
  }

  export type TradeUpdateWithoutTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    riskScore?: FloatFieldUpdateOperationsInput | number
    isSuspicious?: BoolFieldUpdateOperationsInput | boolean
    manipulationFlags?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTradesNestedInput
  }

  export type TradeUncheckedUpdateWithoutTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    riskScore?: FloatFieldUpdateOperationsInput | number
    isSuspicious?: BoolFieldUpdateOperationsInput | boolean
    manipulationFlags?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeUncheckedUpdateManyWithoutTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    riskScore?: FloatFieldUpdateOperationsInput | number
    isSuspicious?: BoolFieldUpdateOperationsInput | boolean
    manipulationFlags?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserReputationQuestCreateManyQuestInput = {
    id?: string
    userAddress: string
    progress?: number
    isCompleted?: boolean
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserReputationQuestUpdateWithoutQuestInput = {
    id?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReputationQuestsNestedInput
  }

  export type UserReputationQuestUncheckedUpdateWithoutQuestInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserReputationQuestUncheckedUpdateManyWithoutQuestInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAchievementCreateManyAchievementInput = {
    id?: string
    userAddress: string
    unlockedAt?: Date | string
  }

  export type UserAchievementUpdateWithoutAchievementInput = {
    id?: StringFieldUpdateOperationsInput | string
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAchievementsNestedInput
  }

  export type UserAchievementUncheckedUpdateWithoutAchievementInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAchievementUncheckedUpdateManyWithoutAchievementInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}