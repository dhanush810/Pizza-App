import { use, useEffect, useState } from "react";
import ingredientApi from "../services/ingredientApi";

function BuildPizze() {

    useEffect(() => {
        async function fetchIngredients() {
            try {
                const res = await ingredientApi.get("/getIngredients");
                setIngredients(res.data);
            }
            catch (err) {
                console.error(err);
            }
        }
        fetchIngredients();
    })

    function AddPrice(event) {
        const { checked, value } = event.target;
        const numvalue = Number(value);
        let UpdatedArray = [];
        if (checked) {
            UpdatedArray = [...priceArray, numvalue];
        }else{
            UpdatedArray = priceArray.filter((price) => price !== numvalue);
        }
        setPriceArray(UpdatedArray);
        const total = UpdatedArray.reduce((sum, num) => sum+num, 0);
        setPrice(total);
        console.log(price);
    }

    const [priceArray, setPriceArray] = useState([]);
    const [price, setPrice] = useState(0);
    const [ingredients, setIngredients] = useState([]);
    return (
        <div className=" container mt-5 p-5" style={{maxWidth:"800px"}}>
            <p className="fs-5 text-center">Pizzeria now provides an option to customise your own pizza.</p>
            <table className=" container table table-striped  table-bordered border" >
                <tbody>
                    {ingredients.map((ingredient) => (
                        <tr key={ingredient._id}>
                            <td><img src={ingredient.image} height={"50px"} width={"50px"} /></td>
                            <td className="fw-bold">{ingredient.tname}  ${ingredient.price}</td>
                            <td><input className="form-check-input border border-warning" type="checkbox" id="flexCheckDefault" onChange={AddPrice} value={ingredient.price} /><span className="ms-4 fs-5 text-warning">Add</span></td>
                        </tr>
                    ))}
                </tbody>
                <p className="fs-4 fw-bold ms-2 mt-3" style={{color:"darkblue"}}>Total Cost: {price}</p>
            </table>
        </div>
    )
}

export default BuildPizze;