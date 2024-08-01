import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { uuid } from 'uuidv4';
import { AppModule } from '../app.module';

jest.mock('uuidv4');

describe('Manager Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/managers (POST)', () => {
    const managerId = 'ba97bf54-8a28-4a39-ac6c-bd51c70db235';
    const managerName = 'Liza Symphony';

    // UUID Manager
    (uuid as jest.Mock).mockReturnValue(managerId);

    return request(app.getHttpServer())
      .post('/managers')
      .send({
        name: managerName,
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBe(managerId);
        expect(res.body.name).toBe(managerName);
      });
  });

  it('/managers/:managerId (GET)', async () => {
    const managerId = 'ba97bf54-8a28-4a39-ac6c-bd51c70db235';
    const managerName = 'John Doe';

    // UUID Manager
    (uuid as jest.Mock).mockReturnValue(managerId);

    // Create manager
    await request(app.getHttpServer())
      .post('/managers')
      .send({
        name: managerName,
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBe(managerId);
        expect(res.body.name).toBe(managerName);
      });

    // Get manager by its ID
    return request(app.getHttpServer())
      .get(`/managers/${managerId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          id: managerId,
          name: managerName,
        });
      });
  });

  it('/managers/:managerId (DELETE)', async () => {
    const managerOneId = 'ba97bf54-8a28-4a39-ac6c-bd51c70db235';
    const managerOneName = 'John Doe';

    const managerTwoId = 'c9f355c8-deb7-419d-a61e-3114fff3d6aa';
    const managerTwoName = 'Liza Symphony';

    // UUID Manager
    (uuid as jest.Mock).mockReturnValue(managerOneId);

    // Create the first manager
    await request(app.getHttpServer())
      .post('/managers')
      .send({
        name: managerOneName,
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBe(managerOneId);
        expect(res.body.name).toBe(managerOneName);
      });

    // UUID Manager
    (uuid as jest.Mock).mockReturnValue(managerTwoId);

    // Create the second manager
    await request(app.getHttpServer())
      .post('/managers')
      .send({
        name: managerTwoName,
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBe(managerTwoId);
        expect(res.body.name).toBe(managerTwoName);
      });

    // Delete the second manager by its ID
    await request(app.getHttpServer())
      .delete(`/managers/${managerTwoId}`)
      .expect(200);

    // Get second manager by its ID should return 404
    return request(app.getHttpServer())
      .get(`/managers/${managerTwoId}`)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe('Manager not found');
      });
  });
});
