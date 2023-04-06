import mongoose from "mongoose";

export const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: true
    }
});

export const TodoModel = mongoose.model("Todo", TodoSchema);