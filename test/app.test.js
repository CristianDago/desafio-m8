const request = require('supertest');
const express = require('express');
const app = require('../app');

// Prueba para GET /tasks
describe('GET /tasks', () => {
  it('should return all tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

// Prueba para GET /tasks/:id
describe('GET /tasks/:id', () => {
  it('should return a single task if ID exists', async () => {
    const res = await request(app).get('/tasks/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
  });

  it('should return 404 if task is not found', async () => {
    const res = await request(app).get('/tasks/999');
    expect(res.statusCode).toBe(404);
  });
});
