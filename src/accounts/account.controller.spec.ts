import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { uuid } from 'uuidv4';
import { AppModule } from '../app.module';
import { AccountType } from './account-type.enum';

jest.mock('uuidv4');

describe('AccountController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('create a savings account for an existing client (POST)', async () => {
    const accountId = '3453a769-1c8f-4a16-8d7a-45da761e504a';
    const clientId = 'ba97bf54-8a28-4a39-ac6c-bd51c70db235';

    const createClient = {
      name: 'John Doe',
      address: '123 Main St',
      phoneNumber: '1234567890',
    };

    // UUID Client
    (uuid as jest.Mock).mockReturnValue(clientId);

    await request(app.getHttpServer())
      .post('/clients')
      .send(createClient)
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBe(clientId);
        expect(res.body.name).toBe(createClient.name);
        expect(res.body.address).toBe(createClient.address);
        expect(res.body.phoneNumber).toBe(createClient.phoneNumber);
      });

    // UUID Account
    (uuid as jest.Mock).mockReturnValue(accountId);
    await request(app.getHttpServer())
      .post('/accounts')
      .send({
        type: AccountType.Savings,
        clientId,
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBe(accountId);
        expect(res.body.balance).toBe(0);
        expect(res.body.taxRate).toBe(0.02);
        expect(res.body.overdraftLimit).not.toBeDefined();
        expect(res.body.client).toEqual(expect.objectContaining(createClient));
        expect(res.body.typeAccount).toBe(AccountType.Savings);
      });
  });

  it('create a checking account for an existing client (POST)', async () => {
    const accountId = '8270b1d1-4600-47c8-b273-179e44bbd271';
    const clientId = 'c9f355c8-deb7-419d-a61e-3114fff3d6aa';

    const createClient = {
      name: 'Liza Doe',
      address: '3456 Alejandro St',
      phoneNumber: '1234567890',
    };

    // UUID Client
    (uuid as jest.Mock).mockReturnValue(clientId);

    await request(app.getHttpServer())
      .post('/clients')
      .send(createClient)
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBe(clientId);
        expect(res.body.name).toBe(createClient.name);
        expect(res.body.address).toBe(createClient.address);
        expect(res.body.phoneNumber).toBe(createClient.phoneNumber);
      });

    // UUID Account
    (uuid as jest.Mock).mockReturnValue(accountId);
    await request(app.getHttpServer())
      .post('/accounts')
      .send({
        type: AccountType.Checking,
        clientId,
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBe(accountId);
        expect(res.body.balance).toBe(0);
        expect(res.body.overdraftLimit).toBe(500);
        expect(res.body.taxRate).not.toBeDefined();
        expect(res.body.client).toEqual(expect.objectContaining(createClient));
        expect(res.body.typeAccount).toBe(AccountType.Checking);
      });
  });
});
