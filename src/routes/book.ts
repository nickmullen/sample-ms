import { Router } from "express";
import controller from "../controllers/book";

const router = Router();

router.post("/", controller.create);

router.get("/:id", controller.read);

export default router;
