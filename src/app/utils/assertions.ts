import { isNil } from 'lodash';

export type NotArray<T> = T extends (infer _R)[] ? never : T;

// eslint-disable-next-line no-null/no-null
export type Maybe<T> = T | undefined | null;

/**
 * ATTENTION: do NOT use this function unless you know what you are doing.
 * This is not a magic wand, if the value is actually undefined/null, using this method will crash the application.
 * If you don't want undefined/null as a value but you can omit the action, use ensureDefinedSoftly or sensible default values instead
 */
export function ensureDefined<T>(val: NonNullable<NotArray<T>>): never;
/**
 * ATTENTION: do NOT use this function unless you know what you are doing.
 * This is not a magic wand, if the value is actually undefined/null, using this method will crash the application.
 * If you don't want undefined/null as a value but you can omit the action, use ensureDefinedSoftly or sensible default values instead
 */
export function ensureDefined<T>(val: Maybe<NotArray<T>>, message?: string): T;
export function ensureDefined<T>(val: Maybe<NotArray<T>>, message?: string): T {
  if (ensureDefinedSoftly(val, message)) {
    return val;
  }

  throw Error(
    message ||
      `This shouldn't happen, the value should have been defined but instead it is ${val}`
  );
}
export function ensureDefinedSoftly<T>(
  val: Maybe<NotArray<T>>,
  message?: string
): val is NotArray<T> {
  if (isNil(val)) {
    failOnLocalhost(message || getDefaultUndefinedMessage(val));

    return false;
  }

  return true;
}

export function failOnLocalhost(error: string) {
  if (process.env.NODE_ENV !== 'production') {
    throwSoftError(error);
  } else {
    throw Error(error);
  }
}

// eslint-disable-next-line no-null/no-null
function getDefaultUndefinedMessage(val: null | undefined) {
  return `This shouldn't happen, the value should have been defined but instead it is ${val}`;
}

export class SoftError extends Error {
  constructor(error: string | Error) {
    if (error instanceof Error) {
      super(error.message);
      this.name = error.name;
      this.stack = error.stack;
    } else {
      super(error);
    }

    // Set the prototype explicitly. Otherwise `instanceof SoftError` check will not work properly.
    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, SoftError.prototype);
  }
}

// for functions, which cannot access the error-handling module,
// but SoftError could be caught and logged properly by error-handling module,
// so, this code allows to return defaultValue and no to loose occurred exception.
/* eslint-disable no-console */
export function throwSoftError(error: string | Error) {
  if (typeof error === 'string') {
    console.error(`Soft Error: ${error}`);
  } else {
    console.error('Soft Error...');
    console.error(error);
  }

  const softError = new SoftError(error);
  setTimeout(() => {
    throw softError;
  }, 1);
}
/* eslint-enable no-console */

export function assertNever<T>(
  value: never,
  options?: {
    message?: string;
    defaultValue?: T;
  }
): T | undefined {
  const message = options?.message || `Unprocessable type: ${value}`;
  if (isProduction()) {
    /* eslint-disable-next-line no-console */
    console.error(message);

    return options?.defaultValue || value;
  }

  throw new Error(message);
}

export function isProduction() {
  return process.env.NODE_ENV === 'production';
}
