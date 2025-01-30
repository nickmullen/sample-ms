import { Router } from "express";
import controller from "../controllers/book";

const router = Router();

router.get("/", controller.getBooks);
router.post("/", controller.createBook);

router.get("/:id", controller.readBook);
router.delete("/:id", controller.deleteBook);

export default router;
