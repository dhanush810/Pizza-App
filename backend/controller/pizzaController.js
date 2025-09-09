import pizzaSchema from "../model/pizzaSchema.js"; 

const get_pizzas = async(req, res) =>{
    try{
        const pizzas = await pizzaSchema.find();
        if(pizzas == null) res.status(404).send("No Pizzas found");
        else res.status(200).send(pizzas);
    }
    catch(err){
        res.status(500).send("Internal Server Error");
        console.error("Error Fetching data", err);
    }
}

export default {get_pizzas};