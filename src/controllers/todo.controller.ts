import { NextFunction, Request, Response, Router } from "express";
import { TodoModel } from "../model/todo.model";

export class TodoController {

    public router: Router;
    constructor() {
        this.router = Router({
            caseSensitive: false
        });
        this.router.post('', this.createTodo.bind(this));
        this.router.get('');
    }

    async getTodos(req: Request, res: Response, next: NextFunction) {
        const models = await TodoModel.find({});

        res.status(200).json(models);
    }

    async createTodo(req: Request, res: Response, next: NextFunction) {
        const newTodo = req.body;
        try {
            if (newTodo?.done === undefined || newTodo?.title === undefined) {
                throw new Error("Validation error");
            }
            const createdModel = await TodoModel.create(newTodo);
            res.status(201).json(newTodo).end();
        }
        catch (e) {
            console.error("Error while creating Todo,", e?.toString());
            next("Failed to write to database:" + e?.toString());
        }
    }
}

export const todoController = new TodoController();