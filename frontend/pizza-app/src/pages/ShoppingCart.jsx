import { useEffect, useState } from "react";
import cartApi from "../services/cartApi";
import { toast, ToastContainer } from "react-toastify";

function ShoppingCart() {
    const [cart, setCart] = useState([]);
    const [count, setCount] = useState(0);
    const [cost, setCost] = useState(0);

    // Fetch cart items once
    useEffect(() => {
        async function fetchCart() {
            try {
                const res = await cartApi.get("/getCart");
                setCart(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchCart();
    }, []);

    // Update count & cost whenever cart changes
    useEffect(() => {
        setCount(cart.length);
        let sum = 0;
        cart.forEach((item) => {
            sum += item.price * (item.quantity || 1);
        });
        setCost(sum);
    }, [cart]);

    // Delete item
    async function deleteCart(item) {
        try {
            await cartApi.delete("/deleteCart", {
                data: { _id: item._id },
            });
            // remove from state immediately for UI update
            setCart((prev) => prev.filter((c) => c._id !== item._id));
        } catch (err) {
            console.error(err);
        }
    }

    const increment = (index) => {
        setCart((prevCart) => {
            //gets cart previous to clicking increment
            const updated = [...prevCart];
            //increments quantity of the current item in cart
            updated[index].quantity += 1;
            return updated;
        });
        //finally cart is updated aswell
    };

    const decrement = (index) => {
        setCart((prevCart) => {
            const updated = [...prevCart];
            updated[index].quantity = Math.max(1, updated[index].quantity - 1);
            return updated;
        });
    };

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
                                            <img
                                                src={item.image}
                                                height={"100px"}
                                                width={"110px"}
                                            />
                                            <p className="fw-bold">{item.name}</p>
                                        </div>
                                        <div className="col-6">
                                            <p className="fw-bold fs-5">
                                                Price: &#8377;{item.price}
                                            </p>
                                            <p>{item.description}</p>
                                        </div>
                                        <div className="col-3">
                                            <p className="fw-bold mt-2 mb-0">Quantity</p>
                                            <div className="d-flex gap-1 justify-content-center  align-items-center mb-2 me-1">
                                                <button
                                                    className="btn p-0"
                                                    onClick={() => increment(index)}
                                                >
                                                    <i className="bi bi-plus-square p-1 fs-5"></i>
                                                </button>
                                                {item.quantity}
                                                <button
                                                    className="btn p-0"
                                                    onClick={() => decrement(index)}
                                                >
                                                    <i className="bi bi-dash-square p-1 fs-5"></i>
                                                </button>
                                            </div>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => deleteCart(item)}
                                            >
                                                Delete
                                            </button>
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
                            <p className="text-success">
                                Part of your first order qualifies for FREE Delivery
                            </p>
                            <p className="fs-5">
                                <i>Total Items Ordered: </i>
                                <span className="text-warning">{count}</span>
                            </p>
                            <p className="fs-4">
                                Total Cost: <i>&#8377;</i>
                                <span className="fw-bold">{cost}</span>
                            </p>
                            <button className="btn btn-warning mb-3 mx-auto text-light">
                                CheckOut
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ShoppingCart;
