import { Router } from "express";
const router = Router();

import * as workCtrl from "../controllers/work.controller";
import { authJwt } from "../middlewares";

router.post("/", [authJwt.verifyToken], workCtrl.doWork)

router.get('/', [authJwt.verifyToken], workCtrl.getWorks)

router.get('/:id', [authJwt.verifyToken], workCtrl.getReport)

// router.put('/:id', [authJwt.verifyToken, authJwt.isAdmin], equipoCtrl.updateWorker)

export default router;
