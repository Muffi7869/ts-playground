// mini schema validator (zod-ish) to understand how type inference from validators works

export type Issue = { path: string; message: string };

export type ParseResult<T> = { success: true; data: T } | { success: false; issues: Issue[] };

export interface Schema<T> {
  parse(value: unknown, path?: string): ParseResult<T>;
}

export type Infer<S> = S extends Schema<infer T> ? T : never;

const fail = (path: string, message: string): ParseResult<never> => ({ success: false, issues: [{ path: path || "(root)", message }] });
