import express from "express";
import customerController from "../controllers/customerController.js";

const router = express.Router();

router.get("/", customerController.getAllCustomers);
router.get("/:phone", customerController.getCustomerByPhone);
router.post("/", customerController.createCustomer);
router.put("/:phone", customerController.updateCustomerByPhone);
router.delete("/:phone", customerController.deleteCustomerByPhone);

export default router;
