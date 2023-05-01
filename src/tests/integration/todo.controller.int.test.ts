import request from 'supertest';
import { app } from '../../index';
import newTodo from '../mock-data/new-todo';
import newTodoIncorrect from '../mock-data/new-todo-incorrect';

const endpoint = '/todos';
let firstTodo: any;

describe(endpoint, () => {
    it('POST ' + endpoint, async () => {
        const response = await request(app)
            .post(endpoint)
            .send(newTodo);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.done).toBe(newTodo.done);
    });

    it('must return 500 on invalid data ' + endpoint, async () => {
        const response = await request(app)
            .post(endpoint)
            .send(newTodoIncorrect);

        expect(response.statusCode).toBe(500);
        expect(response.body.error).toMatch(/Validation error/g);
    });

    it('GET ' + endpoint, async () => {
        const response = await request(app)
            .get(endpoint);

        expect(response.statusCode).toBe(200);
        expect(response.body instanceof Array).toBe(true);

        firstTodo = response.body[0];
    });

    it(`GET ${endpoint}/:id`, async () => {
        const response = await request(app)
            .get(`${endpoint}/${firstTodo._id}`);


        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual(firstTodo);
    });

    it(`GET ${endpoint}/:id - does not exist`, async () => {
        const response = await request(app)
            .get(`${endpoint}/643af950e83566def02fc88d`);


        expect(response.statusCode).toBe(404);
        expect(response.body).toStrictEqual({ error: "Todo not found" });
    });
});