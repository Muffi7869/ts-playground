// error handling without throwing everywhere: a small Result type

export type Ok<T> = { ok: true; value: T };

export type Err<E> = { ok: false; error: E };
