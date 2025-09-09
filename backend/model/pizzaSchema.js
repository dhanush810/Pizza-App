import mongoose from "mongoose";

const schema = new mongoose.Schema({
    id : Number,
    type : String,
    price : Number,
    name : String,
    image : String,
    description: String,
    ingredients: [String],
    topping : [String]
});

const pizzaSchema = mongoose.model("pizzas", schema);

export default pizzaSchema;