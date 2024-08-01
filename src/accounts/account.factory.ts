import { Injectable } from '@nestjs/common';
import { AccountType } from './account-type.enum';
import { CheckingAccount, SavingsAccount } from './account.entity';
import { Client } from '../clients/client.entity';

@Injectable()
export class AccountFactory {
  createAccount(
    type: AccountType,
    client: Client,
  ): CheckingAccount | SavingsAccount {
    switch (type) {
      case AccountType.Checking:
        const currentAccount = new CheckingAccount();
        currentAccount.balance = 0;
        currentAccount.overdraftLimit = 500; // Exemplo de limite
        currentAccount.client = client;
        return currentAccount;
      case AccountType.Savings:
        const savingsAccount = new SavingsAccount();
        savingsAccount.balance = 0;
        savingsAccount.taxRate = 0.02; // Exemplo de taxa de juros
        savingsAccount.client = client;
        return savingsAccount;
      default:
        throw new Error('Invalid account type');
    }
  }
}
