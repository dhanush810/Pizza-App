import mongoose from "mongoose";

const schema = mongoose.Schema({
    id: Number,
    tname : String,
    prize : Number,
    image : String
});

const ingredientSchema = mongoose.model("ingredients", schema);

export default ingredientSchema;