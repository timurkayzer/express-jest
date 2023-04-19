import express, { json } from 'express';
import { todoController } from './controllers/todo.controller';
import { connect } from './mongo/mongo.connect';

connect();

export const app = express();
app.use(json());
app.use(todoController.router);

app.get("/", (req, res) => {
    res.json("Hello world");
});