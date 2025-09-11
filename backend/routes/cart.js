import express from 'express';
import cartController from '../controller/cartController.js';

const router = express.Router();

router.get("/getCart",cartController.get_cart);
router.post("/addCart",cartController.add_cart);
router.delete("/deleteCart",cartController.delete_cart);

export default router;