// mini schema validator (zod-ish) to understand how type inference from validators works

export type Issue = { path: string; message: string };

export type ParseResult<T> = { success: true; data: T } | { success: false; issues: Issue[] };

export interface Schema<T> {
  parse(value: unknown, path?: string): ParseResult<T>;
}

export type Infer<S> = S extends Schema<infer T> ? T : never;

const fail = (path: string, message: string): ParseResult<never> => ({ success: false, issues: [{ path: path || "(root)", message }] });

export function string(opts: { min?: number; max?: number; email?: boolean } = {}): Schema<string> {
  return {
    parse(v, path = "") {
      if (typeof v !== "string") return fail(path, "expected string");
      if (opts.min !== undefined && v.length < opts.min) return fail(path, `min length ${opts.min}`);
      if (opts.max !== undefined && v.length > opts.max) return fail(path, `max length ${opts.max}`);
      if (opts.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return fail(path, "invalid email");
      return { success: true, data: v };
    },
  };
}

export function number(opts: { int?: boolean; min?: number; max?: number } = {}): Schema<number> {
  return {
    parse(v, path = "") {
      if (typeof v !== "number" || Number.isNaN(v)) return fail(path, "expected number");
      if (opts.int && !Number.isInteger(v)) return fail(path, "expected integer");
      if (opts.min !== undefined && v < opts.min) return fail(path, `must be >= ${opts.min}`);
      if (opts.max !== undefined && v > opts.max) return fail(path, `must be <= ${opts.max}`);
      return { success: true, data: v };
    },
  };
}

export function boolean(): Schema<boolean> {
  return { parse: (v, path = "") => (typeof v === "boolean" ? { success: true, data: v } : fail(path, "expected boolean")) };
}
