
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
 * Model user
 * 
 */
export type user = $Result.DefaultSelection<Prisma.$userPayload>
/**
 * Model video
 * 
 */
export type video = $Result.DefaultSelection<Prisma.$videoPayload>
/**
 * Model upload
 * 
 */
export type upload = $Result.DefaultSelection<Prisma.$uploadPayload>
/**
 * Model videoProcessingTask
 * 
 */
export type videoProcessingTask = $Result.DefaultSelection<Prisma.$videoProcessingTaskPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const VideoProcessingStatus: {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING'
};

export type VideoProcessingStatus = (typeof VideoProcessingStatus)[keyof typeof VideoProcessingStatus]


export const Role: {
  ADMIN: 'ADMIN',
  USER: 'USER'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type VideoProcessingStatus = $Enums.VideoProcessingStatus

export const VideoProcessingStatus: typeof $Enums.VideoProcessingStatus

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

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
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

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
   * `prisma.user`: Exposes CRUD operations for the **user** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.userDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.video`: Exposes CRUD operations for the **video** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Videos
    * const videos = await prisma.video.findMany()
    * ```
    */
  get video(): Prisma.videoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.upload`: Exposes CRUD operations for the **upload** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Uploads
    * const uploads = await prisma.upload.findMany()
    * ```
    */
  get upload(): Prisma.uploadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.videoProcessingTask`: Exposes CRUD operations for the **videoProcessingTask** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VideoProcessingTasks
    * const videoProcessingTasks = await prisma.videoProcessingTask.findMany()
    * ```
    */
  get videoProcessingTask(): Prisma.videoProcessingTaskDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.12.0
   * Query Engine version: 8047c96bbd92db98a2abc7c9323ce77c02c89dbc
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
    user: 'user',
    video: 'video',
    upload: 'upload',
    videoProcessingTask: 'videoProcessingTask'
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
      modelProps: "user" | "video" | "upload" | "videoProcessingTask"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      user: {
        payload: Prisma.$userPayload<ExtArgs>
        fields: Prisma.userFieldRefs
        operations: {
          findUnique: {
            args: Prisma.userFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.userFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findFirst: {
            args: Prisma.userFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.userFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findMany: {
            args: Prisma.userFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          create: {
            args: Prisma.userCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          createMany: {
            args: Prisma.userCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.userCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          delete: {
            args: Prisma.userDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          update: {
            args: Prisma.userUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          deleteMany: {
            args: Prisma.userDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.userUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.userUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          upsert: {
            args: Prisma.userUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.userGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.userCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      video: {
        payload: Prisma.$videoPayload<ExtArgs>
        fields: Prisma.videoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.videoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.videoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videoPayload>
          }
          findFirst: {
            args: Prisma.videoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.videoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videoPayload>
          }
          findMany: {
            args: Prisma.videoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videoPayload>[]
          }
          create: {
            args: Prisma.videoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videoPayload>
          }
          createMany: {
            args: Prisma.videoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.videoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videoPayload>[]
          }
          delete: {
            args: Prisma.videoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videoPayload>
          }
          update: {
            args: Prisma.videoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videoPayload>
          }
          deleteMany: {
            args: Prisma.videoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.videoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.videoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videoPayload>[]
          }
          upsert: {
            args: Prisma.videoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videoPayload>
          }
          aggregate: {
            args: Prisma.VideoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVideo>
          }
          groupBy: {
            args: Prisma.videoGroupByArgs<ExtArgs>
            result: $Utils.Optional<VideoGroupByOutputType>[]
          }
          count: {
            args: Prisma.videoCountArgs<ExtArgs>
            result: $Utils.Optional<VideoCountAggregateOutputType> | number
          }
        }
      }
      upload: {
        payload: Prisma.$uploadPayload<ExtArgs>
        fields: Prisma.uploadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.uploadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uploadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.uploadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uploadPayload>
          }
          findFirst: {
            args: Prisma.uploadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uploadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.uploadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uploadPayload>
          }
          findMany: {
            args: Prisma.uploadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uploadPayload>[]
          }
          create: {
            args: Prisma.uploadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uploadPayload>
          }
          createMany: {
            args: Prisma.uploadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.uploadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uploadPayload>[]
          }
          delete: {
            args: Prisma.uploadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uploadPayload>
          }
          update: {
            args: Prisma.uploadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uploadPayload>
          }
          deleteMany: {
            args: Prisma.uploadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.uploadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.uploadUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uploadPayload>[]
          }
          upsert: {
            args: Prisma.uploadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uploadPayload>
          }
          aggregate: {
            args: Prisma.UploadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUpload>
          }
          groupBy: {
            args: Prisma.uploadGroupByArgs<ExtArgs>
            result: $Utils.Optional<UploadGroupByOutputType>[]
          }
          count: {
            args: Prisma.uploadCountArgs<ExtArgs>
            result: $Utils.Optional<UploadCountAggregateOutputType> | number
          }
        }
      }
      videoProcessingTask: {
        payload: Prisma.$videoProcessingTaskPayload<ExtArgs>
        fields: Prisma.videoProcessingTaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.videoProcessingTaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videoProcessingTaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.videoProcessingTaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videoProcessingTaskPayload>
          }
          findFirst: {
            args: Prisma.videoProcessingTaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videoProcessingTaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.videoProcessingTaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videoProcessingTaskPayload>
          }
          findMany: {
            args: Prisma.videoProcessingTaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videoProcessingTaskPayload>[]
          }
          create: {
            args: Prisma.videoProcessingTaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videoProcessingTaskPayload>
          }
          createMany: {
            args: Prisma.videoProcessingTaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.videoProcessingTaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videoProcessingTaskPayload>[]
          }
          delete: {
            args: Prisma.videoProcessingTaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videoProcessingTaskPayload>
          }
          update: {
            args: Prisma.videoProcessingTaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videoProcessingTaskPayload>
          }
          deleteMany: {
            args: Prisma.videoProcessingTaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.videoProcessingTaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.videoProcessingTaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videoProcessingTaskPayload>[]
          }
          upsert: {
            args: Prisma.videoProcessingTaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videoProcessingTaskPayload>
          }
          aggregate: {
            args: Prisma.VideoProcessingTaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVideoProcessingTask>
          }
          groupBy: {
            args: Prisma.videoProcessingTaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<VideoProcessingTaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.videoProcessingTaskCountArgs<ExtArgs>
            result: $Utils.Optional<VideoProcessingTaskCountAggregateOutputType> | number
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
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
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
    user?: userOmit
    video?: videoOmit
    upload?: uploadOmit
    videoProcessingTask?: videoProcessingTaskOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
    video: number
    upload: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    video?: boolean | UserCountOutputTypeCountVideoArgs
    upload?: boolean | UserCountOutputTypeCountUploadArgs
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
  export type UserCountOutputTypeCountVideoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: videoWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUploadArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: uploadWhereInput
  }


  /**
   * Count Type VideoCountOutputType
   */

  export type VideoCountOutputType = {
    videoProcessingTask: number
    upload: number
  }

  export type VideoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    videoProcessingTask?: boolean | VideoCountOutputTypeCountVideoProcessingTaskArgs
    upload?: boolean | VideoCountOutputTypeCountUploadArgs
  }

  // Custom InputTypes
  /**
   * VideoCountOutputType without action
   */
  export type VideoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoCountOutputType
     */
    select?: VideoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VideoCountOutputType without action
   */
  export type VideoCountOutputTypeCountVideoProcessingTaskArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: videoProcessingTaskWhereInput
  }

  /**
   * VideoCountOutputType without action
   */
  export type VideoCountOutputTypeCountUploadArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: uploadWhereInput
  }


  /**
   * Models
   */

  /**
   * Model user
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    channelDescription: string | null
    avatar: string | null
    channelCover: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    banned: boolean | null
    OTPSecret: string | null
    OTPPendingValidation: boolean | null
    OTPRecoveryCode: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    channelDescription: string | null
    avatar: string | null
    channelCover: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    banned: boolean | null
    OTPSecret: string | null
    OTPPendingValidation: boolean | null
    OTPRecoveryCode: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    channelDescription: number
    avatar: number
    channelCover: number
    email: number
    password: number
    role: number
    banned: number
    OTPSecret: number
    OTPPendingValidation: number
    OTPRecoveryCode: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    channelDescription?: true
    avatar?: true
    channelCover?: true
    email?: true
    password?: true
    role?: true
    banned?: true
    OTPSecret?: true
    OTPPendingValidation?: true
    OTPRecoveryCode?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    channelDescription?: true
    avatar?: true
    channelCover?: true
    email?: true
    password?: true
    role?: true
    banned?: true
    OTPSecret?: true
    OTPPendingValidation?: true
    OTPRecoveryCode?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    channelDescription?: true
    avatar?: true
    channelCover?: true
    email?: true
    password?: true
    role?: true
    banned?: true
    OTPSecret?: true
    OTPPendingValidation?: true
    OTPRecoveryCode?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user to aggregate.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UserCountAggregateInputType
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




  export type userGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: userWhereInput
    orderBy?: userOrderByWithAggregationInput | userOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: userScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    channelDescription: string | null
    avatar: string | null
    channelCover: string | null
    email: string
    password: string
    role: $Enums.Role
    banned: boolean
    OTPSecret: string | null
    OTPPendingValidation: boolean | null
    OTPRecoveryCode: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends userGroupByArgs> = Prisma.PrismaPromise<
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


  export type userSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    channelDescription?: boolean
    avatar?: boolean
    channelCover?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    banned?: boolean
    OTPSecret?: boolean
    OTPPendingValidation?: boolean
    OTPRecoveryCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    video?: boolean | user$videoArgs<ExtArgs>
    upload?: boolean | user$uploadArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type userSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    channelDescription?: boolean
    avatar?: boolean
    channelCover?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    banned?: boolean
    OTPSecret?: boolean
    OTPPendingValidation?: boolean
    OTPRecoveryCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type userSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    channelDescription?: boolean
    avatar?: boolean
    channelCover?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    banned?: boolean
    OTPSecret?: boolean
    OTPPendingValidation?: boolean
    OTPRecoveryCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type userSelectScalar = {
    id?: boolean
    username?: boolean
    channelDescription?: boolean
    avatar?: boolean
    channelCover?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    banned?: boolean
    OTPSecret?: boolean
    OTPPendingValidation?: boolean
    OTPRecoveryCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type userOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "channelDescription" | "avatar" | "channelCover" | "email" | "password" | "role" | "banned" | "OTPSecret" | "OTPPendingValidation" | "OTPRecoveryCode" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type userInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    video?: boolean | user$videoArgs<ExtArgs>
    upload?: boolean | user$uploadArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type userIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type userIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $userPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user"
    objects: {
      video: Prisma.$videoPayload<ExtArgs>[]
      upload: Prisma.$uploadPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      channelDescription: string | null
      avatar: string | null
      channelCover: string | null
      email: string
      password: string
      role: $Enums.Role
      banned: boolean
      OTPSecret: string | null
      OTPPendingValidation: boolean | null
      OTPRecoveryCode: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type userGetPayload<S extends boolean | null | undefined | userDefaultArgs> = $Result.GetResult<Prisma.$userPayload, S>

  type userCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<userFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface userDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user'], meta: { name: 'user' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {userFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends userFindUniqueArgs>(args: SelectSubset<T, userFindUniqueArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {userFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends userFindUniqueOrThrowArgs>(args: SelectSubset<T, userFindUniqueOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends userFindFirstArgs>(args?: SelectSubset<T, userFindFirstArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends userFindFirstOrThrowArgs>(args?: SelectSubset<T, userFindFirstOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends userFindManyArgs>(args?: SelectSubset<T, userFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {userCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends userCreateArgs>(args: SelectSubset<T, userCreateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {userCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends userCreateManyArgs>(args?: SelectSubset<T, userCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {userCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends userCreateManyAndReturnArgs>(args?: SelectSubset<T, userCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {userDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends userDeleteArgs>(args: SelectSubset<T, userDeleteArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {userUpdateArgs} args - Arguments to update one User.
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
    update<T extends userUpdateArgs>(args: SelectSubset<T, userUpdateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {userDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends userDeleteManyArgs>(args?: SelectSubset<T, userDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userUpdateManyArgs} args - Arguments to update one or more rows.
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
    updateMany<T extends userUpdateManyArgs>(args: SelectSubset<T, userUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {userUpdateManyAndReturnArgs} args - Arguments to update many Users.
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
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends userUpdateManyAndReturnArgs>(args: SelectSubset<T, userUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {userUpsertArgs} args - Arguments to update or create a User.
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
    upsert<T extends userUpsertArgs>(args: SelectSubset<T, userUpsertArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends userCountArgs>(
      args?: Subset<T, userCountArgs>,
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
     * @param {userGroupByArgs} args - Group by arguments.
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
      T extends userGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: userGroupByArgs['orderBy'] }
        : { orderBy?: userGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, userGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user model
   */
  readonly fields: userFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__userClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    video<T extends user$videoArgs<ExtArgs> = {}>(args?: Subset<T, user$videoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$videoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    upload<T extends user$uploadArgs<ExtArgs> = {}>(args?: Subset<T, user$uploadArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$uploadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the user model
   */
  interface userFieldRefs {
    readonly id: FieldRef<"user", 'String'>
    readonly username: FieldRef<"user", 'String'>
    readonly channelDescription: FieldRef<"user", 'String'>
    readonly avatar: FieldRef<"user", 'String'>
    readonly channelCover: FieldRef<"user", 'String'>
    readonly email: FieldRef<"user", 'String'>
    readonly password: FieldRef<"user", 'String'>
    readonly role: FieldRef<"user", 'Role'>
    readonly banned: FieldRef<"user", 'Boolean'>
    readonly OTPSecret: FieldRef<"user", 'String'>
    readonly OTPPendingValidation: FieldRef<"user", 'Boolean'>
    readonly OTPRecoveryCode: FieldRef<"user", 'String'>
    readonly createdAt: FieldRef<"user", 'DateTime'>
    readonly updatedAt: FieldRef<"user", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * user findUnique
   */
  export type userFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findUniqueOrThrow
   */
  export type userFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findFirst
   */
  export type userFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findFirstOrThrow
   */
  export type userFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findMany
   */
  export type userFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user create
   */
  export type userCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The data needed to create a user.
     */
    data: XOR<userCreateInput, userUncheckedCreateInput>
  }

  /**
   * user createMany
   */
  export type userCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: userCreateManyInput | userCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user createManyAndReturn
   */
  export type userCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: userCreateManyInput | userCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user update
   */
  export type userUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The data needed to update a user.
     */
    data: XOR<userUpdateInput, userUncheckedUpdateInput>
    /**
     * Choose, which user to update.
     */
    where: userWhereUniqueInput
  }

  /**
   * user updateMany
   */
  export type userUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: userWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * user updateManyAndReturn
   */
  export type userUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: userWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * user upsert
   */
  export type userUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The filter to search for the user to update in case it exists.
     */
    where: userWhereUniqueInput
    /**
     * In case the user found by the `where` argument doesn't exist, create a new user with this data.
     */
    create: XOR<userCreateInput, userUncheckedCreateInput>
    /**
     * In case the user was found with the provided `where` argument, update it with this data.
     */
    update: XOR<userUpdateInput, userUncheckedUpdateInput>
  }

  /**
   * user delete
   */
  export type userDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter which user to delete.
     */
    where: userWhereUniqueInput
  }

  /**
   * user deleteMany
   */
  export type userDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: userWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * user.video
   */
  export type user$videoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the video
     */
    select?: videoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the video
     */
    omit?: videoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: videoInclude<ExtArgs> | null
    where?: videoWhereInput
    orderBy?: videoOrderByWithRelationInput | videoOrderByWithRelationInput[]
    cursor?: videoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VideoScalarFieldEnum | VideoScalarFieldEnum[]
  }

  /**
   * user.upload
   */
  export type user$uploadArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the upload
     */
    select?: uploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the upload
     */
    omit?: uploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: uploadInclude<ExtArgs> | null
    where?: uploadWhereInput
    orderBy?: uploadOrderByWithRelationInput | uploadOrderByWithRelationInput[]
    cursor?: uploadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UploadScalarFieldEnum | UploadScalarFieldEnum[]
  }

  /**
   * user without action
   */
  export type userDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
  }


  /**
   * Model video
   */

  export type AggregateVideo = {
    _count: VideoCountAggregateOutputType | null
    _min: VideoMinAggregateOutputType | null
    _max: VideoMaxAggregateOutputType | null
  }

  export type VideoMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    thumbnail: string | null
    hlsMaterList: string | null
    previewClip: string | null
    userId: string | null
    public: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VideoMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    thumbnail: string | null
    hlsMaterList: string | null
    previewClip: string | null
    userId: string | null
    public: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VideoCountAggregateOutputType = {
    id: number
    title: number
    description: number
    thumbnail: number
    hlsMaterList: number
    previewClip: number
    userId: number
    public: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VideoMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    thumbnail?: true
    hlsMaterList?: true
    previewClip?: true
    userId?: true
    public?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VideoMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    thumbnail?: true
    hlsMaterList?: true
    previewClip?: true
    userId?: true
    public?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VideoCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    thumbnail?: true
    hlsMaterList?: true
    previewClip?: true
    userId?: true
    public?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VideoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which video to aggregate.
     */
    where?: videoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of videos to fetch.
     */
    orderBy?: videoOrderByWithRelationInput | videoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: videoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` videos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` videos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned videos
    **/
    _count?: true | VideoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VideoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VideoMaxAggregateInputType
  }

  export type GetVideoAggregateType<T extends VideoAggregateArgs> = {
        [P in keyof T & keyof AggregateVideo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVideo[P]>
      : GetScalarType<T[P], AggregateVideo[P]>
  }




  export type videoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: videoWhereInput
    orderBy?: videoOrderByWithAggregationInput | videoOrderByWithAggregationInput[]
    by: VideoScalarFieldEnum[] | VideoScalarFieldEnum
    having?: videoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VideoCountAggregateInputType | true
    _min?: VideoMinAggregateInputType
    _max?: VideoMaxAggregateInputType
  }

  export type VideoGroupByOutputType = {
    id: string
    title: string
    description: string
    thumbnail: string | null
    hlsMaterList: string | null
    previewClip: string | null
    userId: string
    public: boolean
    createdAt: Date
    updatedAt: Date
    _count: VideoCountAggregateOutputType | null
    _min: VideoMinAggregateOutputType | null
    _max: VideoMaxAggregateOutputType | null
  }

  type GetVideoGroupByPayload<T extends videoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VideoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VideoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VideoGroupByOutputType[P]>
            : GetScalarType<T[P], VideoGroupByOutputType[P]>
        }
      >
    >


  export type videoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    thumbnail?: boolean
    hlsMaterList?: boolean
    previewClip?: boolean
    userId?: boolean
    public?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    uploadedBy?: boolean | userDefaultArgs<ExtArgs>
    videoProcessingTask?: boolean | video$videoProcessingTaskArgs<ExtArgs>
    upload?: boolean | video$uploadArgs<ExtArgs>
    _count?: boolean | VideoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["video"]>

  export type videoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    thumbnail?: boolean
    hlsMaterList?: boolean
    previewClip?: boolean
    userId?: boolean
    public?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    uploadedBy?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["video"]>

  export type videoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    thumbnail?: boolean
    hlsMaterList?: boolean
    previewClip?: boolean
    userId?: boolean
    public?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    uploadedBy?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["video"]>

  export type videoSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    thumbnail?: boolean
    hlsMaterList?: boolean
    previewClip?: boolean
    userId?: boolean
    public?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type videoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "thumbnail" | "hlsMaterList" | "previewClip" | "userId" | "public" | "createdAt" | "updatedAt", ExtArgs["result"]["video"]>
  export type videoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uploadedBy?: boolean | userDefaultArgs<ExtArgs>
    videoProcessingTask?: boolean | video$videoProcessingTaskArgs<ExtArgs>
    upload?: boolean | video$uploadArgs<ExtArgs>
    _count?: boolean | VideoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type videoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uploadedBy?: boolean | userDefaultArgs<ExtArgs>
  }
  export type videoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uploadedBy?: boolean | userDefaultArgs<ExtArgs>
  }

  export type $videoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "video"
    objects: {
      uploadedBy: Prisma.$userPayload<ExtArgs>
      videoProcessingTask: Prisma.$videoProcessingTaskPayload<ExtArgs>[]
      upload: Prisma.$uploadPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      thumbnail: string | null
      hlsMaterList: string | null
      previewClip: string | null
      userId: string
      public: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["video"]>
    composites: {}
  }

  type videoGetPayload<S extends boolean | null | undefined | videoDefaultArgs> = $Result.GetResult<Prisma.$videoPayload, S>

  type videoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<videoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VideoCountAggregateInputType | true
    }

  export interface videoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['video'], meta: { name: 'video' } }
    /**
     * Find zero or one Video that matches the filter.
     * @param {videoFindUniqueArgs} args - Arguments to find a Video
     * @example
     * // Get one Video
     * const video = await prisma.video.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends videoFindUniqueArgs>(args: SelectSubset<T, videoFindUniqueArgs<ExtArgs>>): Prisma__videoClient<$Result.GetResult<Prisma.$videoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Video that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {videoFindUniqueOrThrowArgs} args - Arguments to find a Video
     * @example
     * // Get one Video
     * const video = await prisma.video.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends videoFindUniqueOrThrowArgs>(args: SelectSubset<T, videoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__videoClient<$Result.GetResult<Prisma.$videoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Video that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {videoFindFirstArgs} args - Arguments to find a Video
     * @example
     * // Get one Video
     * const video = await prisma.video.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends videoFindFirstArgs>(args?: SelectSubset<T, videoFindFirstArgs<ExtArgs>>): Prisma__videoClient<$Result.GetResult<Prisma.$videoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Video that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {videoFindFirstOrThrowArgs} args - Arguments to find a Video
     * @example
     * // Get one Video
     * const video = await prisma.video.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends videoFindFirstOrThrowArgs>(args?: SelectSubset<T, videoFindFirstOrThrowArgs<ExtArgs>>): Prisma__videoClient<$Result.GetResult<Prisma.$videoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Videos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {videoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Videos
     * const videos = await prisma.video.findMany()
     * 
     * // Get first 10 Videos
     * const videos = await prisma.video.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const videoWithIdOnly = await prisma.video.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends videoFindManyArgs>(args?: SelectSubset<T, videoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$videoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Video.
     * @param {videoCreateArgs} args - Arguments to create a Video.
     * @example
     * // Create one Video
     * const Video = await prisma.video.create({
     *   data: {
     *     // ... data to create a Video
     *   }
     * })
     * 
     */
    create<T extends videoCreateArgs>(args: SelectSubset<T, videoCreateArgs<ExtArgs>>): Prisma__videoClient<$Result.GetResult<Prisma.$videoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Videos.
     * @param {videoCreateManyArgs} args - Arguments to create many Videos.
     * @example
     * // Create many Videos
     * const video = await prisma.video.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends videoCreateManyArgs>(args?: SelectSubset<T, videoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Videos and returns the data saved in the database.
     * @param {videoCreateManyAndReturnArgs} args - Arguments to create many Videos.
     * @example
     * // Create many Videos
     * const video = await prisma.video.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Videos and only return the `id`
     * const videoWithIdOnly = await prisma.video.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends videoCreateManyAndReturnArgs>(args?: SelectSubset<T, videoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$videoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Video.
     * @param {videoDeleteArgs} args - Arguments to delete one Video.
     * @example
     * // Delete one Video
     * const Video = await prisma.video.delete({
     *   where: {
     *     // ... filter to delete one Video
     *   }
     * })
     * 
     */
    delete<T extends videoDeleteArgs>(args: SelectSubset<T, videoDeleteArgs<ExtArgs>>): Prisma__videoClient<$Result.GetResult<Prisma.$videoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Video.
     * @param {videoUpdateArgs} args - Arguments to update one Video.
     * @example
     * // Update one Video
     * const video = await prisma.video.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends videoUpdateArgs>(args: SelectSubset<T, videoUpdateArgs<ExtArgs>>): Prisma__videoClient<$Result.GetResult<Prisma.$videoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Videos.
     * @param {videoDeleteManyArgs} args - Arguments to filter Videos to delete.
     * @example
     * // Delete a few Videos
     * const { count } = await prisma.video.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends videoDeleteManyArgs>(args?: SelectSubset<T, videoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Videos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {videoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Videos
     * const video = await prisma.video.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends videoUpdateManyArgs>(args: SelectSubset<T, videoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Videos and returns the data updated in the database.
     * @param {videoUpdateManyAndReturnArgs} args - Arguments to update many Videos.
     * @example
     * // Update many Videos
     * const video = await prisma.video.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Videos and only return the `id`
     * const videoWithIdOnly = await prisma.video.updateManyAndReturn({
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
    updateManyAndReturn<T extends videoUpdateManyAndReturnArgs>(args: SelectSubset<T, videoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$videoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Video.
     * @param {videoUpsertArgs} args - Arguments to update or create a Video.
     * @example
     * // Update or create a Video
     * const video = await prisma.video.upsert({
     *   create: {
     *     // ... data to create a Video
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Video we want to update
     *   }
     * })
     */
    upsert<T extends videoUpsertArgs>(args: SelectSubset<T, videoUpsertArgs<ExtArgs>>): Prisma__videoClient<$Result.GetResult<Prisma.$videoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Videos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {videoCountArgs} args - Arguments to filter Videos to count.
     * @example
     * // Count the number of Videos
     * const count = await prisma.video.count({
     *   where: {
     *     // ... the filter for the Videos we want to count
     *   }
     * })
    **/
    count<T extends videoCountArgs>(
      args?: Subset<T, videoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VideoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Video.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VideoAggregateArgs>(args: Subset<T, VideoAggregateArgs>): Prisma.PrismaPromise<GetVideoAggregateType<T>>

    /**
     * Group by Video.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {videoGroupByArgs} args - Group by arguments.
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
      T extends videoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: videoGroupByArgs['orderBy'] }
        : { orderBy?: videoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, videoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVideoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the video model
   */
  readonly fields: videoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for video.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__videoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    uploadedBy<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    videoProcessingTask<T extends video$videoProcessingTaskArgs<ExtArgs> = {}>(args?: Subset<T, video$videoProcessingTaskArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$videoProcessingTaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    upload<T extends video$uploadArgs<ExtArgs> = {}>(args?: Subset<T, video$uploadArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$uploadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the video model
   */
  interface videoFieldRefs {
    readonly id: FieldRef<"video", 'String'>
    readonly title: FieldRef<"video", 'String'>
    readonly description: FieldRef<"video", 'String'>
    readonly thumbnail: FieldRef<"video", 'String'>
    readonly hlsMaterList: FieldRef<"video", 'String'>
    readonly previewClip: FieldRef<"video", 'String'>
    readonly userId: FieldRef<"video", 'String'>
    readonly public: FieldRef<"video", 'Boolean'>
    readonly createdAt: FieldRef<"video", 'DateTime'>
    readonly updatedAt: FieldRef<"video", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * video findUnique
   */
  export type videoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the video
     */
    select?: videoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the video
     */
    omit?: videoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: videoInclude<ExtArgs> | null
    /**
     * Filter, which video to fetch.
     */
    where: videoWhereUniqueInput
  }

  /**
   * video findUniqueOrThrow
   */
  export type videoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the video
     */
    select?: videoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the video
     */
    omit?: videoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: videoInclude<ExtArgs> | null
    /**
     * Filter, which video to fetch.
     */
    where: videoWhereUniqueInput
  }

  /**
   * video findFirst
   */
  export type videoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the video
     */
    select?: videoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the video
     */
    omit?: videoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: videoInclude<ExtArgs> | null
    /**
     * Filter, which video to fetch.
     */
    where?: videoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of videos to fetch.
     */
    orderBy?: videoOrderByWithRelationInput | videoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for videos.
     */
    cursor?: videoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` videos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` videos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of videos.
     */
    distinct?: VideoScalarFieldEnum | VideoScalarFieldEnum[]
  }

  /**
   * video findFirstOrThrow
   */
  export type videoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the video
     */
    select?: videoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the video
     */
    omit?: videoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: videoInclude<ExtArgs> | null
    /**
     * Filter, which video to fetch.
     */
    where?: videoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of videos to fetch.
     */
    orderBy?: videoOrderByWithRelationInput | videoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for videos.
     */
    cursor?: videoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` videos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` videos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of videos.
     */
    distinct?: VideoScalarFieldEnum | VideoScalarFieldEnum[]
  }

  /**
   * video findMany
   */
  export type videoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the video
     */
    select?: videoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the video
     */
    omit?: videoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: videoInclude<ExtArgs> | null
    /**
     * Filter, which videos to fetch.
     */
    where?: videoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of videos to fetch.
     */
    orderBy?: videoOrderByWithRelationInput | videoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing videos.
     */
    cursor?: videoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` videos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` videos.
     */
    skip?: number
    distinct?: VideoScalarFieldEnum | VideoScalarFieldEnum[]
  }

  /**
   * video create
   */
  export type videoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the video
     */
    select?: videoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the video
     */
    omit?: videoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: videoInclude<ExtArgs> | null
    /**
     * The data needed to create a video.
     */
    data: XOR<videoCreateInput, videoUncheckedCreateInput>
  }

  /**
   * video createMany
   */
  export type videoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many videos.
     */
    data: videoCreateManyInput | videoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * video createManyAndReturn
   */
  export type videoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the video
     */
    select?: videoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the video
     */
    omit?: videoOmit<ExtArgs> | null
    /**
     * The data used to create many videos.
     */
    data: videoCreateManyInput | videoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: videoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * video update
   */
  export type videoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the video
     */
    select?: videoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the video
     */
    omit?: videoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: videoInclude<ExtArgs> | null
    /**
     * The data needed to update a video.
     */
    data: XOR<videoUpdateInput, videoUncheckedUpdateInput>
    /**
     * Choose, which video to update.
     */
    where: videoWhereUniqueInput
  }

  /**
   * video updateMany
   */
  export type videoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update videos.
     */
    data: XOR<videoUpdateManyMutationInput, videoUncheckedUpdateManyInput>
    /**
     * Filter which videos to update
     */
    where?: videoWhereInput
    /**
     * Limit how many videos to update.
     */
    limit?: number
  }

  /**
   * video updateManyAndReturn
   */
  export type videoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the video
     */
    select?: videoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the video
     */
    omit?: videoOmit<ExtArgs> | null
    /**
     * The data used to update videos.
     */
    data: XOR<videoUpdateManyMutationInput, videoUncheckedUpdateManyInput>
    /**
     * Filter which videos to update
     */
    where?: videoWhereInput
    /**
     * Limit how many videos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: videoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * video upsert
   */
  export type videoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the video
     */
    select?: videoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the video
     */
    omit?: videoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: videoInclude<ExtArgs> | null
    /**
     * The filter to search for the video to update in case it exists.
     */
    where: videoWhereUniqueInput
    /**
     * In case the video found by the `where` argument doesn't exist, create a new video with this data.
     */
    create: XOR<videoCreateInput, videoUncheckedCreateInput>
    /**
     * In case the video was found with the provided `where` argument, update it with this data.
     */
    update: XOR<videoUpdateInput, videoUncheckedUpdateInput>
  }

  /**
   * video delete
   */
  export type videoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the video
     */
    select?: videoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the video
     */
    omit?: videoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: videoInclude<ExtArgs> | null
    /**
     * Filter which video to delete.
     */
    where: videoWhereUniqueInput
  }

  /**
   * video deleteMany
   */
  export type videoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which videos to delete
     */
    where?: videoWhereInput
    /**
     * Limit how many videos to delete.
     */
    limit?: number
  }

  /**
   * video.videoProcessingTask
   */
  export type video$videoProcessingTaskArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the videoProcessingTask
     */
    select?: videoProcessingTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the videoProcessingTask
     */
    omit?: videoProcessingTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: videoProcessingTaskInclude<ExtArgs> | null
    where?: videoProcessingTaskWhereInput
    orderBy?: videoProcessingTaskOrderByWithRelationInput | videoProcessingTaskOrderByWithRelationInput[]
    cursor?: videoProcessingTaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VideoProcessingTaskScalarFieldEnum | VideoProcessingTaskScalarFieldEnum[]
  }

  /**
   * video.upload
   */
  export type video$uploadArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the upload
     */
    select?: uploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the upload
     */
    omit?: uploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: uploadInclude<ExtArgs> | null
    where?: uploadWhereInput
    orderBy?: uploadOrderByWithRelationInput | uploadOrderByWithRelationInput[]
    cursor?: uploadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UploadScalarFieldEnum | UploadScalarFieldEnum[]
  }

  /**
   * video without action
   */
  export type videoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the video
     */
    select?: videoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the video
     */
    omit?: videoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: videoInclude<ExtArgs> | null
  }


  /**
   * Model upload
   */

  export type AggregateUpload = {
    _count: UploadCountAggregateOutputType | null
    _min: UploadMinAggregateOutputType | null
    _max: UploadMaxAggregateOutputType | null
  }

  export type UploadMinAggregateOutputType = {
    id: string | null
    user: string | null
    multipartId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    videoId: string | null
  }

  export type UploadMaxAggregateOutputType = {
    id: string | null
    user: string | null
    multipartId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    videoId: string | null
  }

  export type UploadCountAggregateOutputType = {
    id: number
    user: number
    multipartId: number
    createdAt: number
    updatedAt: number
    videoId: number
    _all: number
  }


  export type UploadMinAggregateInputType = {
    id?: true
    user?: true
    multipartId?: true
    createdAt?: true
    updatedAt?: true
    videoId?: true
  }

  export type UploadMaxAggregateInputType = {
    id?: true
    user?: true
    multipartId?: true
    createdAt?: true
    updatedAt?: true
    videoId?: true
  }

  export type UploadCountAggregateInputType = {
    id?: true
    user?: true
    multipartId?: true
    createdAt?: true
    updatedAt?: true
    videoId?: true
    _all?: true
  }

  export type UploadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which upload to aggregate.
     */
    where?: uploadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of uploads to fetch.
     */
    orderBy?: uploadOrderByWithRelationInput | uploadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: uploadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` uploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` uploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned uploads
    **/
    _count?: true | UploadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UploadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UploadMaxAggregateInputType
  }

  export type GetUploadAggregateType<T extends UploadAggregateArgs> = {
        [P in keyof T & keyof AggregateUpload]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUpload[P]>
      : GetScalarType<T[P], AggregateUpload[P]>
  }




  export type uploadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: uploadWhereInput
    orderBy?: uploadOrderByWithAggregationInput | uploadOrderByWithAggregationInput[]
    by: UploadScalarFieldEnum[] | UploadScalarFieldEnum
    having?: uploadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UploadCountAggregateInputType | true
    _min?: UploadMinAggregateInputType
    _max?: UploadMaxAggregateInputType
  }

  export type UploadGroupByOutputType = {
    id: string
    user: string
    multipartId: string
    createdAt: Date
    updatedAt: Date
    videoId: string
    _count: UploadCountAggregateOutputType | null
    _min: UploadMinAggregateOutputType | null
    _max: UploadMaxAggregateOutputType | null
  }

  type GetUploadGroupByPayload<T extends uploadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UploadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UploadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UploadGroupByOutputType[P]>
            : GetScalarType<T[P], UploadGroupByOutputType[P]>
        }
      >
    >


  export type uploadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user?: boolean
    multipartId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    videoId?: boolean
    uploader?: boolean | userDefaultArgs<ExtArgs>
    video?: boolean | videoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["upload"]>

  export type uploadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user?: boolean
    multipartId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    videoId?: boolean
    uploader?: boolean | userDefaultArgs<ExtArgs>
    video?: boolean | videoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["upload"]>

  export type uploadSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user?: boolean
    multipartId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    videoId?: boolean
    uploader?: boolean | userDefaultArgs<ExtArgs>
    video?: boolean | videoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["upload"]>

  export type uploadSelectScalar = {
    id?: boolean
    user?: boolean
    multipartId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    videoId?: boolean
  }

  export type uploadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user" | "multipartId" | "createdAt" | "updatedAt" | "videoId", ExtArgs["result"]["upload"]>
  export type uploadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uploader?: boolean | userDefaultArgs<ExtArgs>
    video?: boolean | videoDefaultArgs<ExtArgs>
  }
  export type uploadIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uploader?: boolean | userDefaultArgs<ExtArgs>
    video?: boolean | videoDefaultArgs<ExtArgs>
  }
  export type uploadIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uploader?: boolean | userDefaultArgs<ExtArgs>
    video?: boolean | videoDefaultArgs<ExtArgs>
  }

  export type $uploadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "upload"
    objects: {
      uploader: Prisma.$userPayload<ExtArgs>
      video: Prisma.$videoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user: string
      multipartId: string
      createdAt: Date
      updatedAt: Date
      videoId: string
    }, ExtArgs["result"]["upload"]>
    composites: {}
  }

  type uploadGetPayload<S extends boolean | null | undefined | uploadDefaultArgs> = $Result.GetResult<Prisma.$uploadPayload, S>

  type uploadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<uploadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UploadCountAggregateInputType | true
    }

  export interface uploadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['upload'], meta: { name: 'upload' } }
    /**
     * Find zero or one Upload that matches the filter.
     * @param {uploadFindUniqueArgs} args - Arguments to find a Upload
     * @example
     * // Get one Upload
     * const upload = await prisma.upload.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends uploadFindUniqueArgs>(args: SelectSubset<T, uploadFindUniqueArgs<ExtArgs>>): Prisma__uploadClient<$Result.GetResult<Prisma.$uploadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Upload that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {uploadFindUniqueOrThrowArgs} args - Arguments to find a Upload
     * @example
     * // Get one Upload
     * const upload = await prisma.upload.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends uploadFindUniqueOrThrowArgs>(args: SelectSubset<T, uploadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__uploadClient<$Result.GetResult<Prisma.$uploadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Upload that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {uploadFindFirstArgs} args - Arguments to find a Upload
     * @example
     * // Get one Upload
     * const upload = await prisma.upload.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends uploadFindFirstArgs>(args?: SelectSubset<T, uploadFindFirstArgs<ExtArgs>>): Prisma__uploadClient<$Result.GetResult<Prisma.$uploadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Upload that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {uploadFindFirstOrThrowArgs} args - Arguments to find a Upload
     * @example
     * // Get one Upload
     * const upload = await prisma.upload.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends uploadFindFirstOrThrowArgs>(args?: SelectSubset<T, uploadFindFirstOrThrowArgs<ExtArgs>>): Prisma__uploadClient<$Result.GetResult<Prisma.$uploadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Uploads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {uploadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Uploads
     * const uploads = await prisma.upload.findMany()
     * 
     * // Get first 10 Uploads
     * const uploads = await prisma.upload.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const uploadWithIdOnly = await prisma.upload.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends uploadFindManyArgs>(args?: SelectSubset<T, uploadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$uploadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Upload.
     * @param {uploadCreateArgs} args - Arguments to create a Upload.
     * @example
     * // Create one Upload
     * const Upload = await prisma.upload.create({
     *   data: {
     *     // ... data to create a Upload
     *   }
     * })
     * 
     */
    create<T extends uploadCreateArgs>(args: SelectSubset<T, uploadCreateArgs<ExtArgs>>): Prisma__uploadClient<$Result.GetResult<Prisma.$uploadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Uploads.
     * @param {uploadCreateManyArgs} args - Arguments to create many Uploads.
     * @example
     * // Create many Uploads
     * const upload = await prisma.upload.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends uploadCreateManyArgs>(args?: SelectSubset<T, uploadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Uploads and returns the data saved in the database.
     * @param {uploadCreateManyAndReturnArgs} args - Arguments to create many Uploads.
     * @example
     * // Create many Uploads
     * const upload = await prisma.upload.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Uploads and only return the `id`
     * const uploadWithIdOnly = await prisma.upload.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends uploadCreateManyAndReturnArgs>(args?: SelectSubset<T, uploadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$uploadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Upload.
     * @param {uploadDeleteArgs} args - Arguments to delete one Upload.
     * @example
     * // Delete one Upload
     * const Upload = await prisma.upload.delete({
     *   where: {
     *     // ... filter to delete one Upload
     *   }
     * })
     * 
     */
    delete<T extends uploadDeleteArgs>(args: SelectSubset<T, uploadDeleteArgs<ExtArgs>>): Prisma__uploadClient<$Result.GetResult<Prisma.$uploadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Upload.
     * @param {uploadUpdateArgs} args - Arguments to update one Upload.
     * @example
     * // Update one Upload
     * const upload = await prisma.upload.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends uploadUpdateArgs>(args: SelectSubset<T, uploadUpdateArgs<ExtArgs>>): Prisma__uploadClient<$Result.GetResult<Prisma.$uploadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Uploads.
     * @param {uploadDeleteManyArgs} args - Arguments to filter Uploads to delete.
     * @example
     * // Delete a few Uploads
     * const { count } = await prisma.upload.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends uploadDeleteManyArgs>(args?: SelectSubset<T, uploadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Uploads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {uploadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Uploads
     * const upload = await prisma.upload.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends uploadUpdateManyArgs>(args: SelectSubset<T, uploadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Uploads and returns the data updated in the database.
     * @param {uploadUpdateManyAndReturnArgs} args - Arguments to update many Uploads.
     * @example
     * // Update many Uploads
     * const upload = await prisma.upload.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Uploads and only return the `id`
     * const uploadWithIdOnly = await prisma.upload.updateManyAndReturn({
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
    updateManyAndReturn<T extends uploadUpdateManyAndReturnArgs>(args: SelectSubset<T, uploadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$uploadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Upload.
     * @param {uploadUpsertArgs} args - Arguments to update or create a Upload.
     * @example
     * // Update or create a Upload
     * const upload = await prisma.upload.upsert({
     *   create: {
     *     // ... data to create a Upload
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Upload we want to update
     *   }
     * })
     */
    upsert<T extends uploadUpsertArgs>(args: SelectSubset<T, uploadUpsertArgs<ExtArgs>>): Prisma__uploadClient<$Result.GetResult<Prisma.$uploadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Uploads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {uploadCountArgs} args - Arguments to filter Uploads to count.
     * @example
     * // Count the number of Uploads
     * const count = await prisma.upload.count({
     *   where: {
     *     // ... the filter for the Uploads we want to count
     *   }
     * })
    **/
    count<T extends uploadCountArgs>(
      args?: Subset<T, uploadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UploadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Upload.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UploadAggregateArgs>(args: Subset<T, UploadAggregateArgs>): Prisma.PrismaPromise<GetUploadAggregateType<T>>

    /**
     * Group by Upload.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {uploadGroupByArgs} args - Group by arguments.
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
      T extends uploadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: uploadGroupByArgs['orderBy'] }
        : { orderBy?: uploadGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, uploadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUploadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the upload model
   */
  readonly fields: uploadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for upload.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__uploadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    uploader<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    video<T extends videoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, videoDefaultArgs<ExtArgs>>): Prisma__videoClient<$Result.GetResult<Prisma.$videoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the upload model
   */
  interface uploadFieldRefs {
    readonly id: FieldRef<"upload", 'String'>
    readonly user: FieldRef<"upload", 'String'>
    readonly multipartId: FieldRef<"upload", 'String'>
    readonly createdAt: FieldRef<"upload", 'DateTime'>
    readonly updatedAt: FieldRef<"upload", 'DateTime'>
    readonly videoId: FieldRef<"upload", 'String'>
  }
    

  // Custom InputTypes
  /**
   * upload findUnique
   */
  export type uploadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the upload
     */
    select?: uploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the upload
     */
    omit?: uploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: uploadInclude<ExtArgs> | null
    /**
     * Filter, which upload to fetch.
     */
    where: uploadWhereUniqueInput
  }

  /**
   * upload findUniqueOrThrow
   */
  export type uploadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the upload
     */
    select?: uploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the upload
     */
    omit?: uploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: uploadInclude<ExtArgs> | null
    /**
     * Filter, which upload to fetch.
     */
    where: uploadWhereUniqueInput
  }

  /**
   * upload findFirst
   */
  export type uploadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the upload
     */
    select?: uploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the upload
     */
    omit?: uploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: uploadInclude<ExtArgs> | null
    /**
     * Filter, which upload to fetch.
     */
    where?: uploadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of uploads to fetch.
     */
    orderBy?: uploadOrderByWithRelationInput | uploadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for uploads.
     */
    cursor?: uploadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` uploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` uploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of uploads.
     */
    distinct?: UploadScalarFieldEnum | UploadScalarFieldEnum[]
  }

  /**
   * upload findFirstOrThrow
   */
  export type uploadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the upload
     */
    select?: uploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the upload
     */
    omit?: uploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: uploadInclude<ExtArgs> | null
    /**
     * Filter, which upload to fetch.
     */
    where?: uploadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of uploads to fetch.
     */
    orderBy?: uploadOrderByWithRelationInput | uploadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for uploads.
     */
    cursor?: uploadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` uploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` uploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of uploads.
     */
    distinct?: UploadScalarFieldEnum | UploadScalarFieldEnum[]
  }

  /**
   * upload findMany
   */
  export type uploadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the upload
     */
    select?: uploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the upload
     */
    omit?: uploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: uploadInclude<ExtArgs> | null
    /**
     * Filter, which uploads to fetch.
     */
    where?: uploadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of uploads to fetch.
     */
    orderBy?: uploadOrderByWithRelationInput | uploadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing uploads.
     */
    cursor?: uploadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` uploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` uploads.
     */
    skip?: number
    distinct?: UploadScalarFieldEnum | UploadScalarFieldEnum[]
  }

  /**
   * upload create
   */
  export type uploadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the upload
     */
    select?: uploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the upload
     */
    omit?: uploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: uploadInclude<ExtArgs> | null
    /**
     * The data needed to create a upload.
     */
    data: XOR<uploadCreateInput, uploadUncheckedCreateInput>
  }

  /**
   * upload createMany
   */
  export type uploadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many uploads.
     */
    data: uploadCreateManyInput | uploadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * upload createManyAndReturn
   */
  export type uploadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the upload
     */
    select?: uploadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the upload
     */
    omit?: uploadOmit<ExtArgs> | null
    /**
     * The data used to create many uploads.
     */
    data: uploadCreateManyInput | uploadCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: uploadIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * upload update
   */
  export type uploadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the upload
     */
    select?: uploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the upload
     */
    omit?: uploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: uploadInclude<ExtArgs> | null
    /**
     * The data needed to update a upload.
     */
    data: XOR<uploadUpdateInput, uploadUncheckedUpdateInput>
    /**
     * Choose, which upload to update.
     */
    where: uploadWhereUniqueInput
  }

  /**
   * upload updateMany
   */
  export type uploadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update uploads.
     */
    data: XOR<uploadUpdateManyMutationInput, uploadUncheckedUpdateManyInput>
    /**
     * Filter which uploads to update
     */
    where?: uploadWhereInput
    /**
     * Limit how many uploads to update.
     */
    limit?: number
  }

  /**
   * upload updateManyAndReturn
   */
  export type uploadUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the upload
     */
    select?: uploadSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the upload
     */
    omit?: uploadOmit<ExtArgs> | null
    /**
     * The data used to update uploads.
     */
    data: XOR<uploadUpdateManyMutationInput, uploadUncheckedUpdateManyInput>
    /**
     * Filter which uploads to update
     */
    where?: uploadWhereInput
    /**
     * Limit how many uploads to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: uploadIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * upload upsert
   */
  export type uploadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the upload
     */
    select?: uploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the upload
     */
    omit?: uploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: uploadInclude<ExtArgs> | null
    /**
     * The filter to search for the upload to update in case it exists.
     */
    where: uploadWhereUniqueInput
    /**
     * In case the upload found by the `where` argument doesn't exist, create a new upload with this data.
     */
    create: XOR<uploadCreateInput, uploadUncheckedCreateInput>
    /**
     * In case the upload was found with the provided `where` argument, update it with this data.
     */
    update: XOR<uploadUpdateInput, uploadUncheckedUpdateInput>
  }

  /**
   * upload delete
   */
  export type uploadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the upload
     */
    select?: uploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the upload
     */
    omit?: uploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: uploadInclude<ExtArgs> | null
    /**
     * Filter which upload to delete.
     */
    where: uploadWhereUniqueInput
  }

  /**
   * upload deleteMany
   */
  export type uploadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which uploads to delete
     */
    where?: uploadWhereInput
    /**
     * Limit how many uploads to delete.
     */
    limit?: number
  }

  /**
   * upload without action
   */
  export type uploadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the upload
     */
    select?: uploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the upload
     */
    omit?: uploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: uploadInclude<ExtArgs> | null
  }


  /**
   * Model videoProcessingTask
   */

  export type AggregateVideoProcessingTask = {
    _count: VideoProcessingTaskCountAggregateOutputType | null
    _min: VideoProcessingTaskMinAggregateOutputType | null
    _max: VideoProcessingTaskMaxAggregateOutputType | null
  }

  export type VideoProcessingTaskMinAggregateOutputType = {
    id: string | null
    objectName: string | null
    status: $Enums.VideoProcessingStatus | null
    videoId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VideoProcessingTaskMaxAggregateOutputType = {
    id: string | null
    objectName: string | null
    status: $Enums.VideoProcessingStatus | null
    videoId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VideoProcessingTaskCountAggregateOutputType = {
    id: number
    objectName: number
    status: number
    videoId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VideoProcessingTaskMinAggregateInputType = {
    id?: true
    objectName?: true
    status?: true
    videoId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VideoProcessingTaskMaxAggregateInputType = {
    id?: true
    objectName?: true
    status?: true
    videoId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VideoProcessingTaskCountAggregateInputType = {
    id?: true
    objectName?: true
    status?: true
    videoId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VideoProcessingTaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which videoProcessingTask to aggregate.
     */
    where?: videoProcessingTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of videoProcessingTasks to fetch.
     */
    orderBy?: videoProcessingTaskOrderByWithRelationInput | videoProcessingTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: videoProcessingTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` videoProcessingTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` videoProcessingTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned videoProcessingTasks
    **/
    _count?: true | VideoProcessingTaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VideoProcessingTaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VideoProcessingTaskMaxAggregateInputType
  }

  export type GetVideoProcessingTaskAggregateType<T extends VideoProcessingTaskAggregateArgs> = {
        [P in keyof T & keyof AggregateVideoProcessingTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVideoProcessingTask[P]>
      : GetScalarType<T[P], AggregateVideoProcessingTask[P]>
  }




  export type videoProcessingTaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: videoProcessingTaskWhereInput
    orderBy?: videoProcessingTaskOrderByWithAggregationInput | videoProcessingTaskOrderByWithAggregationInput[]
    by: VideoProcessingTaskScalarFieldEnum[] | VideoProcessingTaskScalarFieldEnum
    having?: videoProcessingTaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VideoProcessingTaskCountAggregateInputType | true
    _min?: VideoProcessingTaskMinAggregateInputType
    _max?: VideoProcessingTaskMaxAggregateInputType
  }

  export type VideoProcessingTaskGroupByOutputType = {
    id: string
    objectName: string
    status: $Enums.VideoProcessingStatus
    videoId: string
    createdAt: Date
    updatedAt: Date
    _count: VideoProcessingTaskCountAggregateOutputType | null
    _min: VideoProcessingTaskMinAggregateOutputType | null
    _max: VideoProcessingTaskMaxAggregateOutputType | null
  }

  type GetVideoProcessingTaskGroupByPayload<T extends videoProcessingTaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VideoProcessingTaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VideoProcessingTaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VideoProcessingTaskGroupByOutputType[P]>
            : GetScalarType<T[P], VideoProcessingTaskGroupByOutputType[P]>
        }
      >
    >


  export type videoProcessingTaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    objectName?: boolean
    status?: boolean
    videoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    video?: boolean | videoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["videoProcessingTask"]>

  export type videoProcessingTaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    objectName?: boolean
    status?: boolean
    videoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    video?: boolean | videoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["videoProcessingTask"]>

  export type videoProcessingTaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    objectName?: boolean
    status?: boolean
    videoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    video?: boolean | videoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["videoProcessingTask"]>

  export type videoProcessingTaskSelectScalar = {
    id?: boolean
    objectName?: boolean
    status?: boolean
    videoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type videoProcessingTaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "objectName" | "status" | "videoId" | "createdAt" | "updatedAt", ExtArgs["result"]["videoProcessingTask"]>
  export type videoProcessingTaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    video?: boolean | videoDefaultArgs<ExtArgs>
  }
  export type videoProcessingTaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    video?: boolean | videoDefaultArgs<ExtArgs>
  }
  export type videoProcessingTaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    video?: boolean | videoDefaultArgs<ExtArgs>
  }

  export type $videoProcessingTaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "videoProcessingTask"
    objects: {
      video: Prisma.$videoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      objectName: string
      status: $Enums.VideoProcessingStatus
      videoId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["videoProcessingTask"]>
    composites: {}
  }

  type videoProcessingTaskGetPayload<S extends boolean | null | undefined | videoProcessingTaskDefaultArgs> = $Result.GetResult<Prisma.$videoProcessingTaskPayload, S>

  type videoProcessingTaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<videoProcessingTaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VideoProcessingTaskCountAggregateInputType | true
    }

  export interface videoProcessingTaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['videoProcessingTask'], meta: { name: 'videoProcessingTask' } }
    /**
     * Find zero or one VideoProcessingTask that matches the filter.
     * @param {videoProcessingTaskFindUniqueArgs} args - Arguments to find a VideoProcessingTask
     * @example
     * // Get one VideoProcessingTask
     * const videoProcessingTask = await prisma.videoProcessingTask.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends videoProcessingTaskFindUniqueArgs>(args: SelectSubset<T, videoProcessingTaskFindUniqueArgs<ExtArgs>>): Prisma__videoProcessingTaskClient<$Result.GetResult<Prisma.$videoProcessingTaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VideoProcessingTask that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {videoProcessingTaskFindUniqueOrThrowArgs} args - Arguments to find a VideoProcessingTask
     * @example
     * // Get one VideoProcessingTask
     * const videoProcessingTask = await prisma.videoProcessingTask.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends videoProcessingTaskFindUniqueOrThrowArgs>(args: SelectSubset<T, videoProcessingTaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__videoProcessingTaskClient<$Result.GetResult<Prisma.$videoProcessingTaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VideoProcessingTask that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {videoProcessingTaskFindFirstArgs} args - Arguments to find a VideoProcessingTask
     * @example
     * // Get one VideoProcessingTask
     * const videoProcessingTask = await prisma.videoProcessingTask.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends videoProcessingTaskFindFirstArgs>(args?: SelectSubset<T, videoProcessingTaskFindFirstArgs<ExtArgs>>): Prisma__videoProcessingTaskClient<$Result.GetResult<Prisma.$videoProcessingTaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VideoProcessingTask that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {videoProcessingTaskFindFirstOrThrowArgs} args - Arguments to find a VideoProcessingTask
     * @example
     * // Get one VideoProcessingTask
     * const videoProcessingTask = await prisma.videoProcessingTask.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends videoProcessingTaskFindFirstOrThrowArgs>(args?: SelectSubset<T, videoProcessingTaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__videoProcessingTaskClient<$Result.GetResult<Prisma.$videoProcessingTaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VideoProcessingTasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {videoProcessingTaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VideoProcessingTasks
     * const videoProcessingTasks = await prisma.videoProcessingTask.findMany()
     * 
     * // Get first 10 VideoProcessingTasks
     * const videoProcessingTasks = await prisma.videoProcessingTask.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const videoProcessingTaskWithIdOnly = await prisma.videoProcessingTask.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends videoProcessingTaskFindManyArgs>(args?: SelectSubset<T, videoProcessingTaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$videoProcessingTaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VideoProcessingTask.
     * @param {videoProcessingTaskCreateArgs} args - Arguments to create a VideoProcessingTask.
     * @example
     * // Create one VideoProcessingTask
     * const VideoProcessingTask = await prisma.videoProcessingTask.create({
     *   data: {
     *     // ... data to create a VideoProcessingTask
     *   }
     * })
     * 
     */
    create<T extends videoProcessingTaskCreateArgs>(args: SelectSubset<T, videoProcessingTaskCreateArgs<ExtArgs>>): Prisma__videoProcessingTaskClient<$Result.GetResult<Prisma.$videoProcessingTaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VideoProcessingTasks.
     * @param {videoProcessingTaskCreateManyArgs} args - Arguments to create many VideoProcessingTasks.
     * @example
     * // Create many VideoProcessingTasks
     * const videoProcessingTask = await prisma.videoProcessingTask.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends videoProcessingTaskCreateManyArgs>(args?: SelectSubset<T, videoProcessingTaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VideoProcessingTasks and returns the data saved in the database.
     * @param {videoProcessingTaskCreateManyAndReturnArgs} args - Arguments to create many VideoProcessingTasks.
     * @example
     * // Create many VideoProcessingTasks
     * const videoProcessingTask = await prisma.videoProcessingTask.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VideoProcessingTasks and only return the `id`
     * const videoProcessingTaskWithIdOnly = await prisma.videoProcessingTask.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends videoProcessingTaskCreateManyAndReturnArgs>(args?: SelectSubset<T, videoProcessingTaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$videoProcessingTaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VideoProcessingTask.
     * @param {videoProcessingTaskDeleteArgs} args - Arguments to delete one VideoProcessingTask.
     * @example
     * // Delete one VideoProcessingTask
     * const VideoProcessingTask = await prisma.videoProcessingTask.delete({
     *   where: {
     *     // ... filter to delete one VideoProcessingTask
     *   }
     * })
     * 
     */
    delete<T extends videoProcessingTaskDeleteArgs>(args: SelectSubset<T, videoProcessingTaskDeleteArgs<ExtArgs>>): Prisma__videoProcessingTaskClient<$Result.GetResult<Prisma.$videoProcessingTaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VideoProcessingTask.
     * @param {videoProcessingTaskUpdateArgs} args - Arguments to update one VideoProcessingTask.
     * @example
     * // Update one VideoProcessingTask
     * const videoProcessingTask = await prisma.videoProcessingTask.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends videoProcessingTaskUpdateArgs>(args: SelectSubset<T, videoProcessingTaskUpdateArgs<ExtArgs>>): Prisma__videoProcessingTaskClient<$Result.GetResult<Prisma.$videoProcessingTaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VideoProcessingTasks.
     * @param {videoProcessingTaskDeleteManyArgs} args - Arguments to filter VideoProcessingTasks to delete.
     * @example
     * // Delete a few VideoProcessingTasks
     * const { count } = await prisma.videoProcessingTask.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends videoProcessingTaskDeleteManyArgs>(args?: SelectSubset<T, videoProcessingTaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VideoProcessingTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {videoProcessingTaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VideoProcessingTasks
     * const videoProcessingTask = await prisma.videoProcessingTask.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends videoProcessingTaskUpdateManyArgs>(args: SelectSubset<T, videoProcessingTaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VideoProcessingTasks and returns the data updated in the database.
     * @param {videoProcessingTaskUpdateManyAndReturnArgs} args - Arguments to update many VideoProcessingTasks.
     * @example
     * // Update many VideoProcessingTasks
     * const videoProcessingTask = await prisma.videoProcessingTask.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VideoProcessingTasks and only return the `id`
     * const videoProcessingTaskWithIdOnly = await prisma.videoProcessingTask.updateManyAndReturn({
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
    updateManyAndReturn<T extends videoProcessingTaskUpdateManyAndReturnArgs>(args: SelectSubset<T, videoProcessingTaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$videoProcessingTaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VideoProcessingTask.
     * @param {videoProcessingTaskUpsertArgs} args - Arguments to update or create a VideoProcessingTask.
     * @example
     * // Update or create a VideoProcessingTask
     * const videoProcessingTask = await prisma.videoProcessingTask.upsert({
     *   create: {
     *     // ... data to create a VideoProcessingTask
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VideoProcessingTask we want to update
     *   }
     * })
     */
    upsert<T extends videoProcessingTaskUpsertArgs>(args: SelectSubset<T, videoProcessingTaskUpsertArgs<ExtArgs>>): Prisma__videoProcessingTaskClient<$Result.GetResult<Prisma.$videoProcessingTaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VideoProcessingTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {videoProcessingTaskCountArgs} args - Arguments to filter VideoProcessingTasks to count.
     * @example
     * // Count the number of VideoProcessingTasks
     * const count = await prisma.videoProcessingTask.count({
     *   where: {
     *     // ... the filter for the VideoProcessingTasks we want to count
     *   }
     * })
    **/
    count<T extends videoProcessingTaskCountArgs>(
      args?: Subset<T, videoProcessingTaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VideoProcessingTaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VideoProcessingTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoProcessingTaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VideoProcessingTaskAggregateArgs>(args: Subset<T, VideoProcessingTaskAggregateArgs>): Prisma.PrismaPromise<GetVideoProcessingTaskAggregateType<T>>

    /**
     * Group by VideoProcessingTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {videoProcessingTaskGroupByArgs} args - Group by arguments.
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
      T extends videoProcessingTaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: videoProcessingTaskGroupByArgs['orderBy'] }
        : { orderBy?: videoProcessingTaskGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, videoProcessingTaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVideoProcessingTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the videoProcessingTask model
   */
  readonly fields: videoProcessingTaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for videoProcessingTask.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__videoProcessingTaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    video<T extends videoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, videoDefaultArgs<ExtArgs>>): Prisma__videoClient<$Result.GetResult<Prisma.$videoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the videoProcessingTask model
   */
  interface videoProcessingTaskFieldRefs {
    readonly id: FieldRef<"videoProcessingTask", 'String'>
    readonly objectName: FieldRef<"videoProcessingTask", 'String'>
    readonly status: FieldRef<"videoProcessingTask", 'VideoProcessingStatus'>
    readonly videoId: FieldRef<"videoProcessingTask", 'String'>
    readonly createdAt: FieldRef<"videoProcessingTask", 'DateTime'>
    readonly updatedAt: FieldRef<"videoProcessingTask", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * videoProcessingTask findUnique
   */
  export type videoProcessingTaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the videoProcessingTask
     */
    select?: videoProcessingTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the videoProcessingTask
     */
    omit?: videoProcessingTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: videoProcessingTaskInclude<ExtArgs> | null
    /**
     * Filter, which videoProcessingTask to fetch.
     */
    where: videoProcessingTaskWhereUniqueInput
  }

  /**
   * videoProcessingTask findUniqueOrThrow
   */
  export type videoProcessingTaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the videoProcessingTask
     */
    select?: videoProcessingTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the videoProcessingTask
     */
    omit?: videoProcessingTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: videoProcessingTaskInclude<ExtArgs> | null
    /**
     * Filter, which videoProcessingTask to fetch.
     */
    where: videoProcessingTaskWhereUniqueInput
  }

  /**
   * videoProcessingTask findFirst
   */
  export type videoProcessingTaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the videoProcessingTask
     */
    select?: videoProcessingTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the videoProcessingTask
     */
    omit?: videoProcessingTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: videoProcessingTaskInclude<ExtArgs> | null
    /**
     * Filter, which videoProcessingTask to fetch.
     */
    where?: videoProcessingTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of videoProcessingTasks to fetch.
     */
    orderBy?: videoProcessingTaskOrderByWithRelationInput | videoProcessingTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for videoProcessingTasks.
     */
    cursor?: videoProcessingTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` videoProcessingTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` videoProcessingTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of videoProcessingTasks.
     */
    distinct?: VideoProcessingTaskScalarFieldEnum | VideoProcessingTaskScalarFieldEnum[]
  }

  /**
   * videoProcessingTask findFirstOrThrow
   */
  export type videoProcessingTaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the videoProcessingTask
     */
    select?: videoProcessingTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the videoProcessingTask
     */
    omit?: videoProcessingTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: videoProcessingTaskInclude<ExtArgs> | null
    /**
     * Filter, which videoProcessingTask to fetch.
     */
    where?: videoProcessingTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of videoProcessingTasks to fetch.
     */
    orderBy?: videoProcessingTaskOrderByWithRelationInput | videoProcessingTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for videoProcessingTasks.
     */
    cursor?: videoProcessingTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` videoProcessingTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` videoProcessingTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of videoProcessingTasks.
     */
    distinct?: VideoProcessingTaskScalarFieldEnum | VideoProcessingTaskScalarFieldEnum[]
  }

  /**
   * videoProcessingTask findMany
   */
  export type videoProcessingTaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the videoProcessingTask
     */
    select?: videoProcessingTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the videoProcessingTask
     */
    omit?: videoProcessingTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: videoProcessingTaskInclude<ExtArgs> | null
    /**
     * Filter, which videoProcessingTasks to fetch.
     */
    where?: videoProcessingTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of videoProcessingTasks to fetch.
     */
    orderBy?: videoProcessingTaskOrderByWithRelationInput | videoProcessingTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing videoProcessingTasks.
     */
    cursor?: videoProcessingTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` videoProcessingTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` videoProcessingTasks.
     */
    skip?: number
    distinct?: VideoProcessingTaskScalarFieldEnum | VideoProcessingTaskScalarFieldEnum[]
  }

  /**
   * videoProcessingTask create
   */
  export type videoProcessingTaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the videoProcessingTask
     */
    select?: videoProcessingTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the videoProcessingTask
     */
    omit?: videoProcessingTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: videoProcessingTaskInclude<ExtArgs> | null
    /**
     * The data needed to create a videoProcessingTask.
     */
    data: XOR<videoProcessingTaskCreateInput, videoProcessingTaskUncheckedCreateInput>
  }

  /**
   * videoProcessingTask createMany
   */
  export type videoProcessingTaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many videoProcessingTasks.
     */
    data: videoProcessingTaskCreateManyInput | videoProcessingTaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * videoProcessingTask createManyAndReturn
   */
  export type videoProcessingTaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the videoProcessingTask
     */
    select?: videoProcessingTaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the videoProcessingTask
     */
    omit?: videoProcessingTaskOmit<ExtArgs> | null
    /**
     * The data used to create many videoProcessingTasks.
     */
    data: videoProcessingTaskCreateManyInput | videoProcessingTaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: videoProcessingTaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * videoProcessingTask update
   */
  export type videoProcessingTaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the videoProcessingTask
     */
    select?: videoProcessingTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the videoProcessingTask
     */
    omit?: videoProcessingTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: videoProcessingTaskInclude<ExtArgs> | null
    /**
     * The data needed to update a videoProcessingTask.
     */
    data: XOR<videoProcessingTaskUpdateInput, videoProcessingTaskUncheckedUpdateInput>
    /**
     * Choose, which videoProcessingTask to update.
     */
    where: videoProcessingTaskWhereUniqueInput
  }

  /**
   * videoProcessingTask updateMany
   */
  export type videoProcessingTaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update videoProcessingTasks.
     */
    data: XOR<videoProcessingTaskUpdateManyMutationInput, videoProcessingTaskUncheckedUpdateManyInput>
    /**
     * Filter which videoProcessingTasks to update
     */
    where?: videoProcessingTaskWhereInput
    /**
     * Limit how many videoProcessingTasks to update.
     */
    limit?: number
  }

  /**
   * videoProcessingTask updateManyAndReturn
   */
  export type videoProcessingTaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the videoProcessingTask
     */
    select?: videoProcessingTaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the videoProcessingTask
     */
    omit?: videoProcessingTaskOmit<ExtArgs> | null
    /**
     * The data used to update videoProcessingTasks.
     */
    data: XOR<videoProcessingTaskUpdateManyMutationInput, videoProcessingTaskUncheckedUpdateManyInput>
    /**
     * Filter which videoProcessingTasks to update
     */
    where?: videoProcessingTaskWhereInput
    /**
     * Limit how many videoProcessingTasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: videoProcessingTaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * videoProcessingTask upsert
   */
  export type videoProcessingTaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the videoProcessingTask
     */
    select?: videoProcessingTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the videoProcessingTask
     */
    omit?: videoProcessingTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: videoProcessingTaskInclude<ExtArgs> | null
    /**
     * The filter to search for the videoProcessingTask to update in case it exists.
     */
    where: videoProcessingTaskWhereUniqueInput
    /**
     * In case the videoProcessingTask found by the `where` argument doesn't exist, create a new videoProcessingTask with this data.
     */
    create: XOR<videoProcessingTaskCreateInput, videoProcessingTaskUncheckedCreateInput>
    /**
     * In case the videoProcessingTask was found with the provided `where` argument, update it with this data.
     */
    update: XOR<videoProcessingTaskUpdateInput, videoProcessingTaskUncheckedUpdateInput>
  }

  /**
   * videoProcessingTask delete
   */
  export type videoProcessingTaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the videoProcessingTask
     */
    select?: videoProcessingTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the videoProcessingTask
     */
    omit?: videoProcessingTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: videoProcessingTaskInclude<ExtArgs> | null
    /**
     * Filter which videoProcessingTask to delete.
     */
    where: videoProcessingTaskWhereUniqueInput
  }

  /**
   * videoProcessingTask deleteMany
   */
  export type videoProcessingTaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which videoProcessingTasks to delete
     */
    where?: videoProcessingTaskWhereInput
    /**
     * Limit how many videoProcessingTasks to delete.
     */
    limit?: number
  }

  /**
   * videoProcessingTask without action
   */
  export type videoProcessingTaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the videoProcessingTask
     */
    select?: videoProcessingTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the videoProcessingTask
     */
    omit?: videoProcessingTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: videoProcessingTaskInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    channelDescription: 'channelDescription',
    avatar: 'avatar',
    channelCover: 'channelCover',
    email: 'email',
    password: 'password',
    role: 'role',
    banned: 'banned',
    OTPSecret: 'OTPSecret',
    OTPPendingValidation: 'OTPPendingValidation',
    OTPRecoveryCode: 'OTPRecoveryCode',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const VideoScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    thumbnail: 'thumbnail',
    hlsMaterList: 'hlsMaterList',
    previewClip: 'previewClip',
    userId: 'userId',
    public: 'public',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VideoScalarFieldEnum = (typeof VideoScalarFieldEnum)[keyof typeof VideoScalarFieldEnum]


  export const UploadScalarFieldEnum: {
    id: 'id',
    user: 'user',
    multipartId: 'multipartId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    videoId: 'videoId'
  };

  export type UploadScalarFieldEnum = (typeof UploadScalarFieldEnum)[keyof typeof UploadScalarFieldEnum]


  export const VideoProcessingTaskScalarFieldEnum: {
    id: 'id',
    objectName: 'objectName',
    status: 'status',
    videoId: 'videoId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VideoProcessingTaskScalarFieldEnum = (typeof VideoProcessingTaskScalarFieldEnum)[keyof typeof VideoProcessingTaskScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


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
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'VideoProcessingStatus'
   */
  export type EnumVideoProcessingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VideoProcessingStatus'>
    


  /**
   * Reference to a field of type 'VideoProcessingStatus[]'
   */
  export type ListEnumVideoProcessingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VideoProcessingStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type userWhereInput = {
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    id?: StringFilter<"user"> | string
    username?: StringFilter<"user"> | string
    channelDescription?: StringNullableFilter<"user"> | string | null
    avatar?: StringNullableFilter<"user"> | string | null
    channelCover?: StringNullableFilter<"user"> | string | null
    email?: StringFilter<"user"> | string
    password?: StringFilter<"user"> | string
    role?: EnumRoleFilter<"user"> | $Enums.Role
    banned?: BoolFilter<"user"> | boolean
    OTPSecret?: StringNullableFilter<"user"> | string | null
    OTPPendingValidation?: BoolNullableFilter<"user"> | boolean | null
    OTPRecoveryCode?: StringNullableFilter<"user"> | string | null
    createdAt?: DateTimeFilter<"user"> | Date | string
    updatedAt?: DateTimeFilter<"user"> | Date | string
    video?: VideoListRelationFilter
    upload?: UploadListRelationFilter
  }

  export type userOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    channelDescription?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    channelCover?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    banned?: SortOrder
    OTPSecret?: SortOrderInput | SortOrder
    OTPPendingValidation?: SortOrderInput | SortOrder
    OTPRecoveryCode?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    video?: videoOrderByRelationAggregateInput
    upload?: uploadOrderByRelationAggregateInput
  }

  export type userWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    channelDescription?: StringNullableFilter<"user"> | string | null
    avatar?: StringNullableFilter<"user"> | string | null
    channelCover?: StringNullableFilter<"user"> | string | null
    password?: StringFilter<"user"> | string
    role?: EnumRoleFilter<"user"> | $Enums.Role
    banned?: BoolFilter<"user"> | boolean
    OTPSecret?: StringNullableFilter<"user"> | string | null
    OTPPendingValidation?: BoolNullableFilter<"user"> | boolean | null
    OTPRecoveryCode?: StringNullableFilter<"user"> | string | null
    createdAt?: DateTimeFilter<"user"> | Date | string
    updatedAt?: DateTimeFilter<"user"> | Date | string
    video?: VideoListRelationFilter
    upload?: UploadListRelationFilter
  }, "id" | "username" | "email">

  export type userOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    channelDescription?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    channelCover?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    banned?: SortOrder
    OTPSecret?: SortOrderInput | SortOrder
    OTPPendingValidation?: SortOrderInput | SortOrder
    OTPRecoveryCode?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: userCountOrderByAggregateInput
    _max?: userMaxOrderByAggregateInput
    _min?: userMinOrderByAggregateInput
  }

  export type userScalarWhereWithAggregatesInput = {
    AND?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    OR?: userScalarWhereWithAggregatesInput[]
    NOT?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"user"> | string
    username?: StringWithAggregatesFilter<"user"> | string
    channelDescription?: StringNullableWithAggregatesFilter<"user"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"user"> | string | null
    channelCover?: StringNullableWithAggregatesFilter<"user"> | string | null
    email?: StringWithAggregatesFilter<"user"> | string
    password?: StringWithAggregatesFilter<"user"> | string
    role?: EnumRoleWithAggregatesFilter<"user"> | $Enums.Role
    banned?: BoolWithAggregatesFilter<"user"> | boolean
    OTPSecret?: StringNullableWithAggregatesFilter<"user"> | string | null
    OTPPendingValidation?: BoolNullableWithAggregatesFilter<"user"> | boolean | null
    OTPRecoveryCode?: StringNullableWithAggregatesFilter<"user"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"user"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"user"> | Date | string
  }

  export type videoWhereInput = {
    AND?: videoWhereInput | videoWhereInput[]
    OR?: videoWhereInput[]
    NOT?: videoWhereInput | videoWhereInput[]
    id?: StringFilter<"video"> | string
    title?: StringFilter<"video"> | string
    description?: StringFilter<"video"> | string
    thumbnail?: StringNullableFilter<"video"> | string | null
    hlsMaterList?: StringNullableFilter<"video"> | string | null
    previewClip?: StringNullableFilter<"video"> | string | null
    userId?: StringFilter<"video"> | string
    public?: BoolFilter<"video"> | boolean
    createdAt?: DateTimeFilter<"video"> | Date | string
    updatedAt?: DateTimeFilter<"video"> | Date | string
    uploadedBy?: XOR<UserScalarRelationFilter, userWhereInput>
    videoProcessingTask?: VideoProcessingTaskListRelationFilter
    upload?: UploadListRelationFilter
  }

  export type videoOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    thumbnail?: SortOrderInput | SortOrder
    hlsMaterList?: SortOrderInput | SortOrder
    previewClip?: SortOrderInput | SortOrder
    userId?: SortOrder
    public?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    uploadedBy?: userOrderByWithRelationInput
    videoProcessingTask?: videoProcessingTaskOrderByRelationAggregateInput
    upload?: uploadOrderByRelationAggregateInput
  }

  export type videoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: videoWhereInput | videoWhereInput[]
    OR?: videoWhereInput[]
    NOT?: videoWhereInput | videoWhereInput[]
    title?: StringFilter<"video"> | string
    description?: StringFilter<"video"> | string
    thumbnail?: StringNullableFilter<"video"> | string | null
    hlsMaterList?: StringNullableFilter<"video"> | string | null
    previewClip?: StringNullableFilter<"video"> | string | null
    userId?: StringFilter<"video"> | string
    public?: BoolFilter<"video"> | boolean
    createdAt?: DateTimeFilter<"video"> | Date | string
    updatedAt?: DateTimeFilter<"video"> | Date | string
    uploadedBy?: XOR<UserScalarRelationFilter, userWhereInput>
    videoProcessingTask?: VideoProcessingTaskListRelationFilter
    upload?: UploadListRelationFilter
  }, "id">

  export type videoOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    thumbnail?: SortOrderInput | SortOrder
    hlsMaterList?: SortOrderInput | SortOrder
    previewClip?: SortOrderInput | SortOrder
    userId?: SortOrder
    public?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: videoCountOrderByAggregateInput
    _max?: videoMaxOrderByAggregateInput
    _min?: videoMinOrderByAggregateInput
  }

  export type videoScalarWhereWithAggregatesInput = {
    AND?: videoScalarWhereWithAggregatesInput | videoScalarWhereWithAggregatesInput[]
    OR?: videoScalarWhereWithAggregatesInput[]
    NOT?: videoScalarWhereWithAggregatesInput | videoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"video"> | string
    title?: StringWithAggregatesFilter<"video"> | string
    description?: StringWithAggregatesFilter<"video"> | string
    thumbnail?: StringNullableWithAggregatesFilter<"video"> | string | null
    hlsMaterList?: StringNullableWithAggregatesFilter<"video"> | string | null
    previewClip?: StringNullableWithAggregatesFilter<"video"> | string | null
    userId?: StringWithAggregatesFilter<"video"> | string
    public?: BoolWithAggregatesFilter<"video"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"video"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"video"> | Date | string
  }

  export type uploadWhereInput = {
    AND?: uploadWhereInput | uploadWhereInput[]
    OR?: uploadWhereInput[]
    NOT?: uploadWhereInput | uploadWhereInput[]
    id?: StringFilter<"upload"> | string
    user?: StringFilter<"upload"> | string
    multipartId?: StringFilter<"upload"> | string
    createdAt?: DateTimeFilter<"upload"> | Date | string
    updatedAt?: DateTimeFilter<"upload"> | Date | string
    videoId?: StringFilter<"upload"> | string
    uploader?: XOR<UserScalarRelationFilter, userWhereInput>
    video?: XOR<VideoScalarRelationFilter, videoWhereInput>
  }

  export type uploadOrderByWithRelationInput = {
    id?: SortOrder
    user?: SortOrder
    multipartId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    videoId?: SortOrder
    uploader?: userOrderByWithRelationInput
    video?: videoOrderByWithRelationInput
  }

  export type uploadWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    multipartId?: string
    AND?: uploadWhereInput | uploadWhereInput[]
    OR?: uploadWhereInput[]
    NOT?: uploadWhereInput | uploadWhereInput[]
    user?: StringFilter<"upload"> | string
    createdAt?: DateTimeFilter<"upload"> | Date | string
    updatedAt?: DateTimeFilter<"upload"> | Date | string
    videoId?: StringFilter<"upload"> | string
    uploader?: XOR<UserScalarRelationFilter, userWhereInput>
    video?: XOR<VideoScalarRelationFilter, videoWhereInput>
  }, "id" | "multipartId">

  export type uploadOrderByWithAggregationInput = {
    id?: SortOrder
    user?: SortOrder
    multipartId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    videoId?: SortOrder
    _count?: uploadCountOrderByAggregateInput
    _max?: uploadMaxOrderByAggregateInput
    _min?: uploadMinOrderByAggregateInput
  }

  export type uploadScalarWhereWithAggregatesInput = {
    AND?: uploadScalarWhereWithAggregatesInput | uploadScalarWhereWithAggregatesInput[]
    OR?: uploadScalarWhereWithAggregatesInput[]
    NOT?: uploadScalarWhereWithAggregatesInput | uploadScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"upload"> | string
    user?: StringWithAggregatesFilter<"upload"> | string
    multipartId?: StringWithAggregatesFilter<"upload"> | string
    createdAt?: DateTimeWithAggregatesFilter<"upload"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"upload"> | Date | string
    videoId?: StringWithAggregatesFilter<"upload"> | string
  }

  export type videoProcessingTaskWhereInput = {
    AND?: videoProcessingTaskWhereInput | videoProcessingTaskWhereInput[]
    OR?: videoProcessingTaskWhereInput[]
    NOT?: videoProcessingTaskWhereInput | videoProcessingTaskWhereInput[]
    id?: StringFilter<"videoProcessingTask"> | string
    objectName?: StringFilter<"videoProcessingTask"> | string
    status?: EnumVideoProcessingStatusFilter<"videoProcessingTask"> | $Enums.VideoProcessingStatus
    videoId?: StringFilter<"videoProcessingTask"> | string
    createdAt?: DateTimeFilter<"videoProcessingTask"> | Date | string
    updatedAt?: DateTimeFilter<"videoProcessingTask"> | Date | string
    video?: XOR<VideoScalarRelationFilter, videoWhereInput>
  }

  export type videoProcessingTaskOrderByWithRelationInput = {
    id?: SortOrder
    objectName?: SortOrder
    status?: SortOrder
    videoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    video?: videoOrderByWithRelationInput
  }

  export type videoProcessingTaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: videoProcessingTaskWhereInput | videoProcessingTaskWhereInput[]
    OR?: videoProcessingTaskWhereInput[]
    NOT?: videoProcessingTaskWhereInput | videoProcessingTaskWhereInput[]
    objectName?: StringFilter<"videoProcessingTask"> | string
    status?: EnumVideoProcessingStatusFilter<"videoProcessingTask"> | $Enums.VideoProcessingStatus
    videoId?: StringFilter<"videoProcessingTask"> | string
    createdAt?: DateTimeFilter<"videoProcessingTask"> | Date | string
    updatedAt?: DateTimeFilter<"videoProcessingTask"> | Date | string
    video?: XOR<VideoScalarRelationFilter, videoWhereInput>
  }, "id">

  export type videoProcessingTaskOrderByWithAggregationInput = {
    id?: SortOrder
    objectName?: SortOrder
    status?: SortOrder
    videoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: videoProcessingTaskCountOrderByAggregateInput
    _max?: videoProcessingTaskMaxOrderByAggregateInput
    _min?: videoProcessingTaskMinOrderByAggregateInput
  }

  export type videoProcessingTaskScalarWhereWithAggregatesInput = {
    AND?: videoProcessingTaskScalarWhereWithAggregatesInput | videoProcessingTaskScalarWhereWithAggregatesInput[]
    OR?: videoProcessingTaskScalarWhereWithAggregatesInput[]
    NOT?: videoProcessingTaskScalarWhereWithAggregatesInput | videoProcessingTaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"videoProcessingTask"> | string
    objectName?: StringWithAggregatesFilter<"videoProcessingTask"> | string
    status?: EnumVideoProcessingStatusWithAggregatesFilter<"videoProcessingTask"> | $Enums.VideoProcessingStatus
    videoId?: StringWithAggregatesFilter<"videoProcessingTask"> | string
    createdAt?: DateTimeWithAggregatesFilter<"videoProcessingTask"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"videoProcessingTask"> | Date | string
  }

  export type userCreateInput = {
    id?: string
    username: string
    channelDescription?: string | null
    avatar?: string | null
    channelCover?: string | null
    email: string
    password: string
    role?: $Enums.Role
    banned?: boolean
    OTPSecret?: string | null
    OTPPendingValidation?: boolean | null
    OTPRecoveryCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    video?: videoCreateNestedManyWithoutUploadedByInput
    upload?: uploadCreateNestedManyWithoutUploaderInput
  }

  export type userUncheckedCreateInput = {
    id?: string
    username: string
    channelDescription?: string | null
    avatar?: string | null
    channelCover?: string | null
    email: string
    password: string
    role?: $Enums.Role
    banned?: boolean
    OTPSecret?: string | null
    OTPPendingValidation?: boolean | null
    OTPRecoveryCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    video?: videoUncheckedCreateNestedManyWithoutUploadedByInput
    upload?: uploadUncheckedCreateNestedManyWithoutUploaderInput
  }

  export type userUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    channelDescription?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    channelCover?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    banned?: BoolFieldUpdateOperationsInput | boolean
    OTPSecret?: NullableStringFieldUpdateOperationsInput | string | null
    OTPPendingValidation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    OTPRecoveryCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    video?: videoUpdateManyWithoutUploadedByNestedInput
    upload?: uploadUpdateManyWithoutUploaderNestedInput
  }

  export type userUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    channelDescription?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    channelCover?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    banned?: BoolFieldUpdateOperationsInput | boolean
    OTPSecret?: NullableStringFieldUpdateOperationsInput | string | null
    OTPPendingValidation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    OTPRecoveryCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    video?: videoUncheckedUpdateManyWithoutUploadedByNestedInput
    upload?: uploadUncheckedUpdateManyWithoutUploaderNestedInput
  }

  export type userCreateManyInput = {
    id?: string
    username: string
    channelDescription?: string | null
    avatar?: string | null
    channelCover?: string | null
    email: string
    password: string
    role?: $Enums.Role
    banned?: boolean
    OTPSecret?: string | null
    OTPPendingValidation?: boolean | null
    OTPRecoveryCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type userUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    channelDescription?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    channelCover?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    banned?: BoolFieldUpdateOperationsInput | boolean
    OTPSecret?: NullableStringFieldUpdateOperationsInput | string | null
    OTPPendingValidation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    OTPRecoveryCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type userUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    channelDescription?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    channelCover?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    banned?: BoolFieldUpdateOperationsInput | boolean
    OTPSecret?: NullableStringFieldUpdateOperationsInput | string | null
    OTPPendingValidation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    OTPRecoveryCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type videoCreateInput = {
    id?: string
    title: string
    description: string
    thumbnail?: string | null
    hlsMaterList?: string | null
    previewClip?: string | null
    public?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadedBy: userCreateNestedOneWithoutVideoInput
    videoProcessingTask?: videoProcessingTaskCreateNestedManyWithoutVideoInput
    upload?: uploadCreateNestedManyWithoutVideoInput
  }

  export type videoUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    thumbnail?: string | null
    hlsMaterList?: string | null
    previewClip?: string | null
    userId: string
    public?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    videoProcessingTask?: videoProcessingTaskUncheckedCreateNestedManyWithoutVideoInput
    upload?: uploadUncheckedCreateNestedManyWithoutVideoInput
  }

  export type videoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    hlsMaterList?: NullableStringFieldUpdateOperationsInput | string | null
    previewClip?: NullableStringFieldUpdateOperationsInput | string | null
    public?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedBy?: userUpdateOneRequiredWithoutVideoNestedInput
    videoProcessingTask?: videoProcessingTaskUpdateManyWithoutVideoNestedInput
    upload?: uploadUpdateManyWithoutVideoNestedInput
  }

  export type videoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    hlsMaterList?: NullableStringFieldUpdateOperationsInput | string | null
    previewClip?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    public?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videoProcessingTask?: videoProcessingTaskUncheckedUpdateManyWithoutVideoNestedInput
    upload?: uploadUncheckedUpdateManyWithoutVideoNestedInput
  }

  export type videoCreateManyInput = {
    id?: string
    title: string
    description: string
    thumbnail?: string | null
    hlsMaterList?: string | null
    previewClip?: string | null
    userId: string
    public?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type videoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    hlsMaterList?: NullableStringFieldUpdateOperationsInput | string | null
    previewClip?: NullableStringFieldUpdateOperationsInput | string | null
    public?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type videoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    hlsMaterList?: NullableStringFieldUpdateOperationsInput | string | null
    previewClip?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    public?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type uploadCreateInput = {
    id?: string
    multipartId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    uploader: userCreateNestedOneWithoutUploadInput
    video: videoCreateNestedOneWithoutUploadInput
  }

  export type uploadUncheckedCreateInput = {
    id?: string
    user: string
    multipartId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    videoId: string
  }

  export type uploadUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    multipartId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploader?: userUpdateOneRequiredWithoutUploadNestedInput
    video?: videoUpdateOneRequiredWithoutUploadNestedInput
  }

  export type uploadUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: StringFieldUpdateOperationsInput | string
    multipartId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videoId?: StringFieldUpdateOperationsInput | string
  }

  export type uploadCreateManyInput = {
    id?: string
    user: string
    multipartId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    videoId: string
  }

  export type uploadUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    multipartId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type uploadUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: StringFieldUpdateOperationsInput | string
    multipartId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videoId?: StringFieldUpdateOperationsInput | string
  }

  export type videoProcessingTaskCreateInput = {
    id?: string
    objectName: string
    status?: $Enums.VideoProcessingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    video: videoCreateNestedOneWithoutVideoProcessingTaskInput
  }

  export type videoProcessingTaskUncheckedCreateInput = {
    id?: string
    objectName: string
    status?: $Enums.VideoProcessingStatus
    videoId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type videoProcessingTaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    objectName?: StringFieldUpdateOperationsInput | string
    status?: EnumVideoProcessingStatusFieldUpdateOperationsInput | $Enums.VideoProcessingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    video?: videoUpdateOneRequiredWithoutVideoProcessingTaskNestedInput
  }

  export type videoProcessingTaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    objectName?: StringFieldUpdateOperationsInput | string
    status?: EnumVideoProcessingStatusFieldUpdateOperationsInput | $Enums.VideoProcessingStatus
    videoId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type videoProcessingTaskCreateManyInput = {
    id?: string
    objectName: string
    status?: $Enums.VideoProcessingStatus
    videoId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type videoProcessingTaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    objectName?: StringFieldUpdateOperationsInput | string
    status?: EnumVideoProcessingStatusFieldUpdateOperationsInput | $Enums.VideoProcessingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type videoProcessingTaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    objectName?: StringFieldUpdateOperationsInput | string
    status?: EnumVideoProcessingStatusFieldUpdateOperationsInput | $Enums.VideoProcessingStatus
    videoId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type VideoListRelationFilter = {
    every?: videoWhereInput
    some?: videoWhereInput
    none?: videoWhereInput
  }

  export type UploadListRelationFilter = {
    every?: uploadWhereInput
    some?: uploadWhereInput
    none?: uploadWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type videoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type uploadOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type userCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    channelDescription?: SortOrder
    avatar?: SortOrder
    channelCover?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    banned?: SortOrder
    OTPSecret?: SortOrder
    OTPPendingValidation?: SortOrder
    OTPRecoveryCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type userMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    channelDescription?: SortOrder
    avatar?: SortOrder
    channelCover?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    banned?: SortOrder
    OTPSecret?: SortOrder
    OTPPendingValidation?: SortOrder
    OTPRecoveryCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type userMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    channelDescription?: SortOrder
    avatar?: SortOrder
    channelCover?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    banned?: SortOrder
    OTPSecret?: SortOrder
    OTPPendingValidation?: SortOrder
    OTPRecoveryCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: userWhereInput
    isNot?: userWhereInput
  }

  export type VideoProcessingTaskListRelationFilter = {
    every?: videoProcessingTaskWhereInput
    some?: videoProcessingTaskWhereInput
    none?: videoProcessingTaskWhereInput
  }

  export type videoProcessingTaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type videoCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    thumbnail?: SortOrder
    hlsMaterList?: SortOrder
    previewClip?: SortOrder
    userId?: SortOrder
    public?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type videoMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    thumbnail?: SortOrder
    hlsMaterList?: SortOrder
    previewClip?: SortOrder
    userId?: SortOrder
    public?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type videoMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    thumbnail?: SortOrder
    hlsMaterList?: SortOrder
    previewClip?: SortOrder
    userId?: SortOrder
    public?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VideoScalarRelationFilter = {
    is?: videoWhereInput
    isNot?: videoWhereInput
  }

  export type uploadCountOrderByAggregateInput = {
    id?: SortOrder
    user?: SortOrder
    multipartId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    videoId?: SortOrder
  }

  export type uploadMaxOrderByAggregateInput = {
    id?: SortOrder
    user?: SortOrder
    multipartId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    videoId?: SortOrder
  }

  export type uploadMinOrderByAggregateInput = {
    id?: SortOrder
    user?: SortOrder
    multipartId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    videoId?: SortOrder
  }

  export type EnumVideoProcessingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoProcessingStatus | EnumVideoProcessingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VideoProcessingStatus[] | ListEnumVideoProcessingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VideoProcessingStatus[] | ListEnumVideoProcessingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVideoProcessingStatusFilter<$PrismaModel> | $Enums.VideoProcessingStatus
  }

  export type videoProcessingTaskCountOrderByAggregateInput = {
    id?: SortOrder
    objectName?: SortOrder
    status?: SortOrder
    videoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type videoProcessingTaskMaxOrderByAggregateInput = {
    id?: SortOrder
    objectName?: SortOrder
    status?: SortOrder
    videoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type videoProcessingTaskMinOrderByAggregateInput = {
    id?: SortOrder
    objectName?: SortOrder
    status?: SortOrder
    videoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumVideoProcessingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoProcessingStatus | EnumVideoProcessingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VideoProcessingStatus[] | ListEnumVideoProcessingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VideoProcessingStatus[] | ListEnumVideoProcessingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVideoProcessingStatusWithAggregatesFilter<$PrismaModel> | $Enums.VideoProcessingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVideoProcessingStatusFilter<$PrismaModel>
    _max?: NestedEnumVideoProcessingStatusFilter<$PrismaModel>
  }

  export type videoCreateNestedManyWithoutUploadedByInput = {
    create?: XOR<videoCreateWithoutUploadedByInput, videoUncheckedCreateWithoutUploadedByInput> | videoCreateWithoutUploadedByInput[] | videoUncheckedCreateWithoutUploadedByInput[]
    connectOrCreate?: videoCreateOrConnectWithoutUploadedByInput | videoCreateOrConnectWithoutUploadedByInput[]
    createMany?: videoCreateManyUploadedByInputEnvelope
    connect?: videoWhereUniqueInput | videoWhereUniqueInput[]
  }

  export type uploadCreateNestedManyWithoutUploaderInput = {
    create?: XOR<uploadCreateWithoutUploaderInput, uploadUncheckedCreateWithoutUploaderInput> | uploadCreateWithoutUploaderInput[] | uploadUncheckedCreateWithoutUploaderInput[]
    connectOrCreate?: uploadCreateOrConnectWithoutUploaderInput | uploadCreateOrConnectWithoutUploaderInput[]
    createMany?: uploadCreateManyUploaderInputEnvelope
    connect?: uploadWhereUniqueInput | uploadWhereUniqueInput[]
  }

  export type videoUncheckedCreateNestedManyWithoutUploadedByInput = {
    create?: XOR<videoCreateWithoutUploadedByInput, videoUncheckedCreateWithoutUploadedByInput> | videoCreateWithoutUploadedByInput[] | videoUncheckedCreateWithoutUploadedByInput[]
    connectOrCreate?: videoCreateOrConnectWithoutUploadedByInput | videoCreateOrConnectWithoutUploadedByInput[]
    createMany?: videoCreateManyUploadedByInputEnvelope
    connect?: videoWhereUniqueInput | videoWhereUniqueInput[]
  }

  export type uploadUncheckedCreateNestedManyWithoutUploaderInput = {
    create?: XOR<uploadCreateWithoutUploaderInput, uploadUncheckedCreateWithoutUploaderInput> | uploadCreateWithoutUploaderInput[] | uploadUncheckedCreateWithoutUploaderInput[]
    connectOrCreate?: uploadCreateOrConnectWithoutUploaderInput | uploadCreateOrConnectWithoutUploaderInput[]
    createMany?: uploadCreateManyUploaderInputEnvelope
    connect?: uploadWhereUniqueInput | uploadWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type videoUpdateManyWithoutUploadedByNestedInput = {
    create?: XOR<videoCreateWithoutUploadedByInput, videoUncheckedCreateWithoutUploadedByInput> | videoCreateWithoutUploadedByInput[] | videoUncheckedCreateWithoutUploadedByInput[]
    connectOrCreate?: videoCreateOrConnectWithoutUploadedByInput | videoCreateOrConnectWithoutUploadedByInput[]
    upsert?: videoUpsertWithWhereUniqueWithoutUploadedByInput | videoUpsertWithWhereUniqueWithoutUploadedByInput[]
    createMany?: videoCreateManyUploadedByInputEnvelope
    set?: videoWhereUniqueInput | videoWhereUniqueInput[]
    disconnect?: videoWhereUniqueInput | videoWhereUniqueInput[]
    delete?: videoWhereUniqueInput | videoWhereUniqueInput[]
    connect?: videoWhereUniqueInput | videoWhereUniqueInput[]
    update?: videoUpdateWithWhereUniqueWithoutUploadedByInput | videoUpdateWithWhereUniqueWithoutUploadedByInput[]
    updateMany?: videoUpdateManyWithWhereWithoutUploadedByInput | videoUpdateManyWithWhereWithoutUploadedByInput[]
    deleteMany?: videoScalarWhereInput | videoScalarWhereInput[]
  }

  export type uploadUpdateManyWithoutUploaderNestedInput = {
    create?: XOR<uploadCreateWithoutUploaderInput, uploadUncheckedCreateWithoutUploaderInput> | uploadCreateWithoutUploaderInput[] | uploadUncheckedCreateWithoutUploaderInput[]
    connectOrCreate?: uploadCreateOrConnectWithoutUploaderInput | uploadCreateOrConnectWithoutUploaderInput[]
    upsert?: uploadUpsertWithWhereUniqueWithoutUploaderInput | uploadUpsertWithWhereUniqueWithoutUploaderInput[]
    createMany?: uploadCreateManyUploaderInputEnvelope
    set?: uploadWhereUniqueInput | uploadWhereUniqueInput[]
    disconnect?: uploadWhereUniqueInput | uploadWhereUniqueInput[]
    delete?: uploadWhereUniqueInput | uploadWhereUniqueInput[]
    connect?: uploadWhereUniqueInput | uploadWhereUniqueInput[]
    update?: uploadUpdateWithWhereUniqueWithoutUploaderInput | uploadUpdateWithWhereUniqueWithoutUploaderInput[]
    updateMany?: uploadUpdateManyWithWhereWithoutUploaderInput | uploadUpdateManyWithWhereWithoutUploaderInput[]
    deleteMany?: uploadScalarWhereInput | uploadScalarWhereInput[]
  }

  export type videoUncheckedUpdateManyWithoutUploadedByNestedInput = {
    create?: XOR<videoCreateWithoutUploadedByInput, videoUncheckedCreateWithoutUploadedByInput> | videoCreateWithoutUploadedByInput[] | videoUncheckedCreateWithoutUploadedByInput[]
    connectOrCreate?: videoCreateOrConnectWithoutUploadedByInput | videoCreateOrConnectWithoutUploadedByInput[]
    upsert?: videoUpsertWithWhereUniqueWithoutUploadedByInput | videoUpsertWithWhereUniqueWithoutUploadedByInput[]
    createMany?: videoCreateManyUploadedByInputEnvelope
    set?: videoWhereUniqueInput | videoWhereUniqueInput[]
    disconnect?: videoWhereUniqueInput | videoWhereUniqueInput[]
    delete?: videoWhereUniqueInput | videoWhereUniqueInput[]
    connect?: videoWhereUniqueInput | videoWhereUniqueInput[]
    update?: videoUpdateWithWhereUniqueWithoutUploadedByInput | videoUpdateWithWhereUniqueWithoutUploadedByInput[]
    updateMany?: videoUpdateManyWithWhereWithoutUploadedByInput | videoUpdateManyWithWhereWithoutUploadedByInput[]
    deleteMany?: videoScalarWhereInput | videoScalarWhereInput[]
  }

  export type uploadUncheckedUpdateManyWithoutUploaderNestedInput = {
    create?: XOR<uploadCreateWithoutUploaderInput, uploadUncheckedCreateWithoutUploaderInput> | uploadCreateWithoutUploaderInput[] | uploadUncheckedCreateWithoutUploaderInput[]
    connectOrCreate?: uploadCreateOrConnectWithoutUploaderInput | uploadCreateOrConnectWithoutUploaderInput[]
    upsert?: uploadUpsertWithWhereUniqueWithoutUploaderInput | uploadUpsertWithWhereUniqueWithoutUploaderInput[]
    createMany?: uploadCreateManyUploaderInputEnvelope
    set?: uploadWhereUniqueInput | uploadWhereUniqueInput[]
    disconnect?: uploadWhereUniqueInput | uploadWhereUniqueInput[]
    delete?: uploadWhereUniqueInput | uploadWhereUniqueInput[]
    connect?: uploadWhereUniqueInput | uploadWhereUniqueInput[]
    update?: uploadUpdateWithWhereUniqueWithoutUploaderInput | uploadUpdateWithWhereUniqueWithoutUploaderInput[]
    updateMany?: uploadUpdateManyWithWhereWithoutUploaderInput | uploadUpdateManyWithWhereWithoutUploaderInput[]
    deleteMany?: uploadScalarWhereInput | uploadScalarWhereInput[]
  }

  export type userCreateNestedOneWithoutVideoInput = {
    create?: XOR<userCreateWithoutVideoInput, userUncheckedCreateWithoutVideoInput>
    connectOrCreate?: userCreateOrConnectWithoutVideoInput
    connect?: userWhereUniqueInput
  }

  export type videoProcessingTaskCreateNestedManyWithoutVideoInput = {
    create?: XOR<videoProcessingTaskCreateWithoutVideoInput, videoProcessingTaskUncheckedCreateWithoutVideoInput> | videoProcessingTaskCreateWithoutVideoInput[] | videoProcessingTaskUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: videoProcessingTaskCreateOrConnectWithoutVideoInput | videoProcessingTaskCreateOrConnectWithoutVideoInput[]
    createMany?: videoProcessingTaskCreateManyVideoInputEnvelope
    connect?: videoProcessingTaskWhereUniqueInput | videoProcessingTaskWhereUniqueInput[]
  }

  export type uploadCreateNestedManyWithoutVideoInput = {
    create?: XOR<uploadCreateWithoutVideoInput, uploadUncheckedCreateWithoutVideoInput> | uploadCreateWithoutVideoInput[] | uploadUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: uploadCreateOrConnectWithoutVideoInput | uploadCreateOrConnectWithoutVideoInput[]
    createMany?: uploadCreateManyVideoInputEnvelope
    connect?: uploadWhereUniqueInput | uploadWhereUniqueInput[]
  }

  export type videoProcessingTaskUncheckedCreateNestedManyWithoutVideoInput = {
    create?: XOR<videoProcessingTaskCreateWithoutVideoInput, videoProcessingTaskUncheckedCreateWithoutVideoInput> | videoProcessingTaskCreateWithoutVideoInput[] | videoProcessingTaskUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: videoProcessingTaskCreateOrConnectWithoutVideoInput | videoProcessingTaskCreateOrConnectWithoutVideoInput[]
    createMany?: videoProcessingTaskCreateManyVideoInputEnvelope
    connect?: videoProcessingTaskWhereUniqueInput | videoProcessingTaskWhereUniqueInput[]
  }

  export type uploadUncheckedCreateNestedManyWithoutVideoInput = {
    create?: XOR<uploadCreateWithoutVideoInput, uploadUncheckedCreateWithoutVideoInput> | uploadCreateWithoutVideoInput[] | uploadUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: uploadCreateOrConnectWithoutVideoInput | uploadCreateOrConnectWithoutVideoInput[]
    createMany?: uploadCreateManyVideoInputEnvelope
    connect?: uploadWhereUniqueInput | uploadWhereUniqueInput[]
  }

  export type userUpdateOneRequiredWithoutVideoNestedInput = {
    create?: XOR<userCreateWithoutVideoInput, userUncheckedCreateWithoutVideoInput>
    connectOrCreate?: userCreateOrConnectWithoutVideoInput
    upsert?: userUpsertWithoutVideoInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutVideoInput, userUpdateWithoutVideoInput>, userUncheckedUpdateWithoutVideoInput>
  }

  export type videoProcessingTaskUpdateManyWithoutVideoNestedInput = {
    create?: XOR<videoProcessingTaskCreateWithoutVideoInput, videoProcessingTaskUncheckedCreateWithoutVideoInput> | videoProcessingTaskCreateWithoutVideoInput[] | videoProcessingTaskUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: videoProcessingTaskCreateOrConnectWithoutVideoInput | videoProcessingTaskCreateOrConnectWithoutVideoInput[]
    upsert?: videoProcessingTaskUpsertWithWhereUniqueWithoutVideoInput | videoProcessingTaskUpsertWithWhereUniqueWithoutVideoInput[]
    createMany?: videoProcessingTaskCreateManyVideoInputEnvelope
    set?: videoProcessingTaskWhereUniqueInput | videoProcessingTaskWhereUniqueInput[]
    disconnect?: videoProcessingTaskWhereUniqueInput | videoProcessingTaskWhereUniqueInput[]
    delete?: videoProcessingTaskWhereUniqueInput | videoProcessingTaskWhereUniqueInput[]
    connect?: videoProcessingTaskWhereUniqueInput | videoProcessingTaskWhereUniqueInput[]
    update?: videoProcessingTaskUpdateWithWhereUniqueWithoutVideoInput | videoProcessingTaskUpdateWithWhereUniqueWithoutVideoInput[]
    updateMany?: videoProcessingTaskUpdateManyWithWhereWithoutVideoInput | videoProcessingTaskUpdateManyWithWhereWithoutVideoInput[]
    deleteMany?: videoProcessingTaskScalarWhereInput | videoProcessingTaskScalarWhereInput[]
  }

  export type uploadUpdateManyWithoutVideoNestedInput = {
    create?: XOR<uploadCreateWithoutVideoInput, uploadUncheckedCreateWithoutVideoInput> | uploadCreateWithoutVideoInput[] | uploadUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: uploadCreateOrConnectWithoutVideoInput | uploadCreateOrConnectWithoutVideoInput[]
    upsert?: uploadUpsertWithWhereUniqueWithoutVideoInput | uploadUpsertWithWhereUniqueWithoutVideoInput[]
    createMany?: uploadCreateManyVideoInputEnvelope
    set?: uploadWhereUniqueInput | uploadWhereUniqueInput[]
    disconnect?: uploadWhereUniqueInput | uploadWhereUniqueInput[]
    delete?: uploadWhereUniqueInput | uploadWhereUniqueInput[]
    connect?: uploadWhereUniqueInput | uploadWhereUniqueInput[]
    update?: uploadUpdateWithWhereUniqueWithoutVideoInput | uploadUpdateWithWhereUniqueWithoutVideoInput[]
    updateMany?: uploadUpdateManyWithWhereWithoutVideoInput | uploadUpdateManyWithWhereWithoutVideoInput[]
    deleteMany?: uploadScalarWhereInput | uploadScalarWhereInput[]
  }

  export type videoProcessingTaskUncheckedUpdateManyWithoutVideoNestedInput = {
    create?: XOR<videoProcessingTaskCreateWithoutVideoInput, videoProcessingTaskUncheckedCreateWithoutVideoInput> | videoProcessingTaskCreateWithoutVideoInput[] | videoProcessingTaskUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: videoProcessingTaskCreateOrConnectWithoutVideoInput | videoProcessingTaskCreateOrConnectWithoutVideoInput[]
    upsert?: videoProcessingTaskUpsertWithWhereUniqueWithoutVideoInput | videoProcessingTaskUpsertWithWhereUniqueWithoutVideoInput[]
    createMany?: videoProcessingTaskCreateManyVideoInputEnvelope
    set?: videoProcessingTaskWhereUniqueInput | videoProcessingTaskWhereUniqueInput[]
    disconnect?: videoProcessingTaskWhereUniqueInput | videoProcessingTaskWhereUniqueInput[]
    delete?: videoProcessingTaskWhereUniqueInput | videoProcessingTaskWhereUniqueInput[]
    connect?: videoProcessingTaskWhereUniqueInput | videoProcessingTaskWhereUniqueInput[]
    update?: videoProcessingTaskUpdateWithWhereUniqueWithoutVideoInput | videoProcessingTaskUpdateWithWhereUniqueWithoutVideoInput[]
    updateMany?: videoProcessingTaskUpdateManyWithWhereWithoutVideoInput | videoProcessingTaskUpdateManyWithWhereWithoutVideoInput[]
    deleteMany?: videoProcessingTaskScalarWhereInput | videoProcessingTaskScalarWhereInput[]
  }

  export type uploadUncheckedUpdateManyWithoutVideoNestedInput = {
    create?: XOR<uploadCreateWithoutVideoInput, uploadUncheckedCreateWithoutVideoInput> | uploadCreateWithoutVideoInput[] | uploadUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: uploadCreateOrConnectWithoutVideoInput | uploadCreateOrConnectWithoutVideoInput[]
    upsert?: uploadUpsertWithWhereUniqueWithoutVideoInput | uploadUpsertWithWhereUniqueWithoutVideoInput[]
    createMany?: uploadCreateManyVideoInputEnvelope
    set?: uploadWhereUniqueInput | uploadWhereUniqueInput[]
    disconnect?: uploadWhereUniqueInput | uploadWhereUniqueInput[]
    delete?: uploadWhereUniqueInput | uploadWhereUniqueInput[]
    connect?: uploadWhereUniqueInput | uploadWhereUniqueInput[]
    update?: uploadUpdateWithWhereUniqueWithoutVideoInput | uploadUpdateWithWhereUniqueWithoutVideoInput[]
    updateMany?: uploadUpdateManyWithWhereWithoutVideoInput | uploadUpdateManyWithWhereWithoutVideoInput[]
    deleteMany?: uploadScalarWhereInput | uploadScalarWhereInput[]
  }

  export type userCreateNestedOneWithoutUploadInput = {
    create?: XOR<userCreateWithoutUploadInput, userUncheckedCreateWithoutUploadInput>
    connectOrCreate?: userCreateOrConnectWithoutUploadInput
    connect?: userWhereUniqueInput
  }

  export type videoCreateNestedOneWithoutUploadInput = {
    create?: XOR<videoCreateWithoutUploadInput, videoUncheckedCreateWithoutUploadInput>
    connectOrCreate?: videoCreateOrConnectWithoutUploadInput
    connect?: videoWhereUniqueInput
  }

  export type userUpdateOneRequiredWithoutUploadNestedInput = {
    create?: XOR<userCreateWithoutUploadInput, userUncheckedCreateWithoutUploadInput>
    connectOrCreate?: userCreateOrConnectWithoutUploadInput
    upsert?: userUpsertWithoutUploadInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutUploadInput, userUpdateWithoutUploadInput>, userUncheckedUpdateWithoutUploadInput>
  }

  export type videoUpdateOneRequiredWithoutUploadNestedInput = {
    create?: XOR<videoCreateWithoutUploadInput, videoUncheckedCreateWithoutUploadInput>
    connectOrCreate?: videoCreateOrConnectWithoutUploadInput
    upsert?: videoUpsertWithoutUploadInput
    connect?: videoWhereUniqueInput
    update?: XOR<XOR<videoUpdateToOneWithWhereWithoutUploadInput, videoUpdateWithoutUploadInput>, videoUncheckedUpdateWithoutUploadInput>
  }

  export type videoCreateNestedOneWithoutVideoProcessingTaskInput = {
    create?: XOR<videoCreateWithoutVideoProcessingTaskInput, videoUncheckedCreateWithoutVideoProcessingTaskInput>
    connectOrCreate?: videoCreateOrConnectWithoutVideoProcessingTaskInput
    connect?: videoWhereUniqueInput
  }

  export type EnumVideoProcessingStatusFieldUpdateOperationsInput = {
    set?: $Enums.VideoProcessingStatus
  }

  export type videoUpdateOneRequiredWithoutVideoProcessingTaskNestedInput = {
    create?: XOR<videoCreateWithoutVideoProcessingTaskInput, videoUncheckedCreateWithoutVideoProcessingTaskInput>
    connectOrCreate?: videoCreateOrConnectWithoutVideoProcessingTaskInput
    upsert?: videoUpsertWithoutVideoProcessingTaskInput
    connect?: videoWhereUniqueInput
    update?: XOR<XOR<videoUpdateToOneWithWhereWithoutVideoProcessingTaskInput, videoUpdateWithoutVideoProcessingTaskInput>, videoUncheckedUpdateWithoutVideoProcessingTaskInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
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
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
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

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
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
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumVideoProcessingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoProcessingStatus | EnumVideoProcessingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VideoProcessingStatus[] | ListEnumVideoProcessingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VideoProcessingStatus[] | ListEnumVideoProcessingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVideoProcessingStatusFilter<$PrismaModel> | $Enums.VideoProcessingStatus
  }

  export type NestedEnumVideoProcessingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoProcessingStatus | EnumVideoProcessingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VideoProcessingStatus[] | ListEnumVideoProcessingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VideoProcessingStatus[] | ListEnumVideoProcessingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVideoProcessingStatusWithAggregatesFilter<$PrismaModel> | $Enums.VideoProcessingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVideoProcessingStatusFilter<$PrismaModel>
    _max?: NestedEnumVideoProcessingStatusFilter<$PrismaModel>
  }

  export type videoCreateWithoutUploadedByInput = {
    id?: string
    title: string
    description: string
    thumbnail?: string | null
    hlsMaterList?: string | null
    previewClip?: string | null
    public?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    videoProcessingTask?: videoProcessingTaskCreateNestedManyWithoutVideoInput
    upload?: uploadCreateNestedManyWithoutVideoInput
  }

  export type videoUncheckedCreateWithoutUploadedByInput = {
    id?: string
    title: string
    description: string
    thumbnail?: string | null
    hlsMaterList?: string | null
    previewClip?: string | null
    public?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    videoProcessingTask?: videoProcessingTaskUncheckedCreateNestedManyWithoutVideoInput
    upload?: uploadUncheckedCreateNestedManyWithoutVideoInput
  }

  export type videoCreateOrConnectWithoutUploadedByInput = {
    where: videoWhereUniqueInput
    create: XOR<videoCreateWithoutUploadedByInput, videoUncheckedCreateWithoutUploadedByInput>
  }

  export type videoCreateManyUploadedByInputEnvelope = {
    data: videoCreateManyUploadedByInput | videoCreateManyUploadedByInput[]
    skipDuplicates?: boolean
  }

  export type uploadCreateWithoutUploaderInput = {
    id?: string
    multipartId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    video: videoCreateNestedOneWithoutUploadInput
  }

  export type uploadUncheckedCreateWithoutUploaderInput = {
    id?: string
    multipartId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    videoId: string
  }

  export type uploadCreateOrConnectWithoutUploaderInput = {
    where: uploadWhereUniqueInput
    create: XOR<uploadCreateWithoutUploaderInput, uploadUncheckedCreateWithoutUploaderInput>
  }

  export type uploadCreateManyUploaderInputEnvelope = {
    data: uploadCreateManyUploaderInput | uploadCreateManyUploaderInput[]
    skipDuplicates?: boolean
  }

  export type videoUpsertWithWhereUniqueWithoutUploadedByInput = {
    where: videoWhereUniqueInput
    update: XOR<videoUpdateWithoutUploadedByInput, videoUncheckedUpdateWithoutUploadedByInput>
    create: XOR<videoCreateWithoutUploadedByInput, videoUncheckedCreateWithoutUploadedByInput>
  }

  export type videoUpdateWithWhereUniqueWithoutUploadedByInput = {
    where: videoWhereUniqueInput
    data: XOR<videoUpdateWithoutUploadedByInput, videoUncheckedUpdateWithoutUploadedByInput>
  }

  export type videoUpdateManyWithWhereWithoutUploadedByInput = {
    where: videoScalarWhereInput
    data: XOR<videoUpdateManyMutationInput, videoUncheckedUpdateManyWithoutUploadedByInput>
  }

  export type videoScalarWhereInput = {
    AND?: videoScalarWhereInput | videoScalarWhereInput[]
    OR?: videoScalarWhereInput[]
    NOT?: videoScalarWhereInput | videoScalarWhereInput[]
    id?: StringFilter<"video"> | string
    title?: StringFilter<"video"> | string
    description?: StringFilter<"video"> | string
    thumbnail?: StringNullableFilter<"video"> | string | null
    hlsMaterList?: StringNullableFilter<"video"> | string | null
    previewClip?: StringNullableFilter<"video"> | string | null
    userId?: StringFilter<"video"> | string
    public?: BoolFilter<"video"> | boolean
    createdAt?: DateTimeFilter<"video"> | Date | string
    updatedAt?: DateTimeFilter<"video"> | Date | string
  }

  export type uploadUpsertWithWhereUniqueWithoutUploaderInput = {
    where: uploadWhereUniqueInput
    update: XOR<uploadUpdateWithoutUploaderInput, uploadUncheckedUpdateWithoutUploaderInput>
    create: XOR<uploadCreateWithoutUploaderInput, uploadUncheckedCreateWithoutUploaderInput>
  }

  export type uploadUpdateWithWhereUniqueWithoutUploaderInput = {
    where: uploadWhereUniqueInput
    data: XOR<uploadUpdateWithoutUploaderInput, uploadUncheckedUpdateWithoutUploaderInput>
  }

  export type uploadUpdateManyWithWhereWithoutUploaderInput = {
    where: uploadScalarWhereInput
    data: XOR<uploadUpdateManyMutationInput, uploadUncheckedUpdateManyWithoutUploaderInput>
  }

  export type uploadScalarWhereInput = {
    AND?: uploadScalarWhereInput | uploadScalarWhereInput[]
    OR?: uploadScalarWhereInput[]
    NOT?: uploadScalarWhereInput | uploadScalarWhereInput[]
    id?: StringFilter<"upload"> | string
    user?: StringFilter<"upload"> | string
    multipartId?: StringFilter<"upload"> | string
    createdAt?: DateTimeFilter<"upload"> | Date | string
    updatedAt?: DateTimeFilter<"upload"> | Date | string
    videoId?: StringFilter<"upload"> | string
  }

  export type userCreateWithoutVideoInput = {
    id?: string
    username: string
    channelDescription?: string | null
    avatar?: string | null
    channelCover?: string | null
    email: string
    password: string
    role?: $Enums.Role
    banned?: boolean
    OTPSecret?: string | null
    OTPPendingValidation?: boolean | null
    OTPRecoveryCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    upload?: uploadCreateNestedManyWithoutUploaderInput
  }

  export type userUncheckedCreateWithoutVideoInput = {
    id?: string
    username: string
    channelDescription?: string | null
    avatar?: string | null
    channelCover?: string | null
    email: string
    password: string
    role?: $Enums.Role
    banned?: boolean
    OTPSecret?: string | null
    OTPPendingValidation?: boolean | null
    OTPRecoveryCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    upload?: uploadUncheckedCreateNestedManyWithoutUploaderInput
  }

  export type userCreateOrConnectWithoutVideoInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutVideoInput, userUncheckedCreateWithoutVideoInput>
  }

  export type videoProcessingTaskCreateWithoutVideoInput = {
    id?: string
    objectName: string
    status?: $Enums.VideoProcessingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type videoProcessingTaskUncheckedCreateWithoutVideoInput = {
    id?: string
    objectName: string
    status?: $Enums.VideoProcessingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type videoProcessingTaskCreateOrConnectWithoutVideoInput = {
    where: videoProcessingTaskWhereUniqueInput
    create: XOR<videoProcessingTaskCreateWithoutVideoInput, videoProcessingTaskUncheckedCreateWithoutVideoInput>
  }

  export type videoProcessingTaskCreateManyVideoInputEnvelope = {
    data: videoProcessingTaskCreateManyVideoInput | videoProcessingTaskCreateManyVideoInput[]
    skipDuplicates?: boolean
  }

  export type uploadCreateWithoutVideoInput = {
    id?: string
    multipartId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    uploader: userCreateNestedOneWithoutUploadInput
  }

  export type uploadUncheckedCreateWithoutVideoInput = {
    id?: string
    user: string
    multipartId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type uploadCreateOrConnectWithoutVideoInput = {
    where: uploadWhereUniqueInput
    create: XOR<uploadCreateWithoutVideoInput, uploadUncheckedCreateWithoutVideoInput>
  }

  export type uploadCreateManyVideoInputEnvelope = {
    data: uploadCreateManyVideoInput | uploadCreateManyVideoInput[]
    skipDuplicates?: boolean
  }

  export type userUpsertWithoutVideoInput = {
    update: XOR<userUpdateWithoutVideoInput, userUncheckedUpdateWithoutVideoInput>
    create: XOR<userCreateWithoutVideoInput, userUncheckedCreateWithoutVideoInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutVideoInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutVideoInput, userUncheckedUpdateWithoutVideoInput>
  }

  export type userUpdateWithoutVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    channelDescription?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    channelCover?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    banned?: BoolFieldUpdateOperationsInput | boolean
    OTPSecret?: NullableStringFieldUpdateOperationsInput | string | null
    OTPPendingValidation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    OTPRecoveryCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    upload?: uploadUpdateManyWithoutUploaderNestedInput
  }

  export type userUncheckedUpdateWithoutVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    channelDescription?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    channelCover?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    banned?: BoolFieldUpdateOperationsInput | boolean
    OTPSecret?: NullableStringFieldUpdateOperationsInput | string | null
    OTPPendingValidation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    OTPRecoveryCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    upload?: uploadUncheckedUpdateManyWithoutUploaderNestedInput
  }

  export type videoProcessingTaskUpsertWithWhereUniqueWithoutVideoInput = {
    where: videoProcessingTaskWhereUniqueInput
    update: XOR<videoProcessingTaskUpdateWithoutVideoInput, videoProcessingTaskUncheckedUpdateWithoutVideoInput>
    create: XOR<videoProcessingTaskCreateWithoutVideoInput, videoProcessingTaskUncheckedCreateWithoutVideoInput>
  }

  export type videoProcessingTaskUpdateWithWhereUniqueWithoutVideoInput = {
    where: videoProcessingTaskWhereUniqueInput
    data: XOR<videoProcessingTaskUpdateWithoutVideoInput, videoProcessingTaskUncheckedUpdateWithoutVideoInput>
  }

  export type videoProcessingTaskUpdateManyWithWhereWithoutVideoInput = {
    where: videoProcessingTaskScalarWhereInput
    data: XOR<videoProcessingTaskUpdateManyMutationInput, videoProcessingTaskUncheckedUpdateManyWithoutVideoInput>
  }

  export type videoProcessingTaskScalarWhereInput = {
    AND?: videoProcessingTaskScalarWhereInput | videoProcessingTaskScalarWhereInput[]
    OR?: videoProcessingTaskScalarWhereInput[]
    NOT?: videoProcessingTaskScalarWhereInput | videoProcessingTaskScalarWhereInput[]
    id?: StringFilter<"videoProcessingTask"> | string
    objectName?: StringFilter<"videoProcessingTask"> | string
    status?: EnumVideoProcessingStatusFilter<"videoProcessingTask"> | $Enums.VideoProcessingStatus
    videoId?: StringFilter<"videoProcessingTask"> | string
    createdAt?: DateTimeFilter<"videoProcessingTask"> | Date | string
    updatedAt?: DateTimeFilter<"videoProcessingTask"> | Date | string
  }

  export type uploadUpsertWithWhereUniqueWithoutVideoInput = {
    where: uploadWhereUniqueInput
    update: XOR<uploadUpdateWithoutVideoInput, uploadUncheckedUpdateWithoutVideoInput>
    create: XOR<uploadCreateWithoutVideoInput, uploadUncheckedCreateWithoutVideoInput>
  }

  export type uploadUpdateWithWhereUniqueWithoutVideoInput = {
    where: uploadWhereUniqueInput
    data: XOR<uploadUpdateWithoutVideoInput, uploadUncheckedUpdateWithoutVideoInput>
  }

  export type uploadUpdateManyWithWhereWithoutVideoInput = {
    where: uploadScalarWhereInput
    data: XOR<uploadUpdateManyMutationInput, uploadUncheckedUpdateManyWithoutVideoInput>
  }

  export type userCreateWithoutUploadInput = {
    id?: string
    username: string
    channelDescription?: string | null
    avatar?: string | null
    channelCover?: string | null
    email: string
    password: string
    role?: $Enums.Role
    banned?: boolean
    OTPSecret?: string | null
    OTPPendingValidation?: boolean | null
    OTPRecoveryCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    video?: videoCreateNestedManyWithoutUploadedByInput
  }

  export type userUncheckedCreateWithoutUploadInput = {
    id?: string
    username: string
    channelDescription?: string | null
    avatar?: string | null
    channelCover?: string | null
    email: string
    password: string
    role?: $Enums.Role
    banned?: boolean
    OTPSecret?: string | null
    OTPPendingValidation?: boolean | null
    OTPRecoveryCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    video?: videoUncheckedCreateNestedManyWithoutUploadedByInput
  }

  export type userCreateOrConnectWithoutUploadInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutUploadInput, userUncheckedCreateWithoutUploadInput>
  }

  export type videoCreateWithoutUploadInput = {
    id?: string
    title: string
    description: string
    thumbnail?: string | null
    hlsMaterList?: string | null
    previewClip?: string | null
    public?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadedBy: userCreateNestedOneWithoutVideoInput
    videoProcessingTask?: videoProcessingTaskCreateNestedManyWithoutVideoInput
  }

  export type videoUncheckedCreateWithoutUploadInput = {
    id?: string
    title: string
    description: string
    thumbnail?: string | null
    hlsMaterList?: string | null
    previewClip?: string | null
    userId: string
    public?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    videoProcessingTask?: videoProcessingTaskUncheckedCreateNestedManyWithoutVideoInput
  }

  export type videoCreateOrConnectWithoutUploadInput = {
    where: videoWhereUniqueInput
    create: XOR<videoCreateWithoutUploadInput, videoUncheckedCreateWithoutUploadInput>
  }

  export type userUpsertWithoutUploadInput = {
    update: XOR<userUpdateWithoutUploadInput, userUncheckedUpdateWithoutUploadInput>
    create: XOR<userCreateWithoutUploadInput, userUncheckedCreateWithoutUploadInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutUploadInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutUploadInput, userUncheckedUpdateWithoutUploadInput>
  }

  export type userUpdateWithoutUploadInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    channelDescription?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    channelCover?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    banned?: BoolFieldUpdateOperationsInput | boolean
    OTPSecret?: NullableStringFieldUpdateOperationsInput | string | null
    OTPPendingValidation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    OTPRecoveryCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    video?: videoUpdateManyWithoutUploadedByNestedInput
  }

  export type userUncheckedUpdateWithoutUploadInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    channelDescription?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    channelCover?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    banned?: BoolFieldUpdateOperationsInput | boolean
    OTPSecret?: NullableStringFieldUpdateOperationsInput | string | null
    OTPPendingValidation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    OTPRecoveryCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    video?: videoUncheckedUpdateManyWithoutUploadedByNestedInput
  }

  export type videoUpsertWithoutUploadInput = {
    update: XOR<videoUpdateWithoutUploadInput, videoUncheckedUpdateWithoutUploadInput>
    create: XOR<videoCreateWithoutUploadInput, videoUncheckedCreateWithoutUploadInput>
    where?: videoWhereInput
  }

  export type videoUpdateToOneWithWhereWithoutUploadInput = {
    where?: videoWhereInput
    data: XOR<videoUpdateWithoutUploadInput, videoUncheckedUpdateWithoutUploadInput>
  }

  export type videoUpdateWithoutUploadInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    hlsMaterList?: NullableStringFieldUpdateOperationsInput | string | null
    previewClip?: NullableStringFieldUpdateOperationsInput | string | null
    public?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedBy?: userUpdateOneRequiredWithoutVideoNestedInput
    videoProcessingTask?: videoProcessingTaskUpdateManyWithoutVideoNestedInput
  }

  export type videoUncheckedUpdateWithoutUploadInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    hlsMaterList?: NullableStringFieldUpdateOperationsInput | string | null
    previewClip?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    public?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videoProcessingTask?: videoProcessingTaskUncheckedUpdateManyWithoutVideoNestedInput
  }

  export type videoCreateWithoutVideoProcessingTaskInput = {
    id?: string
    title: string
    description: string
    thumbnail?: string | null
    hlsMaterList?: string | null
    previewClip?: string | null
    public?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadedBy: userCreateNestedOneWithoutVideoInput
    upload?: uploadCreateNestedManyWithoutVideoInput
  }

  export type videoUncheckedCreateWithoutVideoProcessingTaskInput = {
    id?: string
    title: string
    description: string
    thumbnail?: string | null
    hlsMaterList?: string | null
    previewClip?: string | null
    userId: string
    public?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    upload?: uploadUncheckedCreateNestedManyWithoutVideoInput
  }

  export type videoCreateOrConnectWithoutVideoProcessingTaskInput = {
    where: videoWhereUniqueInput
    create: XOR<videoCreateWithoutVideoProcessingTaskInput, videoUncheckedCreateWithoutVideoProcessingTaskInput>
  }

  export type videoUpsertWithoutVideoProcessingTaskInput = {
    update: XOR<videoUpdateWithoutVideoProcessingTaskInput, videoUncheckedUpdateWithoutVideoProcessingTaskInput>
    create: XOR<videoCreateWithoutVideoProcessingTaskInput, videoUncheckedCreateWithoutVideoProcessingTaskInput>
    where?: videoWhereInput
  }

  export type videoUpdateToOneWithWhereWithoutVideoProcessingTaskInput = {
    where?: videoWhereInput
    data: XOR<videoUpdateWithoutVideoProcessingTaskInput, videoUncheckedUpdateWithoutVideoProcessingTaskInput>
  }

  export type videoUpdateWithoutVideoProcessingTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    hlsMaterList?: NullableStringFieldUpdateOperationsInput | string | null
    previewClip?: NullableStringFieldUpdateOperationsInput | string | null
    public?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedBy?: userUpdateOneRequiredWithoutVideoNestedInput
    upload?: uploadUpdateManyWithoutVideoNestedInput
  }

  export type videoUncheckedUpdateWithoutVideoProcessingTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    hlsMaterList?: NullableStringFieldUpdateOperationsInput | string | null
    previewClip?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    public?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    upload?: uploadUncheckedUpdateManyWithoutVideoNestedInput
  }

  export type videoCreateManyUploadedByInput = {
    id?: string
    title: string
    description: string
    thumbnail?: string | null
    hlsMaterList?: string | null
    previewClip?: string | null
    public?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type uploadCreateManyUploaderInput = {
    id?: string
    multipartId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    videoId: string
  }

  export type videoUpdateWithoutUploadedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    hlsMaterList?: NullableStringFieldUpdateOperationsInput | string | null
    previewClip?: NullableStringFieldUpdateOperationsInput | string | null
    public?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videoProcessingTask?: videoProcessingTaskUpdateManyWithoutVideoNestedInput
    upload?: uploadUpdateManyWithoutVideoNestedInput
  }

  export type videoUncheckedUpdateWithoutUploadedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    hlsMaterList?: NullableStringFieldUpdateOperationsInput | string | null
    previewClip?: NullableStringFieldUpdateOperationsInput | string | null
    public?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videoProcessingTask?: videoProcessingTaskUncheckedUpdateManyWithoutVideoNestedInput
    upload?: uploadUncheckedUpdateManyWithoutVideoNestedInput
  }

  export type videoUncheckedUpdateManyWithoutUploadedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    hlsMaterList?: NullableStringFieldUpdateOperationsInput | string | null
    previewClip?: NullableStringFieldUpdateOperationsInput | string | null
    public?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type uploadUpdateWithoutUploaderInput = {
    id?: StringFieldUpdateOperationsInput | string
    multipartId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    video?: videoUpdateOneRequiredWithoutUploadNestedInput
  }

  export type uploadUncheckedUpdateWithoutUploaderInput = {
    id?: StringFieldUpdateOperationsInput | string
    multipartId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videoId?: StringFieldUpdateOperationsInput | string
  }

  export type uploadUncheckedUpdateManyWithoutUploaderInput = {
    id?: StringFieldUpdateOperationsInput | string
    multipartId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videoId?: StringFieldUpdateOperationsInput | string
  }

  export type videoProcessingTaskCreateManyVideoInput = {
    id?: string
    objectName: string
    status?: $Enums.VideoProcessingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type uploadCreateManyVideoInput = {
    id?: string
    user: string
    multipartId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type videoProcessingTaskUpdateWithoutVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    objectName?: StringFieldUpdateOperationsInput | string
    status?: EnumVideoProcessingStatusFieldUpdateOperationsInput | $Enums.VideoProcessingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type videoProcessingTaskUncheckedUpdateWithoutVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    objectName?: StringFieldUpdateOperationsInput | string
    status?: EnumVideoProcessingStatusFieldUpdateOperationsInput | $Enums.VideoProcessingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type videoProcessingTaskUncheckedUpdateManyWithoutVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    objectName?: StringFieldUpdateOperationsInput | string
    status?: EnumVideoProcessingStatusFieldUpdateOperationsInput | $Enums.VideoProcessingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type uploadUpdateWithoutVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    multipartId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploader?: userUpdateOneRequiredWithoutUploadNestedInput
  }

  export type uploadUncheckedUpdateWithoutVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: StringFieldUpdateOperationsInput | string
    multipartId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type uploadUncheckedUpdateManyWithoutVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: StringFieldUpdateOperationsInput | string
    multipartId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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