import express, { json } from 'express';
import { todoController } from './controllers/todo.controller';
import { connect } from './mongo/mongo.connect';

export const app = express();
connect();

app.use(json());
app.use(todoController.router);

app.get("/", (req, res) => {
    res.json("Hello world");
});

app.listen(3000, () => { console.log("Server is running on 3000"); });