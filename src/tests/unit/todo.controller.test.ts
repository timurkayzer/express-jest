import { TodoController } from "../../controllers/todo.controller";
import { TodoModel } from "../../model/todo.model";
import HttpMocks, { MockRequest, MockResponse } from 'node-mocks-http';
import newTodo from '../mock-data/new-todo';
import { NextFunction, Request, Response } from "express";


const todoController = new TodoController();

let req: MockRequest<any>, res: MockResponse<any>, next: NextFunction | null;

beforeEach(() => {
    req = HttpMocks.createRequest();
    res = HttpMocks.createResponse();
    next = null;
});

describe("TodoController:createTodo", () => {

    beforeEach(() => {
        req.body = newTodo;
        TodoModel.create = jest.fn();
    });

    it("should have createTodo method", () => {
        expect(typeof todoController.createTodo).toBe("function");
    });

    it("should call model creation", async () => {
        await todoController.createTodo(req, res);
        expect(TodoModel.create).toBeCalledWith(newTodo);
    });

    it("should return code 201", async () => {
        await todoController.createTodo(req, res);
        expect(res.statusCode).toBe(201);
        expect(res?._isEndCalled()).toBeTruthy();
    });

    it("should return JSON body", async () => {
        await todoController.createTodo(req, res);
        expect(res._getJSONData()).toMatchObject(newTodo);
    });
});