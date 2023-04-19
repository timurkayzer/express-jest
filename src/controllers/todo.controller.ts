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
        try {

        }
        catch (e) {
            console.error("Error while creating Todo,", e?.toString());
            res.status(500).json({ error: e?.toString() });
        }
        const createdModel = await TodoModel.create(newTodo);
        res.status(201).json(newTodo).end();
    }
}

export const todoController = new TodoController();