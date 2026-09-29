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

export function optional<T>(inner: Schema<T>): Schema<T | undefined> {
  return { parse: (v, path) => (v === undefined ? { success: true, data: undefined } : inner.parse(v, path)) };
}

export function array<T>(item: Schema<T>): Schema<T[]> {
  return {
    parse(v, path = "") {
      if (!Array.isArray(v)) return fail(path, "expected array");
      const out: T[] = [];
      const issues: Issue[] = [];
      v.forEach((x, i) => {
        const r = item.parse(x, `${path}[${i}]`);
        if (r.success) out.push(r.data);
        else issues.push(...r.issues);
      });
      return issues.length ? { success: false, issues } : { success: true, data: out };
    },
  };
}

export function object<Shape extends Record<string, Schema<unknown>>>(shape: Shape): Schema<{ [K in keyof Shape]: Infer<Shape[K]> }> {
  return {
    parse(v, path = "") {
      if (typeof v !== "object" || v === null || Array.isArray(v)) return fail(path, "expected object");
      const out: Record<string, unknown> = {};
      const issues: Issue[] = [];
      for (const key of Object.keys(shape)) {
        const r = shape[key].parse((v as Record<string, unknown>)[key], path ? `${path}.${key}` : key);
        if (r.success) out[key] = r.data;
        else issues.push(...r.issues);
      }
      return issues.length ? { success: false, issues } : { success: true, data: out as { [K in keyof Shape]: Infer<Shape[K]> } };
    },
  };
}

export function oneOf<const T extends readonly string[]>(values: T): Schema<T[number]> {
  return {
    parse: (v, path = "") => (typeof v === "string" && values.includes(v) ? { success: true, data: v as T[number] } : fail(path, `expected one of ${values.join(", ")}`)),
  };
}
