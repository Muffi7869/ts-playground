// objects, interfaces, readonly, index signatures

export interface User {
  readonly id: number;
  name: string;
  email: string;
  age?: number;
  tags: string[];
}
