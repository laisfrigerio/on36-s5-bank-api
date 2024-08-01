import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from './clients/client.module';
import { AccountModule } from './accounts/account.module';
import { ManagerModule } from './managers/manager.module';
import { Client } from './clients/client.entity';
import {
  Account,
  CheckingAccount,
  SavingsAccount,
} from './accounts/account.entity';
import { Manager } from './managers/manager.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'lais',
      password: 'Users123',
      database: 'users',
      entities: [Client, Account, CheckingAccount, SavingsAccount, Manager],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      Client,
      Account,
      CheckingAccount,
      SavingsAccount,
    ]),
    ClientModule,
    AccountModule,
    ManagerModule,
  ],
})
export class AppModule {}
