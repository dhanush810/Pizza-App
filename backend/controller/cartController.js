import cartSchema from "../model/cartSchema.js";

const add_cart = async(req, res) => {
    try{
        const exists = await cartSchema.findOne({ pid: req.body.pid });
        if(exists){
            return res.status(404).send("Already present");
        }
        console.log(req.body);
        await cartSchema.insertOne(req.body);
        res.status(200).send("Item Added In Cart");
    }
    catch(err){
        res.status(500).send("Internal Server Error");
    }
};

const get_cart = async(req, res) => {
    try{
        const cart = await cartSchema.find();
        res.status(200).send(cart);
    }
    catch(err){
        console.error(err,"Internal cerver error");
    }
};

const delete_cart = async(req, res) => {
    try{
        const exists = await cartSchema.findById(req.body._id);
        if(!exists){
            return res.status(401).send("Item not in cart to delete");
        }
        await cartSchema.deleteOne({_id:req.body._id});
        res.status(200).send("Deleted from cart");
    }
    catch(err){
        res.status(500).send("Internal server error");
        console.error(err);
    }
};

export default {
    get_cart,
    add_cart,
    delete_cart
};