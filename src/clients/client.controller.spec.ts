import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('ClientController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/clients (POST)', () => {
    const client = {
      name: 'John Doe',
      address: '123 Main St',
      phoneNumber: '1234567890',
    };

    return request(app.getHttpServer())
      .post('/clients')
      .send(client)
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBeDefined();
        expect(res.body.name).toBe(client.name);
        expect(res.body.address).toBe(client.address);
        expect(res.body.phoneNumber).toBe(client.phoneNumber);
      });
  });

  it('/clients (GET)', async () => {
    const client = {
      name: 'John Doe',
      address: '123 Main St',
      phoneNumber: '1234567890',
    };

    await request(app.getHttpServer())
      .post('/clients')
      .send(client)
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBeDefined();
        expect(res.body.name).toBe(client.name);
        expect(res.body.address).toBe(client.address);
        expect(res.body.phoneNumber).toBe(client.phoneNumber);
      });

    return request(app.getHttpServer())
      .get('/clients')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual([
          expect.objectContaining({ ...client, id: expect.any(String) }),
        ]);
      });
  });
});
