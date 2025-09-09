import ingredientSchema from "../model/ingredientSchema.js";

const get_ingredients = async(req, res) =>{
    try{
        const ingredients = await ingredientSchema.find();
        if(ingredients == null) res.status(404).send("No data found");
        res.status(200).send(ingredients);
    }
    catch(err){
        res.status(500).send("Internal Server Error");
        console.error(err);
    }
}
export default get_ingredients;

