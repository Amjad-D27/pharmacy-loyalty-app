
import express from 'express';
import redemptionController from '../controllers/redemptionController.js';

const router = express.Router();

router.get('/', redemptionController.getAllRedemptions);
router.get('/:phone', redemptionController.getRedemptionByPhone);
router.post('/', redemptionController.redeemPointsByPhone);

export default router;