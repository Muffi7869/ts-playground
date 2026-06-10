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

export class Checking extends Account {
  private overdraft: number;
  constructor(owner: string, balance = 0, overdraft = 100) {
    super(owner, balance);
    this.overdraft = overdraft;
  }
  withdraw(amount: number): boolean {
    if (amount > this.balance + this.overdraft) return false;
    this.balance -= amount;
    return true;
  }
}

export class Savings extends Account {
  private rate: number;
  constructor(owner: string, balance = 0, rate = 0.04) {
    super(owner, balance);
    this.rate = rate;
  }
  withdraw(amount: number): boolean {
    if (amount > this.balance) return false;
    this.balance -= amount;
    return true;
  }
  addInterest(months: number): number {
    this.balance *= (1 + this.rate / 12) ** months;
    return this.balance;
  }
}
