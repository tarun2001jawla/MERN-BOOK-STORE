import express from 'express';
import orderController from '../controllers/cartController';

const router = express.Router();

router.post('/', orderController.createOrder);
router.put('/update-quantity', orderController.updateBookQuantity);

export default router;