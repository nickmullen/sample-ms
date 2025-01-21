import { Router } from "express";
import bookRoutes from "./book";
import healthRoutes from "./health";

const router = Router();

// Use /books for book-related routes
router.use("/books", bookRoutes);

//Use /health for the health-related routes
router.use("/health", healthRoutes);

export default router;
