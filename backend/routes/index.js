import { Router } from "express";
import TransactionRoute from "./transaction.route.js";

const router = Router();

router.use('/transaction', TransactionRoute);

export default router;