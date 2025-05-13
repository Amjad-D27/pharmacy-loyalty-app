
import express from 'express';
import { body } from 'express-validator';
import authController from '../controllers/authController.js';

const router = express.Router();

router.post('/register',
    [
      body('email').isEmail().withMessage('Invalid email format.').normalizeEmail(),
      body('pharmacyName').trim().notEmpty().withMessage('Pharmacy name is required.'),
      body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
    ],
    authController.register
);
  
  
router.post('/login',
    [
      body('pharmacyName').trim().notEmpty().withMessage('Pharmacy name is required.'),
      body('password').notEmpty().withMessage('Password is required.')
    ],
    authController.login
);
  
export default router;
