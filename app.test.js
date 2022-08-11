const request = require('supertest');

const app = require('./app');

describe('app', () => {
  it('Unauthorized', async () => {
    const response = await request(app).post('/users');

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      errors: [{ message: 'Unauthorized' }],
    });
  });

  it('Create user', async () => {
    const response = await request(app).post('/users').send({
      password: 'pass',
      username: 'mock-username',
    });

    expect(response.status).toBe(200);

    expect(response.body).toEqual({ userId: 1, username: 'mock-username' });
  });
});
