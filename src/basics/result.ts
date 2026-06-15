// error handling without throwing everywhere: a small Result type

export type Ok<T> = { ok: true; value: T };

export type Err<E> = { ok: false; error: E };

export type Result<T, E = string> = Ok<T> | Err<E>;

export const ok = <T>(value: T): Ok<T> => ({ ok: true, value });

export const err = <E>(error: E): Err<E> => ({ ok: false, error });

export function safeParseInt(s: string): Result<number> {
  const n = Number.parseInt(s, 10);
  return Number.isNaN(n) ? err(`not a number: ${s}`) : ok(n);
}
