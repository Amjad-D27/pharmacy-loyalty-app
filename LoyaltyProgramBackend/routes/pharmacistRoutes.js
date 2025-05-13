
import express from 'express';
import pharmacistController from '../controllers/pharmacistController.js';

const router = express.Router();

router.get('/', pharmacistController.getAllPharmacists);
router.get('/:pharmacist_id', pharmacistController.getPharmacistById);
router.post('/', pharmacistController.createPharmacist);
router.put('/:pharmacist_id', pharmacistController.updatePharmacistById);
router.delete('/:pharmacist_id', pharmacistController.deletePharmacistById);

export default router;
