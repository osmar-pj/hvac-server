import { Router } from "express";
const router = Router();

import * as repuestoCtrl from "../controllers/repuesto.controller";
import { authJwt } from "../middlewares";

router.post("/", [authJwt.verifyToken], repuestoCtrl.createRepuesto)

// router.get('/', [authJwt.verifyToken], helpCtrl.getHelp)

// router.get('/:text', [authJwt.verifyToken], equipoCtrl.searchEquipo)

// router.put('/:id', [authJwt.verifyToken, authJwt.isAdmin], equipoCtrl.updateWorker)

export default router;
