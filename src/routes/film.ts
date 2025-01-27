import { Router } from "express";
import controller from "../controllers/film";

const router = Router();

router.post("/", controller.createFilm);

router.get("/:id", controller.readFilm);
router.delete("/:id", controller.deleteFilm);

export default router;
