import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { Client } from '../clients/client.entity';
import { Manager } from '../managers/manager.entity';
import { AccountType } from '../accounts/account-type.enum';

@Controller('managers')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Get(':managerId')
  async getManagerById(
    @Param('managerId') managerId: string,
  ): Promise<Manager> {
    return await this.managerService.getManagerById(managerId);
  }

  @Post(':managerId/clients')
  async addClient(
    @Param('managerId') managerId: string,
    @Body() client: Client,
  ): Promise<Client> {
    return await this.managerService.addClient(managerId, client);
  }

  @Delete(':managerId/clients/:clientId')
  async removeClient(
    @Param('managerId') managerId: string,
    @Param('clientId') clientId: string,
  ): Promise<void> {
    return await this.managerService.removeClient(managerId, clientId);
  }

  @Get(':managerId/clients')
  async getClientsByManagerId(
    @Param('managerId') managerId: string,
  ): Promise<Client[]> {
    return await this.managerService.getClientsByManagerId(managerId);
  }

  @Post(':managerId/clients/:clientId/accounts')
  async openAccount(
    @Param('managerId') managerId: string,
    @Param('clientId') clientId: string,
    @Body('type') type: AccountType,
  ): Promise<void> {
    return await this.managerService.openAccount(managerId, clientId, type);
  }

  @Delete(':managerId/accounts/:accountId')
  async closeAccount(
    @Param('managerId') managerId: string,
    @Param('accountId') accountId: string,
  ): Promise<void> {
    return await this.managerService.closeAccount(managerId, accountId);
  }

  @Post(':managerId/accounts/:accountId/change-type')
  async modifyAccountType(
    @Param('managerId') managerId: string,
    @Param('accountId') accountId: string,
    @Body('newType') newType: AccountType,
  ): Promise<void> {
    return await this.managerService.modifyAccountType(
      managerId,
      accountId,
      newType,
    );
  }
}
