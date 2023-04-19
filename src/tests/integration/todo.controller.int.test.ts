import request from 'supertest';
import { app } from '../../index';
import newTodo from '../mock-data/new-todo';

const endpoint = '/todos';

describe(endpoint, () => {
    it('POST ' + endpoint, async () => {
        const response = await request(app)
            .post(endpoint)
            .send(newTodo);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.done).toBe(newTodo.done);
    });
});