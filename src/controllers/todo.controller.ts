import { Request, Response, Router } from "express";
import { TodoModel } from "../model/todo.model";

export class TodoController {

    public router: Router;
    constructor() {
        this.router = Router();
        this.router.post('/todos', this.createTodo.bind(this));
    }

    async createTodo(req: Request, res: Response) {
        const newTodo = req.body;
        const createdModel = await TodoModel.create(newTodo);
        res.status(201).json(newTodo).end();
    }
}

export const todoController = new TodoController();