import { TodoController } from "../../controllers/todo.controller";
import { TodoModel } from "../../model/todo.model";
import HttpMocks from 'node-mocks-http';
import newTodo from '../mock-data/new-todo';


const todoController = new TodoController();


describe("TodoController:createTodo", () => {
    it("should have createTodo method", () => {
        expect(typeof todoController.createTodo).toBe("function");
    });

    it("should call model creation", () => {
        TodoModel.create = jest.fn();
        const req = HttpMocks.createRequest();
        const res = HttpMocks.createResponse();
        const next = null;

        req.body = newTodo;

        todoController.createTodo(req, res);
        expect(TodoModel.create).toBeCalledWith(newTodo);
    });
});