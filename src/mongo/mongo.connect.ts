import mongoose from "mongoose";

export async function connect(): Promise<void> {
    try {
        await mongoose.connect("mongodb://root:root@localhost:27017/?authMechanism=DEFAULT");
        console.log("Connected to database");
    }
    catch (e) {
        console.error("Error connecting to mongo,", e?.toString());
    }
}

