import { Controller, Get, Post, Body } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './client.dto';
import { Client } from './client.entity';
import { IClient } from './client.interface';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  createClient(@Body() createClientDto: CreateClientDto): Promise<Client> {
    const client: IClient = { ...createClientDto };
    return this.clientService.createClient(client);
  }

  @Get()
  getAllClients(): Promise<Client[]> {
    return this.clientService.getAllClients();
  }

  @Get()
  getClientById(id: string): Promise<Client> {
    return this.clientService.getClientById(id);
  }
}
