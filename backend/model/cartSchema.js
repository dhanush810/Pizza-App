import mongoose from "mongoose";

const schema = new mongoose.Schema({
    pid : String,
    type : String,
    price : Number,
    name : String,
    image : String,
    description: String,
    ingredients: [String],
    topping : [String],
    quantity : Number
});

const cartSchema = mongoose.model("carts", schema);

export default cartSchema;