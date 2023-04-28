import { NextFunction, Request, Response, Router } from "express";
import { TodoModel } from "../model/todo.model";

export class TodoController {

    public router: Router;
    constructor() {
        this.router = Router({
            caseSensitive: false
        });
        this.router.post('', this.createTodo.bind(this));
        this.router.get('', this.getTodos.bind(this));
    }

    async getTodos(req: Request, res: Response, next: NextFunction) {
        try {
            const models = await TodoModel.find({});
            res.status(200).json(models);
        }
        catch (e) {
            console.error("Error while getting todos,", e?.toString);
            next("Failed retrieve data:" + e?.toString());
        }

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

    async findById(req: Request, res: Response, next: NextFunction) {
        const id = req.query?.id;
        try {
            const foundTodo = await TodoModel.findById(id);
            if (foundTodo) {
                res.status(200).json(foundTodo);
            }
            else {
                res.status(404).send();
            }
        }
        catch (e) {
            console.error("Error while getting by id,", e?.toString());
            next(e?.toString());
        }
    }
}

export const todoController = new TodoController();