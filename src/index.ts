import express, { NextFunction, Request, Response, json } from 'express';
import { todoController } from './controllers/todo.controller';
import { connect } from './mongo/mongo.connect';

connect();

export const app = express();
app.use(json());
app.use('/todos', todoController.router);

app.get("/", (req, res) => {
    res.json("Hello world");
});

app.use((err: Error | any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ error: err?.toString() });
});