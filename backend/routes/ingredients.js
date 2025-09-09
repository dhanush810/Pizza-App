import express from 'express';
import get_ingredients from '../controller/ingredientController.js';

const router = express.Router();

router.get("/getIngredients",get_ingredients);

export default router;