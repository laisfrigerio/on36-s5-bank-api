import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './account.service';
import { AccountRepository } from './account.repository';
import { AccountFactory } from './account.factory';

@Module({
  imports: [TypeOrmModule.forFeature([AccountRepository])],
  providers: [AccountService, AccountFactory],
  exports: [AccountService],
})
export class AccountModule {}
