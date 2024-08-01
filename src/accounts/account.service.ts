import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountRepository } from './account.repository';
import { Account, CheckingAccount, SavingsAccount } from './account.entity';
import { AccountType } from './account-type.enum';
import { AccountFactory } from './account.factory';
import { Client } from '../clients/client.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountRepository)
    private accountRepository: AccountRepository,
    private accountFactory: AccountFactory,
  ) {}

  async createAccount(
    type: AccountType,
    client: Client,
  ): Promise<CheckingAccount | SavingsAccount> {
    const account = this.accountFactory.createAccount(type, client);
    return this.accountRepository.save(account);
  }

  async changeAccountType(
    accountId: string,
    newType: AccountType,
  ): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: { id: accountId },
    });
    const client = account.client;
    await this.deleteAccount(accountId);
    return await this.createAccount(newType, client);
  }

  async deleteAccount(accountId: string): Promise<void> {
    await await this.accountRepository.delete(accountId);
  }
}
