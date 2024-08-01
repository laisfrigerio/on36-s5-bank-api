// src/managers/manager.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from './manager.entity';
import { Client } from '../clients/client.entity';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { AccountModule } from '../accounts/account.module';

@Module({
  imports: [TypeOrmModule.forFeature([Manager, Client]), AccountModule],
  providers: [ManagerService],
  controllers: [ManagerController],
})
export class ManagerModule {}
