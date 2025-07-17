const request = require('supertest');
const express = require('express');
const bugRoutes = require('../routes/bugs');
const mongoose = require('mongoose');
const Bug = require('../models/Bug');

const app = express();
app.use(express.json());
app.use('/bugs', bugRoutes);

beforeAll(async () => {
  const url = 'mongodb://127.0.0.1/bugtracker-test';
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Bug API', () => {
  let bugId;

  test('POST /bugs creates a bug', async () => {
    const res = await request(app)
      .post('/bugs')
      .send({ title: 'Test bug', description: 'Testing integration' })
      .expect(201);

    expect(res.body.title).toBe('Test bug');
    bugId = res.body._id;
  });

  test('GET /bugs returns bugs', async () => {
    const res = await request(app).get('/bugs').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('PATCH /bugs/:id updates status', async () => {
    const res = await request(app)
      .patch(`/bugs/${bugId}`)
      .send({ status: 'resolved' })
      .expect(200);

    expect(res.body.status).toBe('resolved');
  });

  test('DELETE /bugs/:id deletes a bug', async () => {
    await request(app).delete(`/bugs/${bugId}`).expect(200);
    const bug = await Bug.findById(bugId);
    expect(bug).toBeNull();
  });
});
