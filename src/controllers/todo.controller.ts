import { NextFunction, Request, Response, Router } from "express";
import { TodoModel } from "../model/todo.model";

export class TodoController {

    public router: Router;
    constructor() {
        this.router = Router();
        this.router.post('/todos', this.createTodo);
    }

    createTodo(req: Request, res: Response) {
        const newTodo = req.body;
        TodoModel.create(newTodo);
        res.status(201).json(newTodo);
    }
}

export const todoController = new TodoController();