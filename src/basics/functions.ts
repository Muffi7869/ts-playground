// functions: overloads, optional params, higher order

export function greet(name: string, excited?: boolean): string {
  return `hey ${name}${excited ? "!" : "."}`;
}

export function sum(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}
