import { Router } from "express";
const router = Router();

import * as backlogCtrl from "../controllers/backlog.controller";
import { authJwt } from "../middlewares";

router.post("/", [authJwt.verifyToken], backlogCtrl.createBacklog)

// router.get('/', [authJwt.verifyToken], helpCtrl.getHelp)

// router.get('/:text', [authJwt.verifyToken], equipoCtrl.searchEquipo)

// router.put('/:id', [authJwt.verifyToken, authJwt.isAdmin], equipoCtrl.updateWorker)

export default router;
