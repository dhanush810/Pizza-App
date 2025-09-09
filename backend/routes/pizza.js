import express from 'express';
const router = express.Router();
import pizzaController from '../controller/pizzaController.js';

router.get("/getPizza",pizzaController.get_pizzas);

export default router;