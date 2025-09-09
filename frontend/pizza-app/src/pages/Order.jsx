import { useEffect, useState } from "react";
import orderApi from "../services/orderApi";

function Order() {

    const [pizzas, setPizzas] = useState([]);

    useEffect(() => {
        async function fetchPizzas() {
            try{
                const res = await orderApi.get("/getPizza");
                setPizzas(res.data);
                // console.log(pizzas);
            }
            catch(err){
                console.error(err);
            }
        }
        fetchPizzas();
    });
    
    return (
        <div className="container mt-5 pt-5">
            <div className="row mt-2 g-2 border">
                {pizzas.length > 0 ? (
                    pizzas.map((pizza) => 
                    <div key={pizza._id} className="col-6 shadow p-4 rounded">
                    <div className="row">
                        <div className="col-2 mt-2" align="center">
                            <div className="fs-4 fw-bold">{pizza.name}</div>
                            {pizza.type === "veg" ? (<button className="btn btn-success"></button>) : 
                            (<button className="btn btn-danger"></button>)}
                            <p className="fw-bold mt-4">${pizza.price}</p>
                        </div>
                        <div className="col-6 mt-2">
                            <p>{pizza.description}</p>
                            <p><span className="fw-bold">Ingredients:</span> {pizza.ingredients.join(", ")}</p>
                            <p><span className="fw-bold">Toppings:</span> {pizza.topping.join(", ")}</p>
                        </div>
                        <div className="col-4 d-flex flex-column align-items-center justify-content-center">
                            <img src={pizza.image} alt="image" height={"120px"} width={"100px"}/>
                            <button className="btn btn-warning mt-1">AddToCart</button>
                        </div>
                    </div>
                </div>
                )) : (
                    <p>No Data Found</p>
                )}
            </div>
        </div>
    )
}
export default Order;