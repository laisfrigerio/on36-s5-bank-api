import { Test, TestingModule } from '@nestjs/testing';
import { uuid } from 'uuidv4';
import { ClientService } from './client.service';
import { ClientRepository } from './client.repository';
import { IClient } from './client.interface';

describe('ClientService', () => {
  let service: ClientService;
  let repository: ClientRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientService, ClientRepository],
    }).compile();

    service = module.get<ClientService>(ClientService);
    repository = module.get<ClientRepository>(ClientRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should create a client', async () => {
    const client: IClient = {
      name: 'John Doe',
      address: '123 Main St',
      phoneNumber: '1234567890',
    };

    const { name, address, phoneNumber } = client;

    (jest.spyOn(repository, 'createClient') as jest.Mock).mockReturnValue({
      name,
      address,
      phoneNumber,
    });
    expect(service.createClient(client)).toEqual(client);
  });

  it('should get all clients', async () => {
    const client: IClient = {
      name: 'John Doe',
      address: '123 Main St',
      phoneNumber: '1234567890',
    };

    expect(service.createClient(client)).toEqual(
      expect.objectContaining({ ...client, id: expect.any(String) }),
    );

    expect(service.getAllClients()).toEqual([
      expect.objectContaining({ ...client, id: expect.any(String) }),
    ]);
  });

  it('should get all clients when mocking data', async () => {
    const client: IClient = {
      name: 'John Doe',
      address: '123 Main St',
      phoneNumber: '1234567890',
    };

    const clientId = uuid();

    (jest.spyOn(repository, 'getAllClients') as jest.Mock).mockReturnValue([
      { ...client, id: clientId },
    ]);

    expect(service.getAllClients()).toEqual([{ ...client, id: clientId }]);
  });

  it('should get a client by its id', async () => {
    const client: IClient = {
      name: 'John Doe',
      address: '123 Main St',
      phoneNumber: '1234567890',
    };

    const clientCreated = service.createClient(client);

    expect(clientCreated).toEqual(
      expect.objectContaining({ ...client, id: expect.any(String) }),
    );

    expect(service.getClientById(clientCreated.id)).toEqual({
      ...client,
      id: clientCreated.id,
    });
  });

  it('should get a client by its id when mocking data', async () => {
    const client: IClient = {
      name: 'John Doe',
      address: '123 Main St',
      phoneNumber: '1234567890',
    };

    const clientId = uuid();

    const clientCreated = { ...client, id: clientId };

    (jest.spyOn(repository, 'getClientById') as jest.Mock).mockReturnValue(
      clientCreated,
    );

    expect(service.getClientById(clientCreated.id)).toEqual(clientCreated);
  });

  it('should remove a client by its id', async () => {
    const clientOne: IClient = {
      name: 'John Doe',
      address: '123 Main St',
      phoneNumber: '1234567890',
    };

    const clientTwo: IClient = {
      name: 'Liza Doe',
      address: '567 Main St',
      phoneNumber: '124531245667',
    };

    const clientOneCreated = service.createClient(clientOne);
    const clientTwoCreated = service.createClient(clientTwo);

    service.removeClient(clientOneCreated.id);

    expect(service.getAllClients()).toEqual([clientTwoCreated]);
  });
});
