import { TodoController } from "../../controllers/todo.controller";

describe("TodoController:createTodo", () => {
    it("should have createTodo method", () => {
        expect(typeof TodoController.createTodo).toBe("function");
    });
});