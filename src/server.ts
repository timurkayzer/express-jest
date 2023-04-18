import { app } from ".";
import { connect } from "./mongo/mongo.connect";

app.listen(3000, () => {
    console.log("Server is running on 3000");
});