import { TodoController } from "../../controllers/todo.controller";

const todoController = new TodoController();

describe("TodoController:createTodo", () => {
    it("should have createTodo method", () => {
        expect(typeof todoController.createTodo).toBe("function");
    });
});