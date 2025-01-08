import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

userSchema.virtual("todos", {
    ref: "Todos",  // Referencing the model name as 'Todos'
    localField: "_id",
    foreignField: "userId",
    justOne: false  // One user can have multiple todos
});

export const User = mongoose.model("Users", userSchema);
