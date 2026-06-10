// classes: access modifiers, abstract, interfaces, getters

export interface Describable {
  describe(): string;
}

export abstract class Account implements Describable {
  protected balance: number;
  readonly owner: string;
  private static count = 0;
  constructor(owner: string, balance = 0) {
    this.owner = owner;
    this.balance = balance;
    Account.count++;
  }
  static get total(): number {
    return Account.count;
  }
  deposit(amount: number): void {
    if (amount <= 0) throw new RangeError("deposit must be positive");
    this.balance += amount;
  }
  abstract withdraw(amount: number): boolean;
  get current(): number {
    return this.balance;
  }
  describe(): string {
    return `${this.constructor.name}(${this.owner}, $${this.balance.toFixed(2)})`;
  }
}
