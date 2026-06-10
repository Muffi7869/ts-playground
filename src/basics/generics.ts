// generics and constraints

export function first<T>(arr: readonly T[]): T | undefined {
  return arr[0];
}

export function last<T>(arr: readonly T[]): T | undefined {
  return arr[arr.length - 1];
}
