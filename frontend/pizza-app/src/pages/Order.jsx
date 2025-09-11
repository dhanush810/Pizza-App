import { useEffect, useState } from "react";
import orderApi from "../services/orderApi";
import cartApi from "../services/cartApi";
import {toast, ToastContainer} from 'react-toastify'

function Order() {

    const [pizzas, setPizzas] = useState([]);
    const success = () => toast.success("Items Inserted");
    const reject = () => toast.error("Items Already in Cart");
    useEffect(() => {
        async function fetchPizzas() {
            try {
                const res = await orderApi.get("/getPizza");
                setPizzas(res.data);
                // console.log(pizzas);
            }
            catch (err) {
                console.error(err);
            }
        }
        fetchPizzas();
    });

    async function AddToCart(pizza){
        const cart = {
            pid : pizza._id,
            type : pizza.type,
            price : pizza.price,
            name : pizza.name,
            image : pizza.image,
            description: pizza.description,
            ingredients: pizza.ingredients,
            topping : pizza.topping,
            quantity : 1
        }

        try{
            const res = await cartApi.post("/addCart",cart);
            success();

        }
        catch(err){
            reject();
        }
        
    }

    return (
        <div className="container mt-5 pt-5">
            <div className="row mt-2 g-2 ">
                {pizzas.length > 0 ? (
                    pizzas.map((pizza) =>
                        <div key={pizza._id} className="col-md-6 col-12 p-4 pb-1 border rounded">
                            <div className="row g-4">
                                <div className="col-3 mt-2 text-center d-flex flex-column align-items-center justify-content-around">
                                    <div className="fs-4 fw-bold">{pizza.name}</div>
                                    {pizza.type === "veg" ? (<p className="fs-4">🟩</p>) :
                                        (<p className="fs-4">🟥</p>)}
                                    <p className="fw-bold mt-4 fs-5">&#8377;{pizza.price}</p>
                                </div>
                                <div className="col-6 mt-2">
                                    <p>{pizza.description}</p>
                                    <p><span className="fw-bold">Ingredients:</span> {pizza.ingredients.join(", ")}</p>
                                    <p><span className="fw-bold">Toppings:</span> {pizza.topping.join(", ")}</p>
                                </div>
                                <div className="col-3 d-flex flex-column align-items-start justify-content-start mt-5">
                                    <img src={pizza.image} alt="image" height={"110px"} width={"120px"} />
                                    <button style={{color:"white"}} className="btn btn-warning mt-1 ms-2"  onClick={() => AddToCart(pizza)}>AddToCart</button>
                                </div>
                            </div>
                        </div>
                    )) : (
                    <p>No Data Found</p>
                )}
            </div>
            <ToastContainer/>
        </div>
    )
}
export default Order;