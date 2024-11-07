import express from "express";
import { getTarefas, addTarefas, updateTarefas, deleteTarefas, updateOrdemTarefas } from "../controllers/tarefas.js";

const router = express.Router();

router.get("/", getTarefas)

router.put("/order/:id", updateOrdemTarefas)

router.post("/", addTarefas)

router.put("/:id", updateTarefas)

router.delete("/:id", deleteTarefas)

export default router;