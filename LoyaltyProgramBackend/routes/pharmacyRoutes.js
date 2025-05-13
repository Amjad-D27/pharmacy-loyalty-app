import express from "express";
import pharmacyController from "../controllers/pharmacyController.js";

const router = express.Router();

router.get("/", pharmacyController.getAllPharmacies);
router.get("/:name", pharmacyController.getPharmacyByName);
router.post("/", pharmacyController.createPharmacy);
router.delete("/:email", pharmacyController.deletePharmacyByEmail);

export default router;
