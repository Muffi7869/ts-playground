// functions: overloads, optional params, higher order

export function greet(name: string, excited?: boolean): string {
  return `hey ${name}${excited ? "!" : "."}`;
}
