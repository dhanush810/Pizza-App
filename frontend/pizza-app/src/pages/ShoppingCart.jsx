import { useEffect, useState } from "react";
import cartApi from "../services/cartApi";
import { toast, ToastContainer } from "react-toastify";

function ShoppingCart() {

    useEffect(() => {
        async function fetchCart() {
            try {
                const res = await cartApi.get("/getCart");
                setCart(res.data);
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchCart();
        setCount(cart.length);
        let sum = 0;
        cart.map((item) => (sum += item.price));
        setCost(sum);
    }, [deleteCart]);


    const [cart, setCart] = useState([]);
    const [count, setCount] = useState([]);
    const [cost, setCost] = useState(0);
    async function deleteCart(item){
        try{
            await cartApi.delete("/deleteCart", {
                data : {'_id':item._id}
            });
        }
        catch(err){
            console.error(err);
        }
    }

    return (
        <div className="mt-5 pt-5 text-center">
            <div className="container">
                <div className="row g-3">
                    <div className="col-9">
                        {cart.length > 0 ? (
                            cart.map((item, index) => (
                                <div key={index} className="card mb-4">
                                    <div className="row">
                                        <div className="col-3 mt-1">
                                            <img src={item.image} height={"100px"} width={"110px"}/>
                                            <p className="fw-bold">{item.name}</p>
                                        </div>
                                        <div className="col-6">
                                            <p className="fw-bold fs-5">Price: ${item.price}</p>
                                            <p>{item.description}</p>
                                        </div>
                                        <div className="col-3">
                                            <button className="btn btn-danger mt-5" onClick={() => deleteCart(item)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No Items In Cart</p>
                        )}
                    </div>
                    <div className="col-3">
                        <div className="card">
                            <p className="text-success">Part of your first order qualifies for FREE Delivery</p>
                            <p className="fs-5"><i>Total Items Ordered: </i><span className="text-warning">{count}</span></p>
                            <p className="fs-4">Total Cost: <i>$</i><span className="fw-bold">{cost}</span></p>
                            <button className="btn btn-warning mb-3 mx-auto" >CheckOut</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default ShoppingCart;