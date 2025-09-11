import connectDB from "./config/db.js";
import express from 'express';
import cors from 'cors';
import pizza from './routes/pizza.js'
import ingredients from './routes/ingredients.js'
import cart from './routes/cart.js'
connectDB(); 

const app = express();
app.use(cors());
app.use(express.json());

app.use("/pizza",pizza);
app.use('/ingredient',ingredients);
app.use('/cart',cart);

app.listen(8080, ()=> {
    console.log("Port running on 8080...");
})



