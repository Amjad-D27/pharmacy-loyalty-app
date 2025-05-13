
import express from 'express';
import transactionController from '../controllers/transactionController.js';

const router = express.Router();

router.get('/', transactionController.getAllTransactions);
router.get('/:phone', transactionController.getTransactionByPhone);
router.post('/', transactionController.createTransaction);

export default router;