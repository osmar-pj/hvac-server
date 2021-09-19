import { Router } from "express";
const router = Router();

import * as helpCtrl from "../controllers/help.controller";
import { authJwt } from "../middlewares";

// router.post("/", [authJwt.verifyToken], helpCtrl.createHelp)

router.get('/', [authJwt.verifyToken], helpCtrl.getHelp)

router.get('/:id', [authJwt.verifyToken], helpCtrl.getQtyEquipos)

// router.post('/', helpCtrl.createData)

// router.put('/:id', [authJwt.verifyToken, authJwt.isAdmin], equipoCtrl.updateWorker)

export default router;
