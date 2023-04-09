import { NextFunction, Request, Response } from "express";
import { TodoModel } from "../model/todo.model";

export class TodoController {
    createTodo(req: Request, res: Response) {
        const newTodo = req.body;
        TodoModel.create(newTodo);
        res.status(201).json(newTodo);
    }
}