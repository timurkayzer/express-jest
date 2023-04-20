import { TodoController } from "../../controllers/todo.controller";
import { TodoModel } from "../../model/todo.model";
import HttpMocks, { MockRequest, MockResponse } from 'node-mocks-http';
import newTodo from '../mock-data/new-todo';
import newTodoIncorrect from '../mock-data/new-todo-incorrect';
import { NextFunction, Request, Response } from "express";


const todoController: any = new TodoController();

let req: MockRequest<any>, res: MockResponse<any>, next: NextFunction;

beforeEach(() => {
    req = HttpMocks.createRequest();
    res = HttpMocks.createResponse();
    next = jest.fn();
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
        await todoController.createTodo(req, res, next);
        expect(TodoModel.create).toBeCalledWith(newTodo);
    });

    it("should return code 201", async () => {
        await todoController.createTodo(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res?._isEndCalled()).toBeTruthy();
    });

    it("should return JSON body", async () => {
        await todoController.createTodo(req, res, next);
        expect(res._getJSONData()).toMatchObject(newTodo);
    });

    it("should return error on invalid", async () => {
        req.body = newTodoIncorrect;
        await todoController.createTodo(req, res, next);
        expect(next).toBeCalledWith("Failed to write to database:Error: Validation error");
    });
});

describe("TodoController:getTodos", () => {
    it("should have method", () => {
        expect(typeof todoController.getTodos).toBe('function');
    });

    it("find must be called", async () => {
        TodoModel.find = jest.fn();
        await todoController.getTodos(req, res, next);
        expect(TodoModel.find).toBeCalled();
    });
});