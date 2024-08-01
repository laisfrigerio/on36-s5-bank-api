import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(Client)
    private repository: Repository<Client>,
  ) {}

  async getAllClients(): Promise<Client[]> {
    return await this.repository.find({ relations: ['accounts'] });
  }

  async getClientsByManagerId(managerId: string): Promise<Client[]> {
    return await this.repository.find({
      where: { manager: { id: managerId } },
    });
  }

  async getClientByIdAndManagerId(
    clientId: string,
    managerId: string,
  ): Promise<Client | null> {
    return await this.repository.findOne({
      where: {
        id: clientId,
        manager: { id: managerId },
      },
    });
  }

  async getClientByAccountId(accountId: string): Promise<Client | null> {
    return await this.repository.findOne({
      where: { accounts: { id: accountId } },
      relations: ['accounts'],
    });
  }

  async getClientById(clientId: string): Promise<Client | null> {
    return await this.repository.findOne({
      where: { id: clientId },
      relations: ['accounts'],
    });
  }

  async createClient(client: Client): Promise<Client> {
    return this.repository.save(client);
  }

  async removeClient(clientId: string): Promise<void> {
    await this.repository.delete(clientId);
  }
}
