import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientRepository } from './client.repository';
import { Client } from './client.entity';
import { IClient } from './client.interface';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientRepository)
    private clientRepository: ClientRepository,
  ) {}

  async createClient(client: IClient): Promise<Client> {
    const { name, address, phoneNumber } = client;
    return await this.clientRepository.createClient({
      name,
      address,
      phoneNumber,
    });
  }

  async removeClient(clientId: string): Promise<void> {
    await this.clientRepository.removeClient(clientId);
  }

  async getAllClients(): Promise<Client[]> {
    return await this.clientRepository.getAllClients();
  }

  async getClientsByManagerId(clientId: string): Promise<Client[] | null> {
    return await this.clientRepository.getClientsByManagerId(clientId);
  }

  async getClientById(clientId: string): Promise<Client | null> {
    return await this.clientRepository.getClientById(clientId);
  }

  async getClientByAccountId(accountId: string): Promise<Client | null> {
    return await this.clientRepository.getClientByAccountId(accountId);
  }

  async getClientByIdAndManagerId(
    clientId: string,
    managerId: string,
  ): Promise<Client | null> {
    return await this.clientRepository.getClientByIdAndManagerId(
      clientId,
      managerId,
    );
  }
}
