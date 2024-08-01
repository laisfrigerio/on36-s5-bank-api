// src/accounts/account-factory.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AccountFactory } from './account.factory';
import { AccountType } from './account-type.enum';
import { Client } from '../clients/client.entity';
import { CheckingAccount, SavingsAccount } from './account.entity';

describe('AccountFactory', () => {
  let factory: AccountFactory;
  const client = new Client('John Doe', 'John Doe Address', '1234567890');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountFactory],
    }).compile();

    factory = module.get<AccountFactory>(AccountFactory);
  });

  it('should create a checking account', () => {
    const account = factory.createAccount(AccountType.Checking, client);
    expect(account).toBeInstanceOf(CheckingAccount);
    expect(account.client).toBe(client);
  });

  it('should create a savings account', () => {
    const account = factory.createAccount(AccountType.Savings, client);
    expect(account).toBeInstanceOf(SavingsAccount);
    expect(account.client).toBe(client);
  });

  it('should throw an error for an invalid account type', () => {
    expect(() =>
      factory.createAccount('invalid-type' as AccountType, client),
    ).toThrow('Invalid account type');
  });
});
