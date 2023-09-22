import { Router } from "express";
import * as s from "../controllers/sucursales.controllers.js";

const router = Router();

router.get("/getall", s.getSucursales);
router.post("/add", s.create);
router.patch("/update", s.update);
router.delete("/delete", s.delete);
