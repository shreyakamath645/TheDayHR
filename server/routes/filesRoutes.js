// server/routes/filesRoutes.js
import { Router } from "express";
import { getFiles, uploadFile, deleteFile } from "../controllers/filesController.js";

const router = Router();

router.get("/", getFiles);
router.post("/", uploadFile);
router.delete("/:id", deleteFile);

export default router;
