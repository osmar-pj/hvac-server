import { Router } from "express";
const router = Router();

import * as equipoCtrl from "../controllers/equipo.controller";
import { authJwt } from "../middlewares";

router.post("/", [authJwt.verifyToken], equipoCtrl.createEquipo)

router.get('/', [authJwt.verifyToken], equipoCtrl.getEquipos)

router.get('/:text', [authJwt.verifyToken], equipoCtrl.searchEquipo)

router.put('/:id', [authJwt.verifyToken], equipoCtrl.updateEquipo)

export default router;
