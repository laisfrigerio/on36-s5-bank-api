import { Injectable } from '@nestjs/common';
import { Manager } from './manager.entity';
import { Client } from '../clients/client.entity';
import { AccountType } from '../accounts/account-type.enum';
import { AccountService } from '../accounts/account.service';
import { ManagerRepository } from './manager.repository';
import { ClientService } from 'src/clients/client.service';

@Injectable()
export class ManagerService {
  constructor(
    private managerRepository: ManagerRepository,
    private clientService: ClientService,
    private accountService: AccountService,
  ) {}

  async addClient(managerId: string, client: Client): Promise<Client> {
    const manager = await this.managerRepository.findManagerById(managerId);
    client.manager = manager;
    return this.clientService.createClient(client);
  }

  async removeClient(managerId: string, clientId: string): Promise<void> {
    const client = await this.clientService.getClientByIdAndManagerId(
      clientId,
      managerId,
    );
    await this.clientService.removeClient(client.id);
  }

  async getClientsByManagerId(managerId: string): Promise<Client[]> {
    return await this.clientService.getClientsByManagerId(managerId);
  }

  async getManagerById(managerId: string): Promise<Manager> {
    const manager = await this.managerRepository.findManagerById(managerId);
    return manager;
  }

  async openAccount(
    managerId: string,
    clientId: string,
    type: AccountType,
  ): Promise<void> {
    const client = await this.clientService.getClientById(clientId);

    const manager = await this.managerRepository.findManagerById(managerId);
    client.manager = manager;

    await this.accountService.createAccount(type, client);
  }

  async closeAccount(managerId: string, accountId: string): Promise<void> {
    if (await this.isClientAssignedToManager(managerId, accountId)) {
      await this.accountService.deleteAccount(accountId);
    }
  }

  async modifyAccountType(
    managerId: string,
    accountId: string,
    newType: AccountType,
  ): Promise<void> {
    if (await this.isClientAssignedToManager(managerId, accountId)) {
      await this.accountService.changeAccountType(accountId, newType);
    }
  }

  private async isClientAssignedToManager(
    accountId: string,
    managerId: string,
  ): Promise<boolean> {
    const client = await this.clientService.getClientByAccountId(accountId);
    const manager = await this.getManagerById(managerId);

    if (client.manager && client.manager.id !== manager.id) {
      throw new Error('Client does not belong to manager');
    }

    return true;
  }
}
