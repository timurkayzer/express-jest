import express, { json } from 'express';
import { todoController } from './controllers/todo.controller';

export const app = express();

app.use(json);
app.use(todoController.router);

app.get("/", (req, res) => {
    res.json("Hello world");
});

app.use(todoController.router);

app.listen(3000, () => { console.log("Server is running on 3000"); });