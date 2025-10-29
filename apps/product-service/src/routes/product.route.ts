import { Router } from "express";
import { getCategories } from "../controllers/product.controller";

const router = Router();

router.get("/get-categories", getCategories);

export default router;
