import {
  Column,
  Entity,
  ManyToOne,
  TableInheritance,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from '../clients/client.entity';

@Entity('accounts')
@TableInheritance({ column: { type: 'varchar', name: 'type_account' } })
export abstract class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  balance: number;

  @ManyToOne(() => Client, (client) => client.accounts)
  client: Client;

  getBalance(): number {
    return this.balance;
  }

  deposit(value: number): void {
    this.balance += value;
  }

  withdraw(value: number): void {
    if (value <= this.balance) {
      this.balance -= value;
      return;
    }

    throw new Error('Saldo insuficiente');
  }

  abstract transfer(destino: Account, value: number): void;
}

@Entity()
export class CheckingAccount extends Account {
  @Column()
  overdraftLimit: number;

  getBalance(): number {
    return this.balance + this.overdraftLimit;
  }

  transfer(destiny: Account, value: number): void {
    if (value <= this.getBalance()) {
      this.withdraw(value);
      destiny.deposit(value);
      return;
    }

    throw new Error('Saldo insuficiente para transferência.');
  }
}

@Entity()
export class SavingsAccount extends Account {
  @Column()
  taxRate: number;

  transfer(destiny: Account, value: number): void {
    if (value <= this.balance) {
      this.withdraw(value);
      destiny.deposit(value);
      return;
    }

    throw new Error('Saldo insuficiente para transferência.');
  }
}
