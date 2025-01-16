import { Router } from "express";
import { AllTransactions, GetStatistics, InitializeDB } from "../controllers/transaction.controller.js";

const router = Router();

router.get('/initialize-db', InitializeDB);
router.get('/get-filtered-transactions', AllTransactions);
router.get('/get-statistics', GetStatistics);

export default router;