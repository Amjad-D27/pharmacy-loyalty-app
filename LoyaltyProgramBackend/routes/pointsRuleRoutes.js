
import express from  'express';
import pointsRuleController from '../controllers/pointsRuleController.js';

const router = express.Router();

router.put('/', pointsRuleController.updatePointsRule);
router.get('/', pointsRuleController.getPointsRule);

export default router;
