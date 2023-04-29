import { TodoController } from "../../controllers/todo.controller";
import { TodoModel } from "../../model/todo.model";
import HttpMocks, { MockRequest, MockResponse } from 'node-mocks-http';
import newTodo from '../mock-data/new-todo';
import allTodos from '../mock-data/todos';
import newTodoIncorrect from '../mock-data/new-todo-incorrect';
import { NextFunction } from "express";


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

    it('should return status 200 and todos', async () => {
        TodoModel.find = jest.fn().mockReturnValueOnce(allTodos);
        await todoController.getTodos(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allTodos);
    });

    it('should handle errors', async () => {
        TodoModel.find = () => { throw new Error("Failed database query"); };
        await todoController.getTodos(req, res, next);

        expect(next).toBeCalledWith("Failed retrieve data:Error: Failed database query");

    });
});

describe("TodoController: findById", () => {

    beforeEach(() => {
        TodoModel.findById = jest.fn();
    });

    it("should exist", () => {
        expect(typeof todoController.findById).toBe("function");
    });

    it("should call method", async () => {
        const testQueryId = "testId";
        req.query.id = testQueryId;
        await todoController.findById(req, res, next);
        expect(TodoModel.findById).toBeCalledWith(testQueryId);
    });

    it("should return json body and status", async () => {
        req.query.id = "111aaaa2322";
        const createdModel = {
            _id: "111aaaa2322",
            ...newTodo
        };
        TodoModel.findById = jest.fn().mockReturnValueOnce(createdModel);

        await todoController.findById(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(createdModel);
    });

    it("should handle errors", async () => {
        TodoModel.findById = jest.fn().mockReturnValueOnce(new Promise((resolve, reject) => {
            reject("Object not found");
        }));
        req.query.id = "111aaaa2322";
        await todoController.findById(req, res, next);

        expect(next).toBeCalledWith("Object not found");

    });
});