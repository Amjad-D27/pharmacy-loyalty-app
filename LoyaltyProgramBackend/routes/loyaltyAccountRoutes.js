
import express from 'express';
import loyaltyAccountController from '../controllers/loyaltyAccountController.js';

const router = express.Router();

router.get('/', loyaltyAccountController.getAllLoyaltyAccounts);
router.get('/:phone', loyaltyAccountController.getLoyaltyAccountByPhone);
router.put('/:phone', loyaltyAccountController.updateLoyaltyAccountByPhone);
router.delete('/:phone', loyaltyAccountController.deleteLoyaltyAccountByPhone);

export default router;